import { useState } from 'react';
import { Input } from './ui/input';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

interface PasswordInputProps {
  placeholder?: string;
  field: any;
}

export const PasswordInput = ({ placeholder, field }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <Input
        type={showPassword ? 'text' : 'password'}
        {...field}
        placeholder={placeholder || '••••••••'}
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute right-2 top-1/2 transform -translate-y-1/2"
        aria-label="password"
      >
        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
      </button>
    </div>
  );
};
