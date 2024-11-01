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
import { EyeIcon, EyeOffIcon } from 'lucide-react';

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

        <PasswordInput
          placeholder="Enter your password"
          value={data.password}
          onChange={(e) =>
            setData((prev) => ({ ...prev, password: e.target.value }))
          }
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Confirm Password</Label>
        <PasswordInput
          placeholder="Confirm your password"
          value={data.confirmPassword}
          onChange={(e) =>
            setData((prev) => ({ ...prev, confirmPassword: e.target.value }))
          }
        />
      </div>
      {errorMessage ? (
        <p className="text-sm font-medium text-destructive">{errorMessage}</p>
      ) : null}
      <Button type="submit" disabled={isLoading} aria-label="submit">
        Submit
      </Button>
    </form>
  );
};

interface PasswordInputProps {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PasswordInput = ({
  placeholder,
  value,
  onChange,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <Input
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder={placeholder || '••••••••'}
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 focus:outline-none"
        aria-label="toggle-password"
      >
        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
      </button>
    </div>
  );
};
