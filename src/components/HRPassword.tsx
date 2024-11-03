import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Copy, Check, Eye, EyeOff } from 'lucide-react';
import { useToast } from './ui/use-toast';

const HRPassword = ({
  password,
  reset,
}: {
  password: string | null;
  reset: () => void;
}) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const { toast } = useToast();
  const handleCopyClick = () => {
    if (password) {
      window.navigator.clipboard.writeText(password);
      setIsCopied(true);
      toast({
        variant: 'success',
        title: 'Password Copied to clipboard!',
      });
    }
  };
  const handleResetClick = () => {
    reset();
    setIsPasswordVisible(false);
    setIsCopied(false);
  };
  if (!password) {
    return null;
  }
  return (
    <>
      <div className="dark:bg-gray-900 bg-gray-100 w-full dark:text-gray-300 p-6 rounded-lg space-y-7 xl:text-lg">
        <p> HR Created Successfully! Below are the details</p>
        <div className="w-full dark:bg-gray-800 border-none dark:text-white bg-gray-200 rounded-lg p-4 flex flex-col gap-2 xl:text-lg">
          <p>Password</p>
          <div className="flex items-center gap-3">
            <Input
              value={password}
              type={isPasswordVisible ? 'text' : 'password'}
              className="xl:text-base"
            />
            <div className="flex">
              <Button
                className="p-2"
                variant={'outline'}
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? (
                  <Eye height={20} width={20} />
                ) : (
                  <EyeOff height={20} width={20} />
                )}
              </Button>
              <Button
                className="p-2"
                variant={'outline'}
                onClick={handleCopyClick}
              >
                {isCopied ? (
                  <Check height={20} width={20} />
                ) : (
                  <Copy height={20} width={20} />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full justify-center flex p-6">
        <button onClick={handleResetClick}>Add another</button>
      </div>
    </>
  );
};

export default HRPassword;
