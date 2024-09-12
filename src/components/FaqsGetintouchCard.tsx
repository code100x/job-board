import { Button } from './ui/button';

export default function FaqsGetintouchCard() {
  return (
    <div className="rounded-xl border md:w-5/6 w-full h-fit p-3 my-2 flex items-center justify-between">
      <p className="font-semibold md:text-base text-xs">
        Can&apos;t find what you are looking ?
      </p>
      <Button className="md:text-base text-xs">Get in touch</Button>
    </div>
  );
}
