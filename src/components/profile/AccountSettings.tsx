import { ChangePassword } from './ChangePassword';

type Props = {};
export const AccountSettings = ({}: Props) => {
  return (
    <div className="flex flex-col gap-6 w-full h-full">
      <div className="flex flex-col gap-4 rounded-xl border p-3">
        <p className="text-lg">Password and Authentication</p>
        <ChangePassword />
      </div>
    </div>
  );
};
