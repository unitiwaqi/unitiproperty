import bpy, math, random
from mathutils import Vector
from mathutils.geometry import tessellate_polygon
from pathlib import Path

ROOT=Path('/Users/metapro/Desktop/unitiproperty')
OUT=ROOT/'output'
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
random.seed(17)

def mat(name,color,roughness=0.8):
    m=bpy.data.materials.new(name); m.diffuse_color=(*color,1); m.use_nodes=True
    bs=m.node_tree.nodes.get('Principled BSDF'); bs.inputs['Base Color'].default_value=(*color,1); bs.inputs['Roughness'].default_value=roughness
    return m
earth=mat('Dark earth • cut edges',(0.09,0.13,0.115))
gold=mat('Site boundary • warm gold',(1,0.65,0.15))
roof=mat('Campus roofs • terracotta',(0.65,0.30,0.17))
wall=mat('Building walls • warm white',(0.83,0.80,0.67))
greens=[mat('Canopy '+str(i),c) for i,c in enumerate([(0.12,0.25,0.13),(0.18,0.31,0.16),(0.24,0.35,0.19)])]
textmat=mat('Typography',(0.83,0.91,0.84))
sat=bpy.data.materials.new('Satellite image • original georeferenced by image pixels'); sat.use_nodes=True
nodes=sat.node_tree.nodes; tex=nodes.new('ShaderNodeTexImage'); tex.image=bpy.data.images.load(str(ROOT/'satMap.png')); tex.image.pack()
bs=nodes.get('Principled BSDF'); sat.node_tree.links.new(tex.outputs['Color'],bs.inputs['Base Color']); bs.inputs['Roughness'].default_value=1

def xy(p,z=0): return ((p[0]-684.5)/10,(384-p[1])/10,z)
def surface(name,points,z,material):
    vs=[xy(p,z) for p in points]; vec=[Vector(v) for v in vs]
    tris=tessellate_polygon([vec]); faces=[tuple(v if isinstance(v,int) else vec.index(v) for v in t) for t in tris]
    mesh=bpy.data.meshes.new(name); mesh.from_pydata(vs,[],faces); mesh.update()
    obj=bpy.data.objects.new(name,mesh); bpy.context.collection.objects.link(obj); obj.data.materials.append(material)
    uv=mesh.uv_layers.new(name='Satellite UV')
    for poly in mesh.polygons:
        for li in poly.loop_indices:
            p=points[mesh.loops[li].vertex_index]; uv.data[li].uv=(p[0]/1369,1-p[1]/768)
    return obj

surface('Satellite context • full map',[(0,0),(1369,0),(1369,768),(0,768)],0.035,sat)
def cube(name,loc,scale,material,bevel=0):
    bpy.ops.mesh.primitive_cube_add(size=1,location=loc); o=bpy.context.object; o.name=name; o.dimensions=scale
    bpy.ops.object.transform_apply(location=False,rotation=False,scale=True); o.data.materials.append(material)
    if bevel: mod=o.modifiers.new('Soft edges','BEVEL'); mod.width=bevel; mod.segments=3; o.modifiers.new('Normals','WEIGHTED_NORMAL')
    return o
cube('Map foundation',(0,0,-1.1),(136.9,76.8,2.2),earth,0.3)
boundary=[(426,333),(433,286),(460,234),(499,182),(519,183),(571,230),(631,251),(623,261),(677,294),(734,342),(741,334),(793,392),(818,403),(903,432),(881,472),(933,494),(946,477),(1008,503),(910,610),(887,620),(865,622),(842,614),(818,591),(782,505),(713,422),(553,350)]
surface('Raised site • indicative platform',boundary,0.65,sat)
v=[xy(p,z) for z in [0,0.65] for p in boundary]; n=len(boundary)
m=bpy.data.meshes.new('Site edge mesh'); m.from_pydata(v,[],[(i,(i+1)%n,(i+1)%n+n,i+n) for i in range(n)])
o=bpy.data.objects.new('Site platform edges',m); bpy.context.collection.objects.link(o); o.data.materials.append(earth)

def line(name,points,material,radius):
    c=bpy.data.curves.new(name,'CURVE'); c.dimensions='3D'; c.bevel_depth=radius; c.bevel_resolution=3
    s=c.splines.new('POLY'); s.points.add(len(points)-1)
    for p,co in zip(s.points,points): p.co=(*co,1)
    o=bpy.data.objects.new(name,c); bpy.context.collection.objects.link(o); o.data.materials.append(material)
line('Site perimeter • traced from dashed boundary',[xy(p,0.82) for p in boundary+[boundary[0]]],gold,0.13)

# UNITI sits between the inland satellite outline and the visible internal road.
# Road centerline manually traced directly in satMap pixel coordinates.
import json
internal_seam=list(reversed(json.loads((OUT/'blue_road_trace.json').read_text())))
shared_edge=boundary[boundary.index((499,182)):boundary.index((881,472))+1]
uniti=shared_edge+list(reversed(internal_seam))
red=mat('UNITI ownership perimeter • red',(0.85,.07,.09))
uniti_sat=sat.copy(); uniti_sat.name='UNITI parcel • satellite with red ownership tint'
mix=uniti_sat.node_tree.nodes.new('ShaderNodeMixRGB'); mix.blend_type='MIX'; mix.inputs[0].default_value=.32; mix.inputs[2].default_value=(.65,.045,.065,1)
uniti_sat.node_tree.links.new(uniti_sat.node_tree.nodes.get('Image Texture').outputs['Color'],mix.inputs[1])
uniti_sat.node_tree.links.new(mix.outputs[0],uniti_sat.node_tree.nodes.get('Principled BSDF').inputs['Base Color'])
parcel=surface('UNITI SDN BHD • ownership parcel from boundMap',uniti,.95,uniti_sat)
parcel['Source']='UNITI inland portion inside white satellite outline; coastal-facing boundary follows the visible internal road, as confirmed by user.'
parcel['Alignment landmarks']='Boundary projected from the user blue annotation using the saved Layout perspective onto z=0.95; 162 annotation samples.'
line('UNITI SDN BHD • complete ownership boundary',[xy(p,1.12) for p in uniti+[uniti[0]]],red,.19)
v=[xy(p,z) for z in [.04,.95] for p in uniti]; n=len(uniti)
m=bpy.data.meshes.new('UNITI parcel side mesh'); m.from_pydata(v,[],[(i,(i+1)%n,(i+1)%n+n,i+n) for i in range(n)])
o=bpy.data.objects.new('UNITI SDN BHD • raised parcel edges',m); bpy.context.collection.objects.link(o); o.data.materials.append(red)
reference=bpy.data.images.load(str(ROOT/'boundMap.png')); reference.pack()

# Simple building masses placed over visible campus roof clusters.
for i,(x,y,w,d,a,h) in enumerate([(508,208,23,8,-35,1.2),(522,224,34,8,-35,1.2),(537,237,32,8,-35,1.2),(487,250,24,9,-15,1.0),(479,267,23,8,-15,1.0),(575,250,26,14,-20,1.8),(601,262,16,12,-20,1.5),(556,262,20,9,-20,1.0)]):
    z=.65+h/2
    b=cube('Campus building %02d • approximate'%(i+1),xy((x,y),z),(w/10,d/10,h),wall,.07); b.rotation_euler.z=math.radians(a)
    r=cube('Campus roof %02d'%(i+1),xy((x,y),.65+h+.09),(w/10+.14,d/10+.14,.18),roof,.06); r.rotation_euler.z=math.radians(a)

def inside(x,y):
    hit=False; j=len(boundary)-1
    for i,(xi,yi) in enumerate(boundary):
        xj,yj=boundary[j]
        if (yi>y)!=(yj>y) and x<(xj-xi)*(y-yi)/(yj-yi)+xi: hit=not hit
        j=i
    return hit
# Sparse canopies retain visibility of the source imagery; locations are illustrative.
verts=[]; faces=[]; mids=[]
for _ in range(950):
    x=random.uniform(435,995); y=random.uniform(280,609)
    if not inside(x,y) or (x<552 and y<342) or (x>858 and y>511): continue
    if random.random()>.60: continue
    cx,cy,_=xy((x,y)); radius=random.uniform(.35,.7); h=random.uniform(.9,1.8); base=len(verts)
    verts.append((cx,cy,.65+h))
    for k in range(6):
        a=2*math.pi*k/6; verts.append((cx+radius*math.cos(a),cy+radius*math.sin(a),.65+h*.5))
    verts.append((cx,cy,.69))
    mi=random.randrange(3)
    for k in range(6): faces.extend([(base,base+1+k,base+1+(k+1)%6),(base+7,base+1+(k+1)%6,base+1+k)]); mids.extend([mi,mi])
mesh=bpy.data.meshes.new('Illustrative tree canopy mesh'); mesh.from_pydata(verts,[],faces); mesh.update()
obj=bpy.data.objects.new('Vegetation • illustrative canopy masses',mesh); bpy.context.collection.objects.link(obj)
for m in greens: mesh.materials.append(m)
for p,mi in zip(mesh.polygons,mids): p.material_index=mi

def label(body,loc,size):
    c=bpy.data.curves.new(body,'FONT'); c.body=body; c.size=size; c.extrude=.008
    o=bpy.data.objects.new(body,c); bpy.context.collection.objects.link(o); o.location=loc; o.data.materials.append(textmat)
label('KOLEJ UNITI  /  COASTAL SITE',(-64,-44,0),2.0)
label('SATELLITE STUDY  •  CONCEPTUAL 3D MASSING',(-64,-47,0),.95)
label('Indicative heights and vegetation  /  Not a surveyed terrain model',(-64,-49,0),.72)
label('RED  /  UNITI SDN BHD',(-64,-52,0),1.05)
label('GOLD  /  Original satellite outline',(-64,-54,0),.85)

world=bpy.context.scene.world; world.use_nodes=True; world.node_tree.nodes['Background'].inputs[0].default_value=(.17,.22,.20,1); world.node_tree.nodes['Background'].inputs[1].default_value=.55
bpy.ops.object.light_add(type='AREA',location=(-25,-20,90)); bpy.context.object.data.energy=65000; bpy.context.object.data.shape='DISK'; bpy.context.object.data.size=85
bpy.ops.object.light_add(type='SUN',location=(0,0,50)); bpy.context.object.rotation_euler=(.4,-.5,-.3); bpy.context.object.data.energy=1.5
bpy.ops.object.camera_add(location=(80,-125,150)); camera=bpy.context.object; target=Vector((0,-4,0)); camera.rotation_euler=(target-camera.location).to_track_quat('-Z','Y').to_euler(); camera.data.type='ORTHO'; camera.data.ortho_scale=169; bpy.context.scene.camera=camera
scene=bpy.context.scene; scene.render.engine='CYCLES'; scene.cycles.samples=32
scene.render.resolution_x=1800; scene.render.resolution_y=1350; scene.render.resolution_percentage=100
scene.world.color=(.15,.15,.15); scene.view_settings.view_transform='Standard'
scene.render.image_settings.file_format='PNG'; scene.render.filepath=str(OUT/'satMap_3D_blue_confirmed.png')
scene['Read me']='Conceptual reconstruction of satMap.png. Boundary traced manually. Building heights, canopy positions and platform thickness are illustrative; no surveyed elevation or scale supplied.'
for screen in bpy.data.screens:
    for area in screen.areas:
        if area.type=='VIEW_3D':
            area.spaces.active.region_3d.view_perspective='CAMERA'
            area.spaces.active.shading.type='MATERIAL'
bpy.ops.wm.save_as_mainfile(filepath=str(OUT/'satMap_3D_blue_confirmed.blend'))
bpy.ops.render.render(write_still=True)
