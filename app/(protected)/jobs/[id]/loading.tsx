import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  return (
    <section className="container md:mt-12 mt-6 animate-pulse">
      <div className="bg-slate-100 h-10 lg:w-3/4 w-full"></div>
      <div className="h-12 w-full rounded-md bg-slate-100 mt-6"></div>
      <div className=" h-[50vh] w-full rounded-md bg-slate-100 mt-6"></div>
    </section>
  );
};

export default page;
