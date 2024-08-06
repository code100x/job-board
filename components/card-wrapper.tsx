"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface CardWrapperProps {
  children: React.ReactNode;
  title: string;
  cols: number;
}

export const CardWrapper = ({ children, title, cols }: CardWrapperProps) => {
  return (
    <div>
      <Card className="w-full shadow-md">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className={`grid grid-cols-${cols} gap-4`}>
          {children}
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};
