"use client";

import { submitContactForm } from "@/actions/contact-form";
import ContactForm from "@/components/forms/ContactForm";
import { useToast } from "@/components/ui/use-toast";

const ContactUsPage = () => {
  const { toast } = useToast();

  const handleSubmit = async (formData: {
    name: string;
    email: string;
    message: string;
  }) => {
    let response = await submitContactForm(formData);
    if (response?.status !== "success") {
      toast({
        title: response.message,
        variant: "destructive",
      });
      return;
    }
    toast({
      title: response.message,
      variant: "default",
    });
  };

  return (
    <section className="relative w-full h-full flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b dark:bg-slate-800 bg-slate-100">
      <div className="max-w-md w-full bg-white dark:bg-background p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
          Get In Touch
        </h2>
        <ContactForm onSubmit={handleSubmit} />
      </div>
    </section>
  );
};

export default ContactUsPage;
