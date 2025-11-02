import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock, CheckCircle2, XCircle, Shield } from "lucide-react";
import { API_BASE, JWT } from "@/constant";

const passwordSchema = z
  .object({
    old_password: z.string().min(1, "Current password is required"),
    new_password: z.string().min(8, "Password must be at least 8 characters"),
    confirm_password: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.new_password !== data.old_password, {
    message: "New password must be different from current password",
    path: ["new_password"],
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

type ChangePasswordData = z.infer<typeof passwordSchema>;

export default function SettingsPage() {
  const [form, setForm] = useState<ChangePasswordData>({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const [touched, setTouched] = useState({
    old_password: false,
    new_password: false,
    confirm_password: false,
  });

  const validations = {
    length: form.new_password.length >= 8,
    match:
      form.new_password === form.confirm_password &&
      form.confirm_password !== "",
  };

  const mutation = useMutation({
    mutationFn: async (data: Omit<ChangePasswordData, "confirm_password">) => {
      const res = await axios.patch(`${API_BASE}/auth/change-password`, data, {
        headers: {
          Authorization: `Bearer ${JWT}`,
        },
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Password updated successfully!", {
        richColors: true,
      });
      setForm({ old_password: "", new_password: "", confirm_password: "" });
      setTouched({
        old_password: false,
        new_password: false,
        confirm_password: false,
      });
    },
    onError: (error: any) => {
      const msg =
        error?.response?.data?.message || "Failed to update password.";
      toast.error(msg, { richColors: true });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.old_password || !form.new_password || !form.confirm_password) {
      toast.warning("Please fill in all fields");
      return;
    }

    if (form.new_password !== form.confirm_password) {
      toast.error("New passwords do not match");
      return;
    }

    if (!validations.length) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    if (form.old_password === form.new_password) {
      toast.error("New password must be different from current password");
      return;
    }

    mutation.mutate({
      old_password: form.old_password,
      new_password: form.new_password,
    });
  };

  const ValidationItem = ({
    isValid,
    text,
  }: {
    isValid: boolean;
    text: string;
  }) => (
    <div className="flex items-center gap-2 text-sm">
      {isValid ? (
        <CheckCircle2 className="w-4 h-4 text-green-600" />
      ) : (
        <XCircle className="w-4 h-4 text-muted-foreground/30" />
      )}
      <span className={isValid ? "text-green-600" : "text-muted-foreground"}>
        {text}
      </span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-card rounded-2xl shadow-xl overflow-hidden border border-border">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Security Settings
                </h2>
                <p className="text-indigo-100 text-sm">
                  Update your password to keep your account secure
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Current Password */}
            <div className="space-y-2">
              <Label htmlFor="old_password">Current Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                <Input
                  id="old_password"
                  type={showPasswords.old ? "text" : "password"}
                  placeholder="Enter your current password"
                  value={form.old_password}
                  onChange={(e) =>
                    setForm({ ...form, old_password: e.target.value })
                  }
                  onBlur={() => setTouched({ ...touched, old_password: true })}
                  className="pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPasswords({
                      ...showPasswords,
                      old: !showPasswords.old,
                    })
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                >
                  {showPasswords.old ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <Label htmlFor="new_password">New Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                <Input
                  id="new_password"
                  type={showPasswords.new ? "text" : "password"}
                  placeholder="Enter your new password"
                  value={form.new_password}
                  onChange={(e) =>
                    setForm({ ...form, new_password: e.target.value })
                  }
                  onBlur={() => setTouched({ ...touched, new_password: true })}
                  className="pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPasswords({
                      ...showPasswords,
                      new: !showPasswords.new,
                    })
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                >
                  {showPasswords.new ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirm_password">Confirm New Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                <Input
                  id="confirm_password"
                  type={showPasswords.confirm ? "text" : "password"}
                  placeholder="Confirm your new password"
                  value={form.confirm_password}
                  onChange={(e) =>
                    setForm({ ...form, confirm_password: e.target.value })
                  }
                  onBlur={() =>
                    setTouched({ ...touched, confirm_password: true })
                  }
                  className="pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPasswords({
                      ...showPasswords,
                      confirm: !showPasswords.confirm,
                    })
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                >
                  {showPasswords.confirm ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Password Requirements */}
            {touched.new_password && form.new_password && (
              <div className="bg-muted rounded-xl p-4 space-y-2 border border-border">
                <p className="text-sm font-medium text-foreground mb-3">
                  Password requirements:
                </p>
                <div className="grid grid-cols-1 gap-2">
                  <ValidationItem
                    isValid={validations.length}
                    text="At least 8 characters"
                  />
                  {form.confirm_password && (
                    <ValidationItem
                      isValid={validations.match}
                      text="Passwords match"
                    />
                  )}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-6 rounded-xl shadow-lg transition-all"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Updating Password...
                </span>
              ) : (
                "Update Password"
              )}
            </Button>
          </form>
        </div>

        {/* Security Tips */}
        <div className="mt-6 bg-blue-50 dark:bg-blue-950/30 rounded-xl p-4 border border-blue-200 dark:border-blue-900">
          <div className="flex gap-3">
            <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-blue-900 dark:text-blue-200">
                Security Tips
              </p>
              <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                <li>• Use a unique password you don't use on other websites</li>
                <li>• Avoid using personal information in your password</li>
                <li>
                  • Consider using a password manager to generate and store
                  strong passwords
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
