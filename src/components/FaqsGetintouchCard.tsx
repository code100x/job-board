import { Button } from './ui/button';

export default function FaqsGetintouchCard() {
  return (
    <div className="bg-white border dark:bg-transparent rounded-xl md:w-4/6 w-full h-fit p-4 my-1 flex items-center justify-between">
      <p className="font-semibold md:text-base text-xs">
        Can&apos;t find what you&apos;re looking for?
      </p>
      <Button className="md:text-base text-xs" aria-label="get-in-touch">
        Get in touch
      </Button>
    </div>
  );
}
