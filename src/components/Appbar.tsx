'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { ModeToggle } from './ModeToggle';

export const Appbar = () => {
  const { data: session } = useSession();
  return (
    <div className="w-full border-b px-4 py-2 shadow-sm">
      <div className="container flex items-center justify-between">
        <div className="p-3 text-4xl font-bold">100xJobs</div>
        <div className="flex items-center gap-4">
          <ModeToggle />
          {session?.user ? (
            <>
              <span className="mr-4 font-bold">{session.user.name}</span>
              <Button onClick={() => signOut()}>Sign Out</Button>
            </>
          ) : (
            <Button onClick={() => signIn('google')}>Sign In</Button>
          )}
        </div>
      </div>
    </div>
  );
};
