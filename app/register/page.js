"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Checkbox, Input, Label, TextField } from "@heroui/react";
import AuthShell from "@/components/auth/AuthShell";
import SocialAuthButtons from "@/components/auth/SocialAuthButtons";

function PasswordStrength({ password }) {
  const score = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ].filter(Boolean).length;
  if (!password) return null;
  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-1 gap-1">
        {[0, 1, 2, 3].map((index) => (
          <span
            key={index}
            className={`h-1 flex-1 rounded-full ${index < score ? (score === 4 ? "bg-success" : "bg-warning") : "bg-[#dce6f2]"}`}
          />
        ))}
      </div>
      <span
        className={`text-[10px] font-semibold ${score < 3 ? "text-danger" : score === 3 ? "text-warning" : "text-success"}`}
      >
        {score < 3 ? "Keep going" : score === 3 ? "Almost there" : "Strong"}
      </span>
    </div>
  );
}

const inputClass =
  "h-10 rounded-xl border border-[#d5e0ec] bg-white px-3.5 text-sm text-[#071b3a] outline-none transition placeholder:text-[#90a0b4] focus-within:border-[#2467ae] focus-within:ring-4 focus-within:ring-[#2467ae]/10";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    agree: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const set = (key) => (value) =>
    setForm((current) => ({ ...current, [key]: value }));

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.password)
      return setError("Please complete all fields.");
    if (form.password.length < 8)
      return setError("Password must be at least 8 characters.");
    if (!form.agree) return setError("Please accept the terms to continue.");
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    localStorage.setItem("ll_auth", "1");
    router.push("/dashboard");
  }

  return (
    <AuthShell
      eyebrow="Start with clarity"
      title="Build your workspace."
      description="Set up your revenue command center today. Your first 14 days are on us."
      alternate="Already have an account?"
      alternateHref="/login"
      alternateLabel="Sign in"
    >
      <div className="mb-5 grid grid-cols-3 gap-2 text-center text-[9px] font-semibold uppercase tracking-wider text-[#60738d]">
        <span className="rounded-lg bg-[#e6f2ff] px-2 py-2 text-[#2467ae]">
          Free trial
        </span>
        <span className="rounded-lg bg-[#f5f8fc] px-2 py-2">No card</span>
        <span className="rounded-lg bg-[#f5f8fc] px-2 py-2">4 min setup</span>
      </div>
      {error && (
        <div className="mb-4 rounded-xl border border-danger/30 bg-danger/8 px-3.5 py-3 text-xs text-danger">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextField
          name="name"
          value={form.name}
          onChange={set("name")}
          isRequired
          className="flex flex-col gap-2"
        >
          <Label className="text-xs font-semibold">Full name</Label>
          <Input
            placeholder="Jane Smith"
            autoComplete="name"
            className={inputClass}
          />
        </TextField>
        <TextField
          name="email"
          type="email"
          value={form.email}
          onChange={set("email")}
          isRequired
          className="flex flex-col gap-2"
        >
          <Label className="text-xs font-semibold">Work email</Label>
          <Input
            placeholder="you@company.com"
            autoComplete="email"
            className={inputClass}
          />
        </TextField>
        <TextField
          name="password"
          type="password"
          value={form.password}
          onChange={set("password")}
          isRequired
          className="flex flex-col gap-2"
        >
          <Label className="text-xs font-semibold">Password</Label>
          <Input
            placeholder="At least 8 characters"
            autoComplete="new-password"
            className={inputClass}
          />
          <PasswordStrength password={form.password} />
        </TextField>
        <Checkbox
          isSelected={form.agree}
          onChange={set("agree")}
          className="items-start text-[11px] leading-5 text-[#60738d]"
        >
          <Checkbox.Content className="items-start gap-2">
            <Checkbox.Control className="mt-0.5">
              <Checkbox.Indicator />
            </Checkbox.Control>
            <span>
              I agree to the{" "}
              <a href="#" className="font-semibold text-accent hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="font-semibold text-accent hover:underline">
                Privacy Policy
              </a>
              .
            </span>
          </Checkbox.Content>
        </Checkbox>
        <Button
          type="submit"
          isDisabled={loading}
          className="mt-1 h-11 rounded-xl bg-[#071b3a] text-sm font-bold text-white shadow-lg shadow-[#071b3a]/15 transition hover:bg-[#2467ae]"
        >
          {loading ? "Creating workspace…" : "Create my workspace ↗"}
        </Button>
      </form>
      <SocialAuthButtons action="signup" />
      <p className="mt-5 text-center text-[10px] leading-5 text-[#90a0b4]">
        By joining, you&apos;ll unlock the same revenue clarity trusted by
        1,500+ teams.
      </p>
    </AuthShell>
  );
}
