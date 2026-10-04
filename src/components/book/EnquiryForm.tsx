"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm, useWatch, type FieldPath } from "react-hook-form";
import { Button, ButtonLink } from "@/components/ui/Button";
import { artists } from "@/content/artists";
import { whatsappLink } from "@/content/site";
import { styleName, styles, type StyleId } from "@/content/work";
import { budgets, enquirySchema, enquirySummary, MAX_FILES, palettes, placements, sizes, type Enquiry } from "@/lib/enquiry";
import { cn, ease } from "@/lib/utils";

const STEPS: { title: string; label: string; fields: FieldPath<Enquiry>[] }[] = [
  { title: "The idea", label: "What are we making?", fields: ["styles", "idea"] },
  { title: "Placement", label: "Where, and how big?", fields: ["placement", "size", "palette"] },
  { title: "References", label: "Show us what inspires you", fields: [] },
  { title: "You", label: "How do we reach you?", fields: ["name", "phone", "email", "adult"] },
];

type Ref = { id: string; file: File; url: string };

/** Downscale photos in the browser so uploads stay small and fast. */
async function compress(file: File): Promise<File> {
  if (!file.type.startsWith("image/")) return file;
  try {
    const bmp = await createImageBitmap(file);
    const scale = Math.min(1, 1600 / Math.max(bmp.width, bmp.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bmp.width * scale);
    canvas.height = Math.round(bmp.height * scale);
    canvas.getContext("2d")!.drawImage(bmp, 0, 0, canvas.width, canvas.height);
    for (const q of [0.82, 0.7, 0.55]) {
      const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/jpeg", q));
      if (blob && blob.size < 1.4 * 1024 * 1024) {
        return new File([blob], file.name.replace(/\.\w+$/, "") + ".jpg", { type: "image/jpeg" });
      }
    }
  } catch {}
  return file;
}

function Chip({ active, children, ...rest }: { active: boolean; children: React.ReactNode } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={cn(
        "rounded-full border px-5 py-3 text-sm transition-all duration-500 ease-expo",
        active ? "border-copper bg-copper text-ink" : "border-bone/15 text-bone/75 hover:border-bone/40 hover:text-bone",
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

function Field({ label, error, children, hint }: { label: string; error?: string; children: React.ReactNode; hint?: string }) {
  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between gap-4">
        <span className="eyebrow text-ash">{label}</span>
        {hint && <span className="eyebrow text-ash/60">{hint}</span>}
      </div>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p role="alert" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-2 text-sm text-copper-light">
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputCls =
  "w-full border-b border-bone/20 bg-transparent py-3 text-lg text-bone placeholder:text-bone/25 transition-colors focus:border-copper focus:outline-none";

export function EnquiryForm({ initialArtist, initialStyle }: { initialArtist?: string; initialStyle?: string }) {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [refs, setRefs] = useState<Ref[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "fallback" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<Enquiry>({
    resolver: zodResolver(enquirySchema),
    mode: "onTouched",
    defaultValues: {
      styles: initialStyle && styles.some((s) => s.id === initialStyle) ? [initialStyle] : [],
      idea: "",
      placement: "",
      size: "",
      palette: "",
      artist: artists.some((a) => a.slug === initialArtist) ? initialArtist : "any",
      name: "",
      phone: "",
      email: "",
      dates: "",
      budget: "",
      firstTattoo: false,
      company: "",
    },
  });

  const values = useWatch({ control }) as Enquiry;
  const label = (id: string) => (styles.some((s) => s.id === id) ? styleName(id as StyleId) : id);

  // Revoke preview URLs when the form unmounts.
  const refsRef = useRef(refs);
  useEffect(() => {
    refsRef.current = refs;
  }, [refs]);
  useEffect(() => () => refsRef.current.forEach((r) => URL.revokeObjectURL(r.url)), []);

  const removeRef = (id: string) =>
    setRefs((all) => {
      const gone = all.find((x) => x.id === id);
      if (gone) URL.revokeObjectURL(gone.url);
      return all.filter((x) => x.id !== id);
    });

  const scrollTop = () => document.getElementById("enquiry")?.scrollIntoView({ behavior: "smooth", block: "start" });

  const next = async () => {
    const ok = await trigger(STEPS[step].fields);
    if (!ok) return;
    setDir(1);
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
    scrollTop();
  };
  const back = () => {
    setDir(-1);
    setStep((s) => Math.max(0, s - 1));
    scrollTop();
  };

  const addFiles = async (list: FileList | null) => {
    if (!list) return;
    const incoming = Array.from(list).filter((f) => f.type.startsWith("image/")).slice(0, MAX_FILES - refs.length);
    const compressed = await Promise.all(incoming.map(compress));
    setRefs((r) => [...r, ...compressed.map((file) => ({ id: crypto.randomUUID(), file, url: URL.createObjectURL(file) }))]);
  };

  const waMessage = (data: Enquiry) =>
    enquirySummary({ ...data, artist: data.artist === "any" ? undefined : data.artist }, label) +
    (refs.length ? `\n\n(I have ${refs.length} reference image${refs.length > 1 ? "s" : ""} to share.)` : "");

  const onSubmit = async (data: Enquiry) => {
    setStatus("sending");
    setServerError(null);
    const payload = { ...data, artist: data.artist === "any" ? undefined : artists.find((a) => a.slug === data.artist)?.name };
    const body = new FormData();
    body.set("data", JSON.stringify(payload));
    refs.forEach((r) => body.append("files", r.file));
    try {
      const res = await fetch("/api/enquiry", { method: "POST", body });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) setStatus("sent");
      else if (json.fallback) setStatus("fallback");
      else {
        setServerError(json.error ?? "Something went wrong.");
        setStatus("error");
      }
    } catch {
      setStatus("fallback");
    }
    scrollTop();
  };

  if (status === "sent" || status === "fallback") {
    const sent = status === "sent";
    return (
      <motion.div id="enquiry" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: ease.expo }} className="scroll-mt-28 border hairline bg-coal p-8 md:p-14">
        <p className="eyebrow text-copper">{sent ? "Enquiry received" : "One last step"}</p>
        <h2 className="mt-6 font-display text-huge leading-[0.92]">
          {sent ? (
            <>
              Thank <span className="italic text-copper">you.</span>
            </>
          ) : (
            <>
              Send it on <span className="italic text-copper">WhatsApp</span>
            </>
          )}
        </h2>
        <p className="mt-6 max-w-lg text-lg leading-relaxed text-bone/70">
          {sent
            ? "We've got your idea. Your artist will look it over and reply within a day or two with thoughts, a quote and available dates."
            : "Tap below to send your enquiry straight to the studio on WhatsApp — everything you filled in is already written out for you."}
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          {sent ? (
            <ButtonLink href="/work" variant="outline">Browse more work</ButtonLink>
          ) : (
            <ButtonLink href={whatsappLink(waMessage(values))}>Open WhatsApp</ButtonLink>
          )}
          <ButtonLink href="/aftercare" variant="ghost">Read aftercare</ButtonLink>
        </div>
      </motion.div>
    );
  }

  return (
    <div id="enquiry" className="grid scroll-mt-28 gap-12 lg:grid-cols-12">
      <form
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={(e) => {
          // Enter advances a step instead of submitting early.
          if (e.key === "Enter" && step < STEPS.length - 1 && !(e.target instanceof HTMLTextAreaElement)) {
            e.preventDefault();
            next();
          }
        }}
        noValidate
        className="lg:col-span-8"
      >
        {/* Progress */}
        <ol className="mb-14 grid grid-cols-4 gap-2" aria-label="Progress">
          {STEPS.map((s, i) => (
            <li key={s.title} aria-current={i === step ? "step" : undefined}>
              <div className="relative h-px bg-line">
                <motion.div className="absolute inset-0 origin-left bg-copper" animate={{ scaleX: i <= step ? 1 : 0 }} transition={{ duration: 0.8, ease: ease.expo }} />
              </div>
              <p className={cn("eyebrow mt-3 hidden transition-colors sm:block", i <= step ? "text-bone" : "text-ash/60")}>
                0{i + 1} {s.title}
              </p>
            </li>
          ))}
        </ol>

        <div className="relative min-h-[420px]">
          <AnimatePresence mode="wait" custom={dir} initial={false}>
            <motion.fieldset
              key={step}
              custom={dir}
              initial={{ opacity: 0, x: dir * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -40 }}
              transition={{ duration: 0.6, ease: ease.expo }}
              className="space-y-12"
            >
              <legend className="mb-12">
                <span className="eyebrow text-copper">
                  Step 0{step + 1} / 0{STEPS.length}
                </span>
                <span className="mt-4 block font-display text-big leading-[1]">{STEPS[step].label}</span>
              </legend>

              {step === 0 && (
                <>
                  <Field label="Style — pick any" error={errors.styles?.message}>
                    <Controller
                      control={control}
                      name="styles"
                      render={({ field }) => (
                        <div className="flex flex-wrap gap-2">
                          {[...styles.map((s) => ({ id: s.id, name: s.name })), { id: "Cover-up", name: "Cover-up" }, { id: "Not sure", name: "Not sure" }].map((s) => {
                            const on = field.value.includes(s.id);
                            return (
                              <Chip key={s.id} active={on} onClick={() => field.onChange(on ? field.value.filter((v) => v !== s.id) : [...field.value, s.id])}>
                                {s.name}
                              </Chip>
                            );
                          })}
                        </div>
                      )}
                    />
                  </Field>
                  <Field label="Describe your idea" error={errors.idea?.message} hint="Meaning, mood, elements">
                    <textarea
                      {...register("idea")}
                      rows={5}
                      placeholder="A fine-line lotus on my forearm with my daughter's birth date woven into the stem…"
                      className={cn(inputCls, "resize-none leading-relaxed")}
                    />
                  </Field>
                </>
              )}

              {step === 1 && (
                <>
                  <Field label="Placement" error={errors.placement?.message}>
                    <Controller
                      control={control}
                      name="placement"
                      render={({ field }) => (
                        <div className="flex flex-wrap gap-2">
                          {placements.map((p) => (
                            <Chip key={p} active={field.value === p} onClick={() => field.onChange(p)}>
                              {p}
                            </Chip>
                          ))}
                        </div>
                      )}
                    />
                  </Field>
                  <Field label="Approximate size" error={errors.size?.message}>
                    <Controller
                      control={control}
                      name="size"
                      render={({ field }) => (
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                          {sizes.map((s, i) => (
                            <button
                              key={s.id}
                              type="button"
                              aria-pressed={field.value === s.id}
                              onClick={() => field.onChange(s.id)}
                              className={cn(
                                "flex flex-col items-start gap-6 border p-4 text-left transition-all duration-500",
                                field.value === s.id ? "border-copper bg-copper/10" : "border-bone/15 hover:border-bone/40",
                              )}
                            >
                              <span className="flex h-10 items-end">
                                <span className={cn("block rounded-full border", field.value === s.id ? "border-copper" : "border-bone/40")} style={{ width: 8 + i * 8, height: 8 + i * 8 }} />
                              </span>
                              <span>
                                <span className="block font-display text-2xl leading-none">{s.label}</span>
                                <span className="eyebrow mt-2 block text-ash">{s.hint}</span>
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
                    />
                  </Field>
                  <Field label="Palette" error={errors.palette?.message}>
                    <Controller
                      control={control}
                      name="palette"
                      render={({ field }) => (
                        <div className="flex flex-wrap gap-2">
                          {palettes.map((p) => (
                            <Chip key={p} active={field.value === p} onClick={() => field.onChange(p)}>
                              {p}
                            </Chip>
                          ))}
                        </div>
                      )}
                    />
                  </Field>
                </>
              )}

              {step === 2 && (
                <Field label="Reference images — optional" hint={`${refs.length}/${MAX_FILES}`}>
                  <label
                    className={cn(
                      "group flex min-h-56 flex-col items-center justify-center gap-4 border border-dashed border-bone/20 p-8 text-center transition-colors hover:border-copper",
                      refs.length >= MAX_FILES && "pointer-events-none opacity-40",
                    )}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      addFiles(e.dataTransfer.files);
                    }}
                  >
                    <span className="font-display text-4xl italic text-copper transition-transform duration-500 group-hover:-translate-y-1">+</span>
                    <span className="font-display text-3xl">Drop images or tap to upload</span>
                    <span className="eyebrow text-ash">Up to {MAX_FILES} photos — placement shots, inspiration, old tattoos to cover</span>
                    <input type="file" accept="image/*" multiple className="sr-only" onChange={(e) => addFiles(e.target.files)} disabled={refs.length >= MAX_FILES} />
                  </label>
                  {refs.length > 0 && (
                    <ul className="mt-4 grid grid-cols-3 gap-3">
                      {refs.map((r) => (
                        <li key={r.id} className="group relative aspect-square overflow-hidden border hairline">
                          <Image src={r.url} alt="Reference" fill unoptimized className="object-cover" />
                          <button
                            type="button"
                            onClick={() => removeRef(r.id)}
                            className="eyebrow absolute right-2 top-2 rounded-full bg-ink/80 px-3 py-1.5 text-bone backdrop-blur transition-colors hover:text-copper"
                            aria-label="Remove image"
                          >
                            ✕
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </Field>
              )}

              {step === 3 && (
                <>
                  <div className="grid gap-10 sm:grid-cols-2">
                    <Field label="Your name" error={errors.name?.message}>
                      <input {...register("name")} autoComplete="name" className={inputCls} placeholder="Full name" />
                    </Field>
                    <Field label="Phone / WhatsApp" error={errors.phone?.message}>
                      <input {...register("phone")} type="tel" autoComplete="tel" inputMode="tel" className={inputCls} placeholder="+91" />
                    </Field>
                    <Field label="Email — optional" error={errors.email?.message}>
                      <input {...register("email")} type="email" autoComplete="email" className={inputCls} placeholder="you@example.com" />
                    </Field>
                    <Field label="Preferred dates — optional">
                      <input {...register("dates")} className={inputCls} placeholder="Weekends in November" />
                    </Field>
                  </div>
                  <Field label="Artist">
                    <Controller
                      control={control}
                      name="artist"
                      render={({ field }) => (
                        <div className="flex flex-wrap gap-2">
                          <Chip active={field.value === "any"} onClick={() => field.onChange("any")}>
                            First available
                          </Chip>
                          {artists.map((a) => (
                            <Chip key={a.slug} active={field.value === a.slug} onClick={() => field.onChange(a.slug)}>
                              {a.name}
                            </Chip>
                          ))}
                        </div>
                      )}
                    />
                  </Field>
                  <Field label="Budget — optional">
                    <Controller
                      control={control}
                      name="budget"
                      render={({ field }) => (
                        <div className="flex flex-wrap gap-2">
                          {budgets.map((b) => (
                            <Chip key={b} active={field.value === b} onClick={() => field.onChange(field.value === b ? "" : b)}>
                              {b}
                            </Chip>
                          ))}
                        </div>
                      )}
                    />
                  </Field>
                  <div className="space-y-4">
                    <label className="flex cursor-pointer items-center gap-4">
                      <input type="checkbox" {...register("firstTattoo")} className="peer sr-only" />
                      <span className="flex h-5 w-5 items-center justify-center border border-bone/30 text-transparent transition-colors peer-checked:border-copper peer-checked:bg-copper peer-checked:text-ink peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-copper">
                        ✓
                      </span>
                      <span className="text-bone/80">This is my first tattoo</span>
                    </label>
                    <label className="flex cursor-pointer items-center gap-4">
                      <input type="checkbox" {...register("adult")} className="peer sr-only" />
                      <span className="flex h-5 w-5 items-center justify-center border border-bone/30 text-transparent transition-colors peer-checked:border-copper peer-checked:bg-copper peer-checked:text-ink peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-copper">
                        ✓
                      </span>
                      <span className="text-bone/80">I confirm I am 18 or older</span>
                    </label>
                    {errors.adult && <p role="alert" className="text-sm text-copper-light">{errors.adult.message}</p>}
                  </div>
                  <div className="absolute -left-[9999px]" aria-hidden>
                    <label>
                      Company
                      <input {...register("company")} tabIndex={-1} autoComplete="off" />
                    </label>
                  </div>
                </>
              )}
            </motion.fieldset>
          </AnimatePresence>
        </div>

        {serverError && (
          <p role="alert" className="mt-8 border border-copper/40 p-4 text-copper-light">
            {serverError}{" "}
            <a className="underline" href={whatsappLink(waMessage(values))}>
              Send on WhatsApp instead →
            </a>
          </p>
        )}

        <div className="mt-14 flex items-center justify-between gap-4 border-t hairline pt-8">
          <Button type="button" variant="ghost" arrow={false} onClick={back} className={cn(step === 0 && "invisible")}>
            ← Back
          </Button>
          {step < STEPS.length - 1 ? (
            <Button type="button" onClick={next}>
              {step === 2 ? (refs.length ? "Continue" : "Skip") : "Continue"}
            </Button>
          ) : (
            <Button type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Send enquiry"}
            </Button>
          )}
        </div>
      </form>

      {/* Live summary */}
      <aside className="lg:col-span-4">
        <div className="border hairline bg-coal p-8 lg:sticky lg:top-28">
          <p className="eyebrow text-ash">Your enquiry</p>
          <dl className="mt-6 space-y-4">
            {[
              ["Style", values.styles?.map(label).join(", ")],
              ["Placement", values.placement],
              ["Size", sizes.find((s) => s.id === values.size)?.label],
              ["Palette", values.palette],
              ["References", refs.length ? `${refs.length} image${refs.length > 1 ? "s" : ""}` : ""],
              ["Artist", values.artist === "any" ? "First available" : artists.find((a) => a.slug === values.artist)?.name],
            ].map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-4 border-b hairline pb-3">
                <dt className="eyebrow text-ash">{k}</dt>
                <dd className={cn("text-right font-display text-xl", !v && "text-bone/20")}>{v || "—"}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 text-sm leading-relaxed text-bone/50">
            No commitment — this simply starts the conversation. We reply with ideas, a quote and dates.
          </p>
          <a href={whatsappLink("Hi Eden Tattoos! I'd like to enquire about a tattoo.")} className="eyebrow mt-6 inline-block border-b border-copper pb-1 text-copper">
            Prefer to just chat? WhatsApp →
          </a>
        </div>
      </aside>
    </div>
  );
}
