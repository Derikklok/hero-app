"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Label, TextField } from "@heroui/react";
import AuthShell from "@/components/auth/AuthShell";
import SocialAuthButtons from "@/components/auth/SocialAuthButtons";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const set = (key) => (event) =>
    setForm((current) => ({ ...current, [key]: event.target.value }));

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    if (!form.email || !form.password) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    localStorage.setItem("ll_auth", "1");
    router.push("/dashboard");
  }

  return (
    <AuthShell
      eyebrow="Secure workspace access"
      title="Welcome back."
      description="Sign in to pick up where your team left off."
      alternate="New to Ledgerline?"
      alternateHref="/register"
      alternateLabel="Create an account"
    >
      {error && (
        <div className="mb-4 rounded-xl border border-danger/30 bg-danger/8 px-3.5 py-3 text-xs text-danger">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <TextField
          name="email"
          type="email"
          value={form.email}
          onChange={(value) =>
            setForm((current) => ({ ...current, email: value }))
          }
          isRequired
          className="flex flex-col gap-2"
        >
          <Label className="text-xs font-semibold">Work email</Label>
          <Input
            placeholder="you@company.com"
            autoComplete="email"
            className="h-11 rounded-xl border border-[#d5e0ec] bg-white px-3.5 text-sm text-[#071b3a] outline-none transition placeholder:text-[#90a0b4] focus-within:border-[#2467ae] focus-within:ring-4 focus-within:ring-[#2467ae]/10"
          />
        </TextField>
        <TextField
          name="password"
          type="password"
          value={form.password}
          onChange={(value) =>
            setForm((current) => ({ ...current, password: value }))
          }
          isRequired
          className="flex flex-col gap-2"
        >
          <div className="flex items-center justify-between">
            <Label className="text-xs font-semibold">Password</Label>
            <a
              href="#"
              className="text-xs font-medium text-accent hover:underline"
            >
              Forgot password?
            </a>
          </div>
          <Input
            placeholder="Enter your password"
            autoComplete="current-password"
            className="h-11 rounded-xl border border-[#d5e0ec] bg-white px-3.5 text-sm text-[#071b3a] outline-none transition placeholder:text-[#90a0b4] focus-within:border-[#2467ae] focus-within:ring-4 focus-within:ring-[#2467ae]/10"
          />
        </TextField>
        <Button
          type="submit"
          isDisabled={loading}
          className="mt-1 h-11 rounded-xl bg-[#071b3a] text-sm font-bold text-white shadow-lg shadow-[#071b3a]/15 transition hover:bg-[#2467ae]"
        >
          {loading ? "Opening workspace…" : "Sign in to Ledgerline ↗"}
        </Button>
      </form>
      <SocialAuthButtons />
    </AuthShell>
  );
}
