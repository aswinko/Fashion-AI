"use client"

import { User } from "@supabase/supabase-js";
import React, { useId } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { resetPassword } from "@/app/actions/auth-actions";

interface SecuritySettingProps {
  user: User | null;
}

const SecuritySettings = ({ user }: SecuritySettingProps) => {
  const toastId = useId();

  async function handleChangePassword() {
    toast.loading("Sending password reset email...", { id: toastId });

    try {
      const { success, error } = await resetPassword({email: user?.email || ""});
      if (!success) {
        toast.error(error, { id: toastId });
      } else {
        toast.success("Password reset email sent! Please check your email for instructions.", { id: toastId });
      }
    } catch (error: any) {
      toast.error(error?.message || "Error sending the password reset email!", { id: toastId });
      console.error(error);
    }
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Security</CardTitle>
        <CardDescription>
          <div className="space-y-2">
            <h3 className="font-medium">Password</h3>
            <p className="text-sm text-muted-foreground">
              Change your password to keep your account secure
            </p>
            <Button variant={"outline"} onClick={handleChangePassword}>Change Password</Button>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};

export default SecuritySettings;
