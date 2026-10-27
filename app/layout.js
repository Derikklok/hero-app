import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

export const metadata = {
  title: "Ledgerline — Dashboard",
  description: "Enterprise invoicing & revenue dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full bg-background text-foreground antialiased flex flex-col">
        {children}
      </body>
    </html>
  );
}
