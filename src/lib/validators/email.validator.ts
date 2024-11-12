import { SendEmailOptions } from "@/types/email.types";

interface Attachment {
  filename: string;
  content: string;
}

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateEmailAddress = (email: string | string[]): string[] => {
  const errors: string[] = [];
  const emails = Array.isArray(email) ? email : [email];

  emails.forEach((e) => {
    if (!isValidEmail(e)) {
      errors.push(`Invalid email address: ${e}`);
    }
  });

  return errors;
};

export const validateEmailOptions = (options: SendEmailOptions & { 
  from: { email: string; name: string }; 
  attachments?: Attachment[];
}): string[] => {
  const errors: string[] = [];

  // From address validation
  if (!options.from?.email) {
    errors.push("From email is required");
  } else if (!isValidEmail(options.from.email)) {
    errors.push(`Invalid from email: ${options.from.email}`);
  }

  if (!options.from?.name) {
    errors.push("From name is required");
  }

  // To address validation
  if (!options.to) {
    errors.push("To address is required");
  } else {
    errors.push(...validateEmailAddress(options.to));
  }

  // CC and BCC validation
  if (options.cc) {
    errors.push(...validateEmailAddress(options.cc));
  }
  if (options.bcc) {
    errors.push(...validateEmailAddress(options.bcc));
  }

  // Subject validation
  if (!options.subject?.trim()) {
    errors.push("Subject is required");
  }

  // Template validation
  if (!options.template) {
    errors.push("Template is required");
  }

  // Attachment validation
  if (options.attachments) {
    options.attachments.forEach((attachment, index) => {
      if (!attachment.filename) {
        errors.push(`Attachment ${index + 1} must have a filename`);
      }
      if (!attachment.content) {
        errors.push(`Attachment ${index + 1} must have content`);
      }
    });
  }

  // Priority validation
  if (options.priority && !["high", "normal", "low"].includes(options.priority)) {
    errors.push(`Invalid priority value: ${options.priority}`);
  }

  return errors;
};
