"use client";
import { loginUser } from "@/actions/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GoogleIcon } from "@/icons/GoogleIcon";
import { LoginUser, userLoginSchema } from "@/zod/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { useToast } from "../ui/use-toast";

const LoginForm = () => {
	const { toast } = useToast();
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const form = useForm<LoginUser>({
		resolver: zodResolver(userLoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const handleFormSubmit = async (values: LoginUser) => {
		setIsLoading(true);
		const response = await loginUser(values);
		if (response?.status !== "success") {
			toast({
				title: response.message,
				variant: "destructive",
			});
			setIsLoading(false);
			return;
		}
		toast({
			title: response.message,
			variant: "default",
		});
		router.push("/jobs");
		setIsLoading(false);
	};

	return (
		<Form {...form}>
			<div className="h-fit p-8 bg-white flex flex-col items-start gap-8 rounded-xl shadow-lg border-t border-gray-200">
				<div className="w-full flex flex-col justify-center items-center gap-3">
					<h3 className="text-3xl bg-gradient-to-r from-indigo-600 via-violet-500 to-blue-700 bg-clip-text text-transparent font-black">
						100xJobs
					</h3>
					<div className="flex flex-col gap-1 justify-center items-center">
						<h4 className="text-lg font-medium">Welcome Back</h4>
						<p className="text-sm text-gray-500 font-medium">
							Please enter your details to sign in
						</p>
					</div>
				</div>

				<form
					className="h-full flex flex-col justify-center items-center gap-5"
					onSubmit={form.handleSubmit(handleFormSubmit)}
				>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem className="w-64">
								<FormLabel className="text-sm font-semibold text-gray-800">
									Email *
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										className="border-gray-400"
										placeholder="Enter your email here"
									/>
								</FormControl>
								<FormMessage className="text-sm" />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem className="w-64">
								<FormLabel className="text-sm font-semibold text-gray-800">
									Password *
								</FormLabel>
								<FormControl>
									<Input
										type={
											showPassword ? "text" : "password"
										}
										{...field}
										className="border-gray-400"
										placeholder="Enter password here"
									/>
								</FormControl>
								<div className="flex relative justify-center items-center">
									<div className="absolute right-2 transform -translate-y-[110%]">
										{showPassword ? (
											<Eye
												className="w-6 h-6 text-gray-400 cursor-pointer"
												onClick={
													togglePasswordVisibility
												}
											/>
										) : (
											<EyeOff
												className="w-6 h-6 text-gray-400 cursor-pointer"
												onClick={
													togglePasswordVisibility
												}
											/>
										)}
									</div>
								</div>
								<FormMessage className="text-sm" />
							</FormItem>
						)}
					/>

					<Button
						disabled={isLoading}
						type="submit"
						className="w-full flex justify-center items-center rounded-lg"
					>
						{isLoading ? (
							<Loader2
								size={20}
								className="animate-spin "
							/>
						) : (
							"Sign In"
						)}
					</Button>
					<div className="flex px-2 sm:px-0 items-center gap-3 self-stretch">
						<div className="w-full h-[1px] bg-gray-300"></div>
						<p className="text-sm font-normal text-gray-700 min-w-fit">
							Or continue with
						</p>
						<div className="w-full h-[1px] bg-gray-300"></div>
					</div>
					<Button
						type="submit"
						className="w-full flex justify-center items-center rounded-lg"
						variant="outline"
						onClick={() => signIn()}
					>
						<GoogleIcon />
						Sign in with Google
					</Button>
				</form>
			</div>
		</Form>
	);
};

export default LoginForm;
