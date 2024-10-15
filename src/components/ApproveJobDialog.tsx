'use client';
import React from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Button } from './ui/button';

const ApproveJobDialog = ({
  title,
  description,
  handleClick,
}: {
  title: string;
  description: string;
  handleClick: () => void;
}) => {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <span
            role="button"
            className="p-1 py-1 px-3 bg-primary text-primary-foreground rounded-md cursor-pointer tracking-wide"
          >
            Approve Now
          </span>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose>
              <Button
                className="mt-2"
                variant={'secondary'}
                onClick={handleClick}
              >
                Approve
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ApproveJobDialog;
