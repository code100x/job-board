import LoginForm from "@/components/forms/LoginForm";

const LoginPage = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center gap-24 p-4 dark:bg-background bg-white">
      <div className="w-full h-full dark:bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] flex justify-center items-center mb-16">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
