"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useId, useState } from "react";
import { redirect } from "next/navigation";
import { Loader2 } from "lucide-react";
import { changePassword } from "@/app/actions/auth-actions";

const passwordValidationRegex = new RegExp(
  '^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\\d)(?=.*[!#$%&?@ "]).*$'
);

const formSchema = z
  .object({
    password: z
      .string({
        required_error: "Password is required!",
      })
      .min(8, {
        message: "Password must be at least 8 characters long!",
      })
      .regex(passwordValidationRegex, {
        message:
          "Password must contain at least one letter, one number and one special character!",
      }),
    confirmPassword: z.string({
      required_error: "Confirm password is required!",
    }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match!",
        path: ["confirmPassword"],
      });
    }
  });

const ChangePasswordForm = ({ className }: { className?: string }) => {
  const toastId = useId();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    toast.loading("Changing Password...", { id: toastId });
    setLoading(true);

    try {
      const { success, error } = await changePassword(values.password);
      if (!success) {
        toast.error(String(error), { id: toastId });
        setLoading(false);
      } else {
        toast.success("Password is successfully updated!", {
          id: toastId,
        });
        setLoading(false);
        redirect("/login");
      }
    } catch (error: any) {
      toast.error(String(error?.message), { id: toastId });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={cn("grid gap-6", className)}>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Change Password
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your new password below to change your password.
        </p>
      </div>{" "}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Enter a strong passsword that meets the requirements above.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm New Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Re-enter your new password to confirm.
                </FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="mr-2 w-4 h-4 animate-spin" />}
            {loading ? "Changing password..." : "Change Password"}
          </Button>
          <div className="text-center text-sm text-muted-foreground">
            Make sure to remember your new password or store it securely.
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ChangePasswordForm;
