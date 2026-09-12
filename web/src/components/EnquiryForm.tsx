"use client";

// Shared enquiry form logic — used by the Home general enquiry and (with a parcel chip
// prepended) the parcel detail form. Source: handoff_unitiproperty_v2's submitForm().
// Required: name and email only. Organisation/phone/role/intended-use are optional.
// The NDA checkbox is informational, not a submit gate (README §Forms: "asking someone to
// accept confidentiality before they know the price is backwards" — the handoff's actual
// prototype code gated on it, which the README explicitly argues against; this
// implementation follows the stated intent, not the prototype bug).

import { useState, type FormEvent } from "react";
import { useLang } from "@/lib/LangContext";
import { T } from "@/lib/dict";
import { PARCELS, PHONE_NUMBER, ROLES, waHref, type Parcel } from "@/lib/parcels";

export function EnquiryForm({ parcel }: { parcel?: Parcel }) {
  const { lang } = useLang();
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const bm = lang === "BM";

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const val = (k: string) => String(data.get(k) ?? "").trim();
    const errs: string[] = [];
    if (!val("fullname")) errs.push(bm ? "Nama penuh diperlukan." : "Full name is required.");
    const email = val("email");
    if (!email) errs.push(bm ? "E-mel diperlukan." : "Email is required.");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      errs.push(bm ? "E-mel itu kelihatan tidak lengkap." : "That email looks incomplete.");
    }
    if (errs.length) {
      setErrors(errs);
      return;
    }
    setErrors([]);
    setSent(true);
  }

  const wa = waHref(lang, parcel ? parcel.name : "Tanjung Agas");
  const tel = `tel:${PHONE_NUMBER.replace(/[^+\d]/g, "")}`;

  if (sent) {
    return (
      <div>
        <span
          className="inline-flex h-10 w-10 items-center justify-center rounded-full font-sans text-[17px] font-semibold"
          style={{ background: "var(--accent)", color: "var(--on-accent)" }}
        >
          ✓
        </span>
        <p className="mt-4 font-serif text-[22px] leading-[1.2]">{T.sentTitle[lang]}</p>
        {parcel && (
          <p className="mt-2 font-sans text-[14px] text-ink-55">
            {parcel.name} · {parcel.area[lang]}
          </p>
        )}
        <p className="mt-3 font-sans text-[15px] leading-relaxed text-ink-70">{T.sentBody[lang]}</p>
        <p className="mt-3 font-sans text-[13px] text-ink-55">{T.orWord[lang]}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <a
            href={wa}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 rounded-soft-sm px-4 py-3 font-sans text-[13px] font-semibold text-white"
            style={{ background: "var(--whatsapp)" }}
          >
            {T.waLabel[lang]}
          </a>
          <a href={tel} className="inline-flex items-center gap-2 rounded-soft-sm border border-hair-2 px-4 py-3 font-sans text-[13px] font-medium text-ink">
            {T.callLabel[lang]}
          </a>
        </div>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-[22px] rounded-soft-sm border border-hair-2 bg-transparent px-[18px] py-[13px] font-sans text-[12px] font-semibold text-ink-70"
        >
          {T.sendAnother[lang]}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {parcel && (
        <p className="font-serif text-[22px] leading-[1.25]">{T.hZoneForm[lang]}</p>
      )}
      {parcel && (
        <p className="mt-[10px] mb-4 font-sans text-[14px] leading-[1.55] text-ink-55">
          {T.pZoneForm[lang]}
        </p>
      )}
      {parcel && (
        <div className="mb-[18px] flex items-center gap-[10px] rounded-soft-sm border border-hair bg-bg px-[14px] py-3">
          <span
            className="h-[14px] w-[14px] flex-none rounded-[3px]"
            style={{ background: parcel.color }}
          />
          <span className="min-w-0">
            <span className="block font-sans text-[14px] font-medium text-ink">{parcel.name}</span>
            <span className="mt-[2px] block font-sans text-[12px] text-ink-55">
              {parcel.area[lang]} · {parcel.use[lang]}
            </span>
          </span>
        </div>
      )}

      {errors.length > 0 && (
        <div
          role="alert"
          className="mb-[18px] rounded-soft-sm border border-accent p-[14px]"
          style={{ background: "color-mix(in srgb, var(--accent) 10%, transparent)" }}
        >
          <p className="mb-2 font-sans text-[13px] font-semibold text-ink">{T.errTitle[lang]}</p>
          {errors.map((msg) => (
            <p key={msg} className="mt-[3px] font-sans text-[13px] leading-relaxed text-ink-70">
              — {msg}
            </p>
          ))}
        </div>
      )}

      <div className={parcel ? "flex flex-col gap-[14px]" : "grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4"}>
        <Field label={T.fName[lang]} name="fullname" type="text" autoComplete="name" />
        <Field
          label={`${T.fOrg[lang]} ${T.optionalWord[lang]}`}
          name="org"
          type="text"
          autoComplete="organization"
        />
        <Field label={T.fEmail[lang]} name="email" type="email" autoComplete="email" />
        {!parcel && (
          <Field
            label={`${T.fPhone[lang]} ${T.optionalWord[lang]}`}
            name="phone"
            type="tel"
            autoComplete="tel"
          />
        )}
      </div>

      {parcel ? (
        <label className="mt-[14px] block">
          <span className="mb-2 block font-sans text-[11px] font-semibold uppercase tracking-[.12em] text-ink-55">
            {`${T.fRole[lang]} ${T.optionalWord[lang]}`}
          </span>
          <select
            name="role"
            className="w-full rounded-soft-sm border border-hair-2 bg-bg px-[14px] py-[13px] font-sans text-[15px] text-ink outline-none transition-colors duration-150 focus:border-accent"
          >
            {ROLES[lang].map((label) => (
              <option key={label}>{label}</option>
            ))}
          </select>
        </label>
      ) : (
        <label className="mt-4 block">
          <span className="mb-2 block font-sans text-[11px] font-semibold uppercase tracking-[.12em] text-ink-55">
            {T.fInterest[lang]}
          </span>
          <select
            name="parcel"
            defaultValue={T.optAll[lang]}
            className="w-full rounded-soft-sm border border-hair-2 bg-bg px-[14px] py-[13px] font-sans text-[15px] text-ink outline-none transition-colors duration-150 focus:border-accent"
          >
            <option>{T.optAll[lang]}</option>
            {PARCELS.map((p) => (
              <option key={p.id}>{p.name}</option>
            ))}
          </select>
        </label>
      )}

      <label className="mt-[14px] block">
        <span className="mb-2 block font-sans text-[11px] font-semibold uppercase tracking-[.12em] text-ink-55">
          {`${T.fUse[lang]} ${T.optionalWord[lang]}`}
        </span>
        <textarea
          name="use"
          className="min-h-[84px] w-full resize-y rounded-soft-sm border border-hair-2 bg-bg px-[14px] py-[13px] font-sans text-[15px] leading-relaxed text-ink outline-none transition-colors duration-150 focus:border-accent"
        />
      </label>

      {parcel && (
        <div className="my-[18px] border-t border-hair pt-4">
          <p className="mb-[10px] font-sans text-[11px] font-semibold uppercase tracking-[.12em] text-ink-55">
            {T.packTitle[lang]}
          </p>
          <p className="font-sans text-[13px] leading-relaxed text-ink-70">— {T.packA[lang]}</p>
          <p className="mt-1 font-sans text-[13px] leading-relaxed text-ink-70">— {T.packB[lang]}</p>
          <p className="mt-1 font-sans text-[13px] leading-relaxed text-ink-70">— {T.packC[lang]}</p>
        </div>
      )}

      {parcel && (
        <label className="flex cursor-pointer items-start gap-[10px]">
          <input type="checkbox" name="nda" className="mt-[3px] h-[15px] w-[15px] flex-none accent-accent" />
          <span className="font-sans text-[13px] leading-relaxed text-ink-70">{T.ndaLabel[lang]}</span>
        </label>
      )}

      <button
        type="submit"
        className="mt-5 w-full rounded-soft-sm px-[17px] py-[17px] font-sans text-[14px] font-semibold transition-colors duration-150"
        style={{ background: "var(--accent)", color: "var(--on-accent)" }}
      >
        {T.ctaSubmit[lang]}
      </button>

      {parcel && (
        <p className="mt-[14px] font-sans text-[13px] leading-relaxed text-ink-70">{T.replyNote[lang]}</p>
      )}

      {parcel && (
        <div className="mt-4 border-t border-hair pt-4">
          <p className="mb-[10px] font-sans text-[12px] text-ink-55">{T.orWord[lang]}</p>
          <div className="flex flex-wrap gap-2">
            <a
              href={wa}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-soft-sm px-4 py-3 font-sans text-[13px] font-semibold text-white"
              style={{ background: "var(--whatsapp)" }}
            >
              {T.waLabel[lang]}
            </a>
            <a href={tel} className="inline-flex items-center gap-2 rounded-soft-sm border border-hair-2 px-4 py-3 font-sans text-[13px] font-medium text-ink">
              {T.callLabel[lang]}
            </a>
          </div>
        </div>
      )}

      <p className="mt-[14px] font-sans text-[12px] leading-relaxed text-ink-40">{T.privacy[lang]}</p>
    </form>
  );
}

function Field({
  label,
  name,
  type,
  autoComplete,
}: {
  label: string;
  name: string;
  type: string;
  autoComplete: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-sans text-[11px] font-semibold uppercase tracking-[.12em] text-ink-55">
        {label}
      </span>
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        className="w-full rounded-soft-sm border border-hair-2 bg-transparent px-[14px] py-[13px] font-sans text-[15px] text-ink outline-none transition-colors duration-150 focus:border-accent"
      />
    </label>
  );
}
