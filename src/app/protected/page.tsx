// Mock page to test auth

import { redirect } from "next/navigation";

import { getUser } from "@/features/auth/helpers/get-user";

export default async function ProtectedPage() {
  const getUserResult = await getUser();

  if (getUserResult.isErr()) {
    if (getUserResult.error.kind === "not-authenticated") {
      redirect("/");
    } else {
      throw new Error(getUserResult.error.message);
    }
  }

  const user = getUserResult.value;

  return (
    <div className="flex h-full items-center justify-center">
      <p>Welcome, {user.name}</p>
    </div>
  );
}
