import { ErrorResponseType } from '@/lib/error';
import { SuccessResponseType } from '@/lib/success';

export type ServerActionReturnType<T = unknown> =
  | SuccessResponseType<T>
  | ErrorResponseType;
