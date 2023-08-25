"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Next13ProgressBar } from "next13-progressbar";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "nextjs-google-analytics";

import theme from "@/theme";

const CACHE_TIME = 1000 * 60 * 60 * 24 * 30; // 30 days

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: CACHE_TIME,
      staleTime: Infinity,
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Next13ProgressBar height="4px" color="#008AFF" showOnShallow />

        <Analytics />
        <GoogleAnalytics trackPageViews />

        {children}
      </QueryClientProvider>
    </ChakraProvider>
  );
}
