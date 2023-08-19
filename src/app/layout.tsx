import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

import { Providers } from "./providers";

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
    <html lang="en" className="dark">
      <Providers>
        <body>
          {children}
          <Analytics />
        </body>
      </Providers>
    </html>
  );
}
