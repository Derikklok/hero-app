import DocumentBuilder from "@/components/document/DocumentBuilder";

export const metadata = { title: "New Invoice — Ledgerline" };

export default function NewInvoicePage() {
  return <DocumentBuilder type="invoice" />;
}
