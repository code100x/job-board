'use client';
import { useParams } from 'next/navigation';
import React, { FormEvent, useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { resetPassword } from '@/actions/auth.actions';
import { useToast } from '../ui/use-toast';
import { useRouter } from 'next/navigation';
import APP_PATHS from '@/config/path.config';

export const ResetPassword = () => {
  const params = useParams();

  const token = params.token;

  const [data, setData] = useState({
    password: '',
    confirmPassword: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (data.confirmPassword !== data.password) {
      setErrorMessage('Password must be identical!');
      return;
    }
    setIsLoading(true);
    try {
      const res = await resetPassword({
        ...data,
        token: token as string,
      });
      toast({
        variant: res.status ? 'default' : 'destructive',
        title: res.message,
      });

      router.replace(APP_PATHS.SIGNIN);
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid w-full max-w-sm items-center gap-4"
    >
      <div className="space-y-2">
        <Label htmlFor="email">Password</Label>

        <Input
          type="password"
          id="password"
          placeholder="Password"
          required={true}
          value={data.password}
          onChange={(e) => {
            setData((p) => ({ ...p, password: e.target.value }));
          }}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Confirm Password</Label>
        <Input
          type="password"
          id="confirmPassword"
          placeholder="Confirm Password"
          required={true}
          value={data.confirmPassword}
          onChange={(e) => {
            setData((p) => ({ ...p, confirmPassword: e.target.value }));
          }}
        />
      </div>
      {errorMessage ? (
        <p className="text-sm font-medium text-destructive">{errorMessage}</p>
      ) : null}
      <Button type="submit" disabled={isLoading}>
        Submit
      </Button>
    </form>
  );
};
