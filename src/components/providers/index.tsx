import { ThemeProvider } from "@/components/providers/theme";
import { Toaster } from "@/components/ui/sonner";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      disableTransitionOnChange
      defaultTheme="system"
      attribute="class"
      enableSystem
    >
      {children}
      <Toaster position="top-center" closeButton richColors />
    </ThemeProvider>
  );
}

export { Providers };
