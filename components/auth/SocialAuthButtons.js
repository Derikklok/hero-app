import { Button } from "@heroui/react";

function GoogleIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.7 5.7 0 0 1-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09Z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z" />
      <path fill="#FBBC05" d="M5.84 14.09a7.2 7.2 0 0 1 0-4.18V7.07H2.18A11.98 11.98 0 0 0 1 12c0 1.93.46 3.75 1.18 4.93l3.66-2.84Z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84 1.75-1.36C8.69 5.9 10.1 5.38 12 5.38Z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="size-4">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.44 9.8 8.21 11.39.6.1.82-.26.82-.57v-2.23c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.74.08-.74 1.2.09 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.93 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.53.12-3.18 0 0 1-.32 3.3 1.23.96-.27 1.98-.4 3-.4s2.04.13 3 .4c2.3-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.88.12 3.18.76.84 1.23 1.91 1.23 3.22 0 4.6-2.8 5.63-5.48 5.93.43.37.81 1.1.81 2.22v3.3c0 .32.22.69.83.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
    </svg>
  );
}

export default function SocialAuthButtons({ action = "continue" }) {
  const actionLabel = action === "signup" ? "sign up with" : "continue with";

  return (
    <div className="mt-6">
      <div className="flex items-center gap-3 text-[10px] text-[#90a0b4]">
        <span className="h-px flex-1 bg-[#dce6f2]" />
        or {actionLabel}
        <span className="h-px flex-1 bg-[#dce6f2]" />
      </div>
      <div className="mt-4 flex flex-wrap gap-2.5">
        <Button
          type="button"
          variant="secondary"
          className="h-10 min-w-28 rounded-xl border border-[#d5e0ec] bg-white px-3 text-xs font-semibold text-[#071b3a] transition hover:border-accent hover:bg-[#f5f8fc] sm:min-w-31"
        >
          <GoogleIcon />
          <span>Google</span>
        </Button>
        <Button
          type="button"
          variant="secondary"
          className="h-10 min-w-28 rounded-xl border border-[#d5e0ec] bg-white px-3 text-xs font-semibold text-[#071b3a] transition hover:border-accent hover:bg-[#f5f8fc] sm:min-w-31"
        >
          <GithubIcon />
          <span>GitHub</span>
        </Button>
      </div>
    </div>
  );
}
