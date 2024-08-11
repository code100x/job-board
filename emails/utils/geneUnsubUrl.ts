import { createHmac } from "crypto";
const basePath = "http://localhost:3000";
export const generateUnsubscribeURL = (email: string) => {
  const signature = createHmac("sha256", process.env.UNSUB_SECRET!)
    .update(email)
    .digest("hex");
  return `${basePath}/api/unsubscribe?email=${encodeURIComponent(
    email
  )}&signature=${signature}`;
};
