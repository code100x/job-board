import { cn } from "@/lib/utils";
import { CircleCheckBig, TriangleAlert } from "lucide-react";

export default function FormSuccess({
  success,
  message,
}: {
  success: boolean;
  message: string;
}) {
  return (
    <div
      className={cn(
        "p-3 rounded-md flex items-center gap-x-2 text-sm",
        success
          ? "bg-emerald-500/15 text-emerald-500"
          : "bg-destructive/15 text-destructive"
      )}
    >
      {success ? (
        <CircleCheckBig className="w-4 h-4" />
      ) : (
        <TriangleAlert className="w-4 h-4" />
      )}
      <p>{message}</p>
    </div>
  );
}
