import { getServerSession, Session } from 'next-auth';
import { options } from './auth';
import { ErrorHandler } from './error';
import { withServerActionAsyncCatcher } from './async-catch';

// Added session also if we want to use ID
type withAdminServerActionType<T, R> = (
  session: Session,
  args?: T
) => Promise<R>;

export function withAdminServerAction<T, R>(
  serverAction: withAdminServerActionType<T, R>
): (args?: T) => Promise<R> {
  return withServerActionAsyncCatcher(async (args?: T) => {
    const session = await getServerSession(options);
    if (!session || session.user.role !== 'ADMIN') {
      throw new ErrorHandler(
        'You must be authenticated to access this resource.',
        'UNAUTHORIZED'
      );
    }
    return await serverAction(session, args);
  });
}
