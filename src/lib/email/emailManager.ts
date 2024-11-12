import { configuredSendEmail } from "./emailSender";

export async function sendWelcomeEmail(email: string, userName?: string) {
        return configuredSendEmail({
          to: email,
          subject: "Welcome to Job board!",
          template: "WelcomeEmail",
          props: {
            userName,
          },
          priority: "low",
        });
      }

export async function sendResetPasswordEmail(email: string, token: string,userName?:string) {
        return configuredSendEmail({
          to: email,
          subject: "Reset Password",
          template: "ResetPasswordEmail",
          props: {
            token,
            userName
          },
          priority: "normal",
        });
      }

export async function sendEmailVerificationEmail(email: string, token: string,userName?: string) {
        return configuredSendEmail({
          to: email,
          subject: "Email Verification",
          template: "EmailVerificationEmail",
          props: {
            token,
            userName
          },
          priority: "normal",
        });
      }