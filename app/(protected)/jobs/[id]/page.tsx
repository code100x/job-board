import React from "react";
import { prisma } from "@/lib/db";

async function getJob(id: string) {
  return await prisma.job.findUnique({
    where: { id },
  });
}
const page = async ({ params }: { params: { id: string } }) => {
  const job = await getJob(params.id);
  if (!job) {
    return <h1>This is error is needed to be udpate</h1>;
  }
  return (
    <section className="container md:mt-12 mt-6">
      <h1 className="lg:text-3xl text-gray-900 tracking-tight font-semibold">
        {job.title}
      </h1>
      <div className="flex border rounded-md p-3 mt-6">
        <h2 className=" text-gray-500 font-semibold tracking-tighter flex-grow">
          Company: <span className="text-foreground">{job.companyName}</span>
        </h2>
        <h2 className=" text-gray-500 font-semibold tracking-tighter flex-grow">
          Salary:{" "}
          <span className="text-foreground">
            {" "}
            {job.salary} {job.currency}
          </span>
        </h2>
      </div>
      <div className="mt-6">
        <h3 className="font-medium">Descrption:</h3>
        <p className="text-muted-foreground mt-1">{job.description}</p>
      </div>
    </section>
  );
};

export default page;
