export default function AfterSignUpVerifyEmailPage() {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-y-6">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Thank you for signing up!
      </h1>
      <p className="text-xl text-muted-foreground">
        Please check your email for a verification link.
      </p>
    </div>
  );
}
