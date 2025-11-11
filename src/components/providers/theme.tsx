"use client";

import type { ComponentProps } from "react";

import { ThemeProvider as NextThemesProvider } from "next-themes";

function ThemeProvider({
  children,
  ...properties
}: ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...properties}>{children}</NextThemesProvider>;
}

export { ThemeProvider };
