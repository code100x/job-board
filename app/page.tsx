import Footer from "@/components/footer";
import { BriefcaseIcon, RocketIcon, SearchIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <Hero />
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Streamline your hiring and job search
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our job board offers a range of features to help you find the
                  perfect candidate or land your dream job.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <div className="bg-primary rounded-md p-3 flex items-center justify-center">
                          <SearchIcon className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <h3 className="text-xl font-bold">
                          Intuitive Job Search
                        </h3>
                      </div>
                      <p className="text-muted-foreground">
                        Easily search and filter through a vast database of job
                        listings to find the perfect opportunity.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <div className="bg-primary rounded-md p-3 flex items-center justify-center">
                          <BriefcaseIcon className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <h3 className="text-xl font-bold">Employer Branding</h3>
                      </div>
                      <p className="text-muted-foreground">
                        Showcase your company&apos;s culture and values to
                        attract top talent.
                      </p>
                    </div>
                  </li>

                  <li>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <div className="bg-primary rounded-md p-3 flex items-center justify-center">
                          <RocketIcon className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <h3 className="text-xl font-bold">Accelerate Hiring</h3>
                      </div>
                      <p className="text-muted-foreground">
                        Quickly find and connect with top talent to fill your
                        open roles.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <Image
                src="/placeholder.svg"
                width="550"
                height="310"
                alt="Features"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:px-10 md:gap-16 md:grid-cols-2">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Trusted by Thousands
                </div>
                <h2 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                  Join the leading job board
                </h2>
                <Link
                  href="#"
                  className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Post a Job
                </Link>
              </div>
              <div className="flex flex-col items-start space-y-4">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Why Choose Us?
                </div>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  Our job board offers a range of features to help you find the
                  perfect candidate or land your dream job. From intuitive
                  search to employer branding and streamlined applications, we
                  have everything you need to succeed.
                </p>
                <Link
                  href="#"
                  className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Find Jobs
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 justify-center text-center items-center">
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl font-extrabold tracking-tighter sm:text-5xl lg:text-6xl">
                Find your dream job <br /> with{" "}
                <span className="text-blue-500">100xHire</span>
              </h1>
              <p className="max-w-sm md:max-w-[600px] text-muted-foreground md:text-xl mx-auto">
                Discover the best job opportunities and connect with top
                employers in your industry.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
              <Link
                href="/jobs"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Post a Job
              </Link>
              <Link
                href="/jobs"
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Find Jobs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
