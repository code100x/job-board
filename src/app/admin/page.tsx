import UserCard from '@/components/UserCard';

const page = async () => {
  return (
    <div className="container flex flex-col gap-5 pt-5 mt-10">
      <UserCard />
    </div>
  );
};

export default page;
