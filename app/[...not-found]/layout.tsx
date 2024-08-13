import { ReactNode } from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";

type NotFoundLayoutProps = {
  children: ReactNode;
};

const NotFoundLayout = async ({ children }: NotFoundLayoutProps) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <div
        className={cn(
          "relative min-h-screen bg-background font-sans antialiased",
        )}
      >
        {children}
      </div>
    </ThemeProvider>
  );
};

export default NotFoundLayout;
