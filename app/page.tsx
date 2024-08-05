export default function Home() {
  return (
    <main className="flex flex-col items-center p-24">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
      <h1 className="text-6xl font-bold">Find your next 100x Job</h1>
      <h2 className="text-xl font-semibold">
        An initiative by{" "}
        <a href="https://100xdevs.com/" className="font-bold underline">
          100xDevs
        </a>
      </h2>

      <div className="border w-3/5 min-h-96 mt-12 rounded-lg">
      <h1 className="text-center my-6 font-bold text-2xl">Latest Jobs</h1>
      <div className="border my-4 mx-10 rounded-lg min-h-20 animate-pulse bg-slate-100"></div>
      <div className="border my-4 mx-10 rounded-lg min-h-20 animate-pulse bg-slate-100"></div>
      <div className="border my-4 mx-10 rounded-lg min-h-20 animate-pulse bg-slate-100"></div>
      </div>
    </main>
  );
}
