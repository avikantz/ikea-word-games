import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "@fontsource-variable/open-sans";

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
      <body>
        <Providers>
          <Header />
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
