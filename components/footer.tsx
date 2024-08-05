import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-muted justify-between">
      <p className="text-muted-foreground">
        &copy; {new Date().getFullYear()} 100xHire. All rights reserved.
      </p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link
          href="#"
          className="hover:underline underline-offset-4"
          prefetch={false}
        >
          Terms of Service
        </Link>
        <Link
          href="#"
          className="hover:underline underline-offset-4"
          prefetch={false}
        >
          Privacy Policy
        </Link>
        <Link
          href="#"
          className=" hover:underline underline-offset-4"
          prefetch={false}
        >
          Contact Us
        </Link>
      </nav>
    </footer>
  );
}
