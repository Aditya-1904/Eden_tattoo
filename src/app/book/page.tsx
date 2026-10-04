import type { Metadata } from "next";
import { EnquiryForm } from "@/components/book/EnquiryForm";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Book a Tattoo — Enquiry",
  description: "Start your custom tattoo enquiry with Eden Tattoos, Chandigarh. Share your idea, placement and references — we'll reply with a quote and dates.",
  alternates: { canonical: "/book" },
};

export default async function BookPage({ searchParams }: PageProps<"/book">) {
  const { artist, style } = await searchParams;
  return (
    <>
      <PageHeader
        index="B"
        eyebrow="Book a session"
        title="Tell us your *story*"
        intro="Four short steps. The more you share, the better your first design will be. We usually reply within a day or two."
      />
      <section className="container-x pb-32">
        <EnquiryForm initialArtist={typeof artist === "string" ? artist : undefined} initialStyle={typeof style === "string" ? style : undefined} />
      </section>
    </>
  );
}
