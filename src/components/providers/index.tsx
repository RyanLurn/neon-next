import { ThemeProvider } from "@/components/providers/theme";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      disableTransitionOnChange
      defaultTheme="system"
      attribute="class"
      enableSystem
    >
      {children}
    </ThemeProvider>
  );
}

export { Providers };
