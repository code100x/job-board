import Link from 'next/link';

const Hero = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-6xl font-bold">Find your next 100x Job</h1>
      <h2 className="text-xl font-semibold">
        An initiative by{' '}
        <Link href="https://100xdevs.com/" className="font-bold underline">
          100xDevs
        </Link>
      </h2>
    </div>
  );
};

export default Hero;
