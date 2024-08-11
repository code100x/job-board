import { NextRequest, NextResponse } from "next/server";
import {
  resend,
  OTPTemplate,
  generateUnsubscribeURL,
} from "../../../emails/index";
export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const url = generateUnsubscribeURL("blaganarpit@gmail.com");
    console.log(url);
    await resend.emails.send({
      from: "onbording@resend.dev",
      to: ["blaganarpit@gmail.com"],
      subject: "Welcome to 100xJobs!",
      react: OTPTemplate({ token: "1234", url }),
      reply_to: "blaganarpit@gmail.com",
    });
    console.log("email sent");
    return NextResponse.json({ status: 202, message: "email sent" });
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      status: 500,
      message: "something went wrong:(",
    });
  }
};
