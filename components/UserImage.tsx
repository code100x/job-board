import React from "react";
import Image from "next/image";

export default function UserImage({ image }: any) {
    return (
        <div>
            <Image
                className="w-full h-full rounded-full cursor-pointer"
                src={image || ""}
                width={100}
                height={100}
                alt="user_profile_image"
                referrerPolicy="no-referrer"
            />
        </div>
    );
}
