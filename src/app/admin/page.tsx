import UserCard from '@/components/UserCard';

const page = async () => {
  return (
    <div className="container flex flex-col gap-5">
      <UserCard />
    </div>
  );
};

export default page;
