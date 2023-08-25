import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "nextjs-google-analytics";
import "@fontsource-variable/open-sans";

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
    <html lang="en">
      <body>
        <Providers>
          {children}
          <Analytics />
          <GoogleAnalytics trackPageViews />
        </Providers>
      </body>
    </html>
  );
}
