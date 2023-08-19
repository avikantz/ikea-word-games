import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

import { Providers } from "./providers";
import { Header } from "@/components";

export const metadata: Metadata = {
  title: "IKEA Word Games",
  description: "Word games with IKEA product names",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Providers>
        <body>
          <Header />
          {children}
          <Analytics />
        </body>
      </Providers>
    </html>
  );
}
