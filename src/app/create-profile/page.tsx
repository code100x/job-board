import VerticalLinearStepper from '@/components/user-multistep-form/user-multistep-form';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'USER') redirect('/');
  if (session.user.onBoard === true) redirect('/jobs');
  return (
    <div className="flex flex-col justify-center place-items-center">
      <h1 className="text-xl font-bold  md:text-3xl  md:font-extrabold mb-8">
        Hey {session?.user.name} let&apos;s get you set up and started!
      </h1>
      <VerticalLinearStepper />
    </div>
  );
}
