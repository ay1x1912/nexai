
import { auth } from "@/lib/auth";


import SignOutButton from "@/module/auth/ui/components/sign-out-button";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className="flex h-screen items-center justify-center text-xl font-medium">
     {session.user.name}
     <SignOutButton/>
    </div>
  );
}
export default Home;
