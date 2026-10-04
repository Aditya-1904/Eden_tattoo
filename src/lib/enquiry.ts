import { z } from "zod";

export const placements = ["Forearm", "Upper arm", "Shoulder", "Back", "Chest", "Sternum", "Ribs", "Thigh", "Calf", "Hand", "Neck", "Other"] as const;
export const sizes = [
  { id: "tiny", label: "Tiny", hint: "Under 5 cm" },
  { id: "small", label: "Small", hint: "Palm-sized" },
  { id: "medium", label: "Medium", hint: "Half a forearm" },
  { id: "large", label: "Large", hint: "Full forearm / calf" },
  { id: "xl", label: "Sleeve / back", hint: "Multi-session" },
] as const;
export const palettes = ["Black & grey", "Colour", "Not sure yet"] as const;
export const budgets = ["Under ₹5,000", "₹5,000 – 15,000", "₹15,000 – 40,000", "₹40,000+", "Open / not sure"] as const;

export const MAX_FILES = 3;

export const enquirySchema = z.object({
  styles: z.array(z.string()).min(1, "Pick at least one style"),
  idea: z.string().trim().min(10, "Tell us a little more — at least a sentence").max(2000),
  placement: z.string().min(1, "Choose a placement"),
  size: z.string().min(1, "Choose a size"),
  palette: z.string().min(1, "Choose a palette"),
  artist: z.string().optional(),
  name: z.string().trim().min(2, "Please enter your name").max(100),
  phone: z
    .string()
    .trim()
    .min(8, "Please enter a valid phone number")
    .max(20)
    .regex(/^[+\d\s()-]+$/, "Please enter a valid phone number"),
  email: z.union([z.literal(""), z.email("Please enter a valid email")]).optional(),
  dates: z.string().max(200).optional(),
  budget: z.string().optional(),
  firstTattoo: z.boolean().optional(),
  adult: z.literal(true, { error: "You must be 18 or older" }),
  /** Honeypot — real users never see or fill this. */
  company: z.string().max(200).optional(),
});

export type Enquiry = z.infer<typeof enquirySchema>;

export function enquirySummary(e: Enquiry, styleLabel: (id: string) => string = (s) => s) {
  return [
    `New tattoo enquiry — ${e.name}`,
    ``,
    `Style: ${e.styles.map(styleLabel).join(", ")}`,
    `Placement: ${e.placement}`,
    `Size: ${sizes.find((s) => s.id === e.size)?.label ?? e.size}`,
    `Palette: ${e.palette}`,
    e.artist ? `Artist: ${e.artist}` : null,
    e.budget ? `Budget: ${e.budget}` : null,
    e.dates ? `Preferred dates: ${e.dates}` : null,
    e.firstTattoo ? `First tattoo: yes` : null,
    ``,
    `Idea:`,
    e.idea,
    ``,
    `Phone: ${e.phone}`,
    e.email ? `Email: ${e.email}` : null,
  ]
    .filter((l) => l !== null)
    .join("\n");
}
