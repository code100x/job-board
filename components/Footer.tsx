// import Logo from '../icons/Logo'
import Link from "next/link";

export function Footer() {
  return (
    <footer className=" w-full bg-neutral-50 text-white p-5 dark:bg-neutral-900">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-4 lg:py-4">
        <div className="flex items-center  md:justify-between  md:flex-row flex-col gap-3 ">
          <h3 className="animate-text-gradient text-xl font-bold inline-flex bg-gradient-to-r from-neutral-700 via-neutral-400 to-neutral-100 bg-[200%_auto] bg-clip-text leading-tight text-transparent dark:from-neutral-100 dark:via-slate-400 dark:to-neutral-400">
            100xJobs
          </h3>
          <span className="text-sm text-gray-500 text-center dark:text-gray-400">
            © 2024 100xJobs All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0">
            <Link
              href="https://www.youtube.com/@100xDevs-n1w"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M23.498 6.186a2.99 2.99 0 0 0-2.106-2.116C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.392.57A2.99 2.99 0 0 0 .502 6.186C0 8.08 0 12 0 12s0 3.92.502 5.814a2.99 2.99 0 0 0 2.106 2.116C4.5 20.5 12 20.5 12 20.5s7.5 0 9.392-.57a2.99 2.99 0 0 0 2.106-2.116C24 15.92 24 12 24 12s0-3.92-.502-5.814zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
              </svg>
              <span className="sr-only">youtube</span>
            </Link>
            <Link
              href="https://x.com/kirat_tw"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 17"
              >
                <path
                  fillRule="evenodd"
                  d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Twitter page</span>
            </Link>
            <Link
              href="https://github.com/code100x"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">GitHub account</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
