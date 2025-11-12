export default function AfterSignInVerifyEmailPage() {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-y-6">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Please verify your email address
      </h1>
      <div className="flex flex-col text-center">
        <p className="text-xl text-muted-foreground">
          We notice that you have not verified your email address.
        </p>
        <p className="text-xl text-muted-foreground">
          Please check your email for a verification link.
        </p>
      </div>
    </div>
  );
}
