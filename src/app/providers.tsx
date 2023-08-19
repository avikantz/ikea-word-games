"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ChakraProvider>
  );
}
