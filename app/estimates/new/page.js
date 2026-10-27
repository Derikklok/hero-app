import DocumentBuilder from "@/components/document/DocumentBuilder";

export const metadata = { title: "New Estimate — Ledgerline" };

export default function NewEstimatePage() {
  return <DocumentBuilder type="estimate" />;
}
