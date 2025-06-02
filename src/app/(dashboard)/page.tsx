
import { auth } from "@/lib/auth";


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
    <div className="flex h-full items-center justify-center text-xl font-medium bg-amber-200">
      {session.user.name}
     
    </div>
  );
}
export default Home;
