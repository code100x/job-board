import Image from "next/image"

export const Loading = () => {
    return (
        <div className="h-screen w-screen justify-center items-center">
            <Image
                src="/logo.svg"
                alt="logo"
                width="120"
                height="120"
                className="animate-pulse duration-700"
            />
        </div>
    )
}