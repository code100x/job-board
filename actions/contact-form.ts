"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { z } from "zod";

// Zod schema for contact form validation
const ContactFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  message: z.string().min(1, { message: "Message is required." }),
});

type ContactFormSchemaType = z.infer<typeof ContactFormSchema>;

export const submitContactForm = async (
  data: ContactFormSchemaType
): Promise<{ status: string; message: string }> => {
  // Validate input data
  const parsedData = ContactFormSchema.safeParse(data);

  const session = await auth();

  if (!parsedData.success) {
    return {
      status: "error",
      message: "Validation error, " + parsedData.error.errors[0].message,
    };
  }

  try {
    // Create a new contact form submission in the database
    await prisma.contactFormSubmission.create({
      data: {
        name: parsedData.data.name,
        email: parsedData.data.email,
        message: parsedData.data.message,
        userId: session ? session.user.id : null,
      },
    });

    return { status: "success", message: "Form submitted successfully" };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return { status: "error", message: "Internal Server Error" };
  }
};

export const getContactFormSubmissions = async () => {
  try {
    const submissions = await prisma.contactFormSubmission.findMany({
      orderBy: { createdAt: "desc" },
    });

    return { status: "success", data: submissions };
  } catch (error) {
    console.error("Error retrieving contact form submissions:", error);
    return { status: "error", message: "Internal Server Error" };
  }
};
