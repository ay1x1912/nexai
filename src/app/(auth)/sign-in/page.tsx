import { auth } from "@/lib/auth";
import SignInView from "@/module/auth/ui/views/signIn-view";


import { headers } from "next/headers";
import { redirect } from "next/navigation";


import React from "react";

async function SignInPage() {
  const session =await auth.api.getSession({
   headers:await headers()
  })
  if(session) {
    redirect("/")
  }
    return (
      <SignInView/>
  )
}

export default SignInPage;
