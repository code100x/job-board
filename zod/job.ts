import { z } from "zod";

const PaymentMethodEnum = z.enum(["CREDIT_CARD", "DEBIT_CARD", "PAYPAL", "BANK_TRANSFER", "CRYPTO"]);

export const newJobSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be atleast 5 characters long.",
  }),
  description: z.string().min(20, {
    message: "Description must be atleast 20 characters long.",
  }),
  companyName: z.string().min(5, {
    message: "Company Name must be atleast 5 characters long.",
  }),
  salary: z.string().min(5, {
    message: "Salary must be atleast 5 characters long.",
  }),
  currency: z.string({
    required_error: "Please select one category",
  }),
  location: z.string({
    required_error: "Please select one location type",
  }),
});

export type NewJob = z.infer<typeof newJobSchema>;

export const customJobSchema = z.object({
  name: z.string().min(3, {
    message: "Please provide your name",
  }),
  description: z.string().min(20, {
    message: "Description must be atleast 20 characters long.",
  }),
  companyName: z.string().min(5, {
    message: "Company Name must be atleast 5 characters long.",
  }),
  payment_type: PaymentMethodEnum.describe("Please select your preferred payment method"),
  location: z.string({
    required_error: "Please select one location",
  }),
});

export type NewCustomJob = z.infer<typeof customJobSchema>;
