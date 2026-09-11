"""Rebuild image-space parcel polygons. No assumed GPS registration is applied.
Run with numpy, scipy, shapely and Pillow. Coordinates use top-left image origins.
"""
import json,sys
from pathlib import Path
import numpy as np
from scipy.spatial import Delaunay
from shapely.geometry import Polygon,LineString,mapping
from shapely.ops import transform
from PIL import Image,ImageDraw,ImageFont
ROOT=Path(__file__).resolve().parent.parent;OUT=ROOT/'geometry'
# Digitized from the 1201x1154 raster embedded in boundMap.svg.
parcels={
'uniti':{'name':'UNITI SDN BHD','color':'#7a2f34','points':[(282,149),(314,202),(363,165),(451,284),(522,304),(505,326),(583,405),(622,481),(681,522),(698,508),(780,634),(834,678),(953,735),(939,767),(925,793),(915,811),(906,821),(894,818),(876,811),(819,767),(738,692),(660,634),(559,538),(437,424),(312,310),(233,261)]},
'marina':{'name':'Sembilan Marine Resort','color':'#6f8f5c','points':[(223,274),(312,351),(369,397),(448,470),(527,543),(614,621),(696,670),(650,731),(600,700),(540,665),(450,608),(350,546),(279,524),(138,494),(151,410),(169,380),(199,329)]},
'tnb-reserve':{'name':'TNB / tank reserve area','color':'#707070','points':[(701,675),(772,736),(819,775),(867,811),(859,827),(800,871),(764,909),(716,809),(690,785),(653,737)]},
'lrk':{'name':'LRK (southern parcel)','color':'#ef2424','points':[(812,878),(867,823),(877,820),(903,832),(831,905)]},
'walit':{'name':'WALIT','color':'#a05299','points':[(831,905),(903,832),(998,880),(920,962),(885,986)]},
'nature':{'name':'DYNAC NATURE TOURISM','color':'#6250d8','points':[(764,909),(802,873),(831,905),(885,986),(894,998),(858,1024),(914,1102),(914,1110),(864,1120),(789,1074)]},
'shipyard':{'name':'Sembilan Shipyard','color':'#e86a51','points':[(1027,840),(1117,882),(966,1083),(925,1118),(914,1102),(858,1024),(894,998),(885,986),(920,962),(998,880)]},
'pe':{'name':'P.E. (label on source plan)','color':'#b3a787','points':[(282,149),(326,115),(363,165),(314,202)]}
}
# Independently retraced white dashes, NOT coastline/water extent.
site=[(426,333),(429,307),(433,286),(444,266),(454,246),(469,226),(483,210),(499,182),(519,183),(540,202),(555,216),(571,230),(590,238),(612,245),(631,251),(622,261),(650,280),(677,294),(704,316),(734,342),(741,334),(766,363),(793,392),(818,403),(846,413),(874,423),(901,433),(890,453),(881,472),(907,482),(932,492),(946,478),(975,490),(1007,503),(984,529),(961,553),(936,581),(910,609),(899,615),(887,620),(875,622),(864,622),(853,619),(842,614),(830,603),(818,590),(804,556),(794,530),(782,505),(761,479),(738,451),(713,422),(684,409),(651,394),(621,380),(587,365),(553,350),(514,345),(477,340)]
# Source/target landmark pairs. They describe visual registration, not survey controls.
anchors=[((282,149),(499,182)),((326,115),(519,183)),((363,165),(557,218)),((451,284),(571,230)),((522,304),(631,251)),((505,326),(622,261)),((583,405),(677,294)),((681,522),(734,342)),((698,508),(741,334)),((780,634),(793,392)),((834,678),(818,403)),((953,735),(901,433)),((906,821),(881,472)),((1027,840),(946,478)),((1117,882),(1007,503)),((966,1083),(910,609)),((925,1118),(887,620)),((864,1120),(842,614)),((789,1074),(818,590)),((764,909),(782,505)),((690,785),(748,464)),((650,731),(713,422)),((450,608),(625,382)),((350,546),(553,350)),((279,524),(505,344)),((138,494),(426,333)),((151,410),(433,286))]
# Register the shared road against the user-confirmed blue annotation at arc-length samples.
source_road=LineString([(233,261),(312,310),(437,424),(559,538),(660,634),(738,692),(819,767),(876,811),(906,821)])
blue=LineString(list(reversed(json.loads((ROOT/'output/blue_road_trace.json').read_text())))).simplify(.8)
for t in np.linspace(0,1,15):
 s=source_road.interpolate(t,normalized=True);d=blue.interpolate(t,normalized=True)
 if t==0:
  from shapely.geometry import Point
  d=Point(468,232.5)
 if t==1:continue # endpoint already present
 anchors.append(((s.x,s.y),(d.x,d.y)))
src=np.array([a for a,b in anchors]);dst=np.array([b for a,b in anchors]);tri=Delaunay(src)
ratios=[]
for face in tri.simplices:
 a,b=src[face],dst[face];ratios.append(float(np.linalg.det((b[1:]-b[0]).T)/np.linalg.det((a[1:]-a[0]).T)))
# Reject a warp that reverses local topology.
assert min(ratios)>0,('folded registration',min(ratios))
def warp(p):
 p=np.array(p);i=int(tri.find_simplex(p))
 if i<0:
  # Nearest triangle only for subpixel points on hull roundoff; never far extrapolation.
  i=int(np.argmin(np.linalg.norm(src[tri.simplices].mean(axis=1)-p,axis=1)))
 a=tri.transform[i];b=a[:2]@(p-a[2]);w=np.r_[b,1-b.sum()];return (w@dst[tri.simplices[i]]).tolist()
def dense(points):
 out=[]
 for a,b in zip(points,points[1:]+points[:1]):
  for t in np.linspace(0,1,max(2,int(np.linalg.norm(np.array(b)-a)/2)+1),endpoint=False):out.append((np.array(a)*(1-t)+np.array(b)*t).tolist())
 return out
source_features=[];sat_features=[];site_poly=Polygon(site);checks=[]
for key,v in parcels.items():
 poly=Polygon(v['points']);assert poly.is_valid,(key,'source invalid')
 raw=Polygon([warp(p) for p in dense(v['points'])]);assert raw.is_valid,(key,'warp invalid')
 clipped=raw.intersection(site_poly)
 assert not clipped.is_empty
 props={'id':key,'name':v['name'],'color':v['color'],'kind':'zone-polygon','status':'image-traced draft','source':'boundMap.svg embedded raster, 1201x1154','registration':'piecewise affine visual landmarks and user road annotation; not surveyed'}
 source_features.append({'type':'Feature','properties':props,'geometry':mapping(poly)})
 sat_features.append({'type':'Feature','properties':props,'geometry':mapping(clipped)})
 checks.append({'id':key,'source_valid':True,'satellite_valid':clipped.is_valid,'clipped_area_px2':round(raw.area-clipped.area,2),'area_px2':round(clipped.area,2)})
# Check parcel overlaps; source corridors are intentionally not filled.
overlaps=[]
for i,a in enumerate(source_features):
 for b in source_features[i+1:]:
  aa=Polygon(a['geometry']['coordinates'][0]);bb=Polygon(b['geometry']['coordinates'][0]);area=aa.intersection(bb).area
  if area>.1:overlaps.append([a['properties']['id'],b['properties']['id'],area])
assert not overlaps,overlaps
from shapely.geometry import shape
satellite_overlaps=[]
for i,a in enumerate(sat_features):
 for b in sat_features[i+1:]:
  area=shape(a['geometry']).intersection(shape(b['geometry'])).area
  if area>0.1:satellite_overlaps.append([a['properties']['id'],b['properties']['id'],area])
assert not satellite_overlaps,satellite_overlaps
boundary_feature={'type':'Feature','properties':{'id':'site-boundary','kind':'site-boundary','source':'satMap.png white dashed outline','status':'image-traced draft'},'geometry':mapping(site_poly)}
def save(name,features,space):
 (OUT/name).write_text(json.dumps({'type':'FeatureCollection','coordinateSpace':space,'warning':'Image pixels, NOT longitude/latitude. Do not feed directly to a geographic map.','features':features},indent=2))
save('boundmap-parcels.pixels.json',source_features,{'image':'output/boundMap_embedded.png','width':1201,'height':1154,'origin':'top-left'})
save('satmap-parcels.pixels.json',[boundary_feature]+sat_features,{'image':'satMap.png','width':1369,'height':768,'origin':'top-left'})
(OUT/'registration.json').write_text(json.dumps({'method':'piecewise affine','anchors':[{'boundmap':a,'satmap':b} for a,b in anchors],'minimum_triangle_area_ratio':min(ratios),'gps_registration':'Not calibrated. Previous 3.99m/pixel transform deliberately not reused.'},indent=2))
(OUT/'validation.json').write_text(json.dumps({'parcels':checks,'source_overlap_pairs':overlaps,'satellite_overlap_pairs':satellite_overlaps,'registration_folds':0,'note':'Topology tests do not establish surveyed accuracy.'},indent=2))
def overlay(image,features,name,scale):
 im=Image.open(ROOT/image).convert('RGBA');layer=Image.new('RGBA',im.size);d=ImageDraw.Draw(layer)
 for f in features:
  p=f['properties'];geom=f['geometry'];rings=[geom['coordinates']] if geom['type']=='Polygon' else geom['coordinates']
  for ringset in rings:
   ring=[tuple(x) for x in ringset[0]];color=p.get('color','#ffff00')
   d.polygon(ring,fill=color+'28');d.line(ring+[ring[0]],fill=color,width=2)
   if p['id']!='site-boundary':
    pt=Polygon(ring).representative_point();d.text((pt.x,pt.y),p['id'],fill='white',stroke_width=2,stroke_fill='black')
 im=Image.alpha_composite(im,layer).convert('RGB');im.resize((im.width*scale,im.height*scale)).save(OUT/name)
overlay('output/boundMap_embedded.png',source_features,'boundmap-parcels-review.png',1)
overlay('satMap.png',[boundary_feature]+sat_features,'satmap-parcels-review.png',2)
print(json.dumps(checks,indent=2))
