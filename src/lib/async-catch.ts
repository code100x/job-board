import { standardizeApiError } from './error';

type withServerActionAsyncCatcherType<T, R> = (args: T) => Promise<R>;

export function withServerActionAsyncCatcher<T, R>(
  serverAction: withServerActionAsyncCatcherType<T, R>
): withServerActionAsyncCatcherType<T, R> {
  return async (args: T): Promise<R> => {
    try {
      return await serverAction(args);
    } catch (error) {
      return standardizeApiError(error) as R;
    }
  };
}

/**
 * Usage example for empty args:
 *
 * export const serverAction = withServerActionAsyncCatcher<null, ServerActionReturnType>(
 *   async () => {
 *     return new SuccessResponse('message', 201, 'additional').serialize();
 *   }
 * );
 * serverAction(null)
 * Usage example for args with a defined type:
 *
 * export const serverActionWithArgs = withServerActionAsyncCatcher<{ name: string }, ServerActionReturnType>(
 *   async (data) => {
 *     return new SuccessResponse('message', 200).serialize();
 *   }
 * );
 */
