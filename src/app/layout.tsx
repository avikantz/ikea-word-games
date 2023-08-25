import type { Metadata } from "next";
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
        </Providers>
      </body>
    </html>
  );
}
