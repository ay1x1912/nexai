"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { signUpSchema } from "../../schema";
import { FaGithub, FaGoogle } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { authClient } from "@/lib/authClient";
import { useRouter } from "next/navigation";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { OctagonAlertIcon } from "lucide-react";
function SignUpView() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
  });

  function onSubmit(values: z.infer<typeof signUpSchema>) {
    setError(null);
    setPending(true);
    authClient.signUp.email(
      {
        email: values.email,
        password: values.password,
        name: values.name,
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          console.log("hit");
          setPending(false);
          router.push("/");
        },
        onError: ({ error }) => {
          setPending(false);
          setError(error.message);
        },
      },
    );
  }
  function onSocial(provider: "github" | "google") {
    setError(null);
    setPending(true);
    authClient.signIn.social(
      {
        provider: provider,
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          setPending(false);
        },
        onError: ({ error }) => {
          setPending(false);
          setError(error.message);
        },
      },
    );
  }
  return (
    <div className="flex flex-col gap-6">
      <Card className="p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 px-4 py-8"
              >
                <div className="text-center">
                  <p className="text-xl font-medium">Welcome back</p>
                  <h1 className="text-muted-foreground">
                    Login into your account
                  </h1>
                </div>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Jhon Doe" type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="nex@gmail.com"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="*******"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="*******"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {!!error && (
                  <Alert className="bg-destructive/10 border-none">
                    <OctagonAlertIcon className="!text-destructive h-4 w-4" />
                    <AlertTitle>{error}</AlertTitle>
                  </Alert>
                )}
                <Button disabled={pending} className="w-full" type="submit">
                  Sign in
                </Button>
                <div className="flex items-center gap-4">
                  <div className="flex-grow border-t text-gray-400"></div>
                  <span className="text-muted-foreground text-sm">
                    Or continue with
                  </span>
                  <div className="flex-grow border-t text-gray-400"></div>
                </div>
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    disabled={pending}
                    onClick={() => onSocial("google")}
                    className="flex-grow p-4"
                    variant={"outline"}
                  >
                    <FaGoogle />
                  </Button>
                  <Button
                    type="button"
                    disabled={pending}
                    onClick={() => onSocial("github")}
                    className="flex-grow p-4"
                    variant={"outline"}
                  >
                    <FaGithub />
                  </Button>
                </div>
                <div className="text-center">
                  Already have an account ?{" "}
                  <Link className="underline" href={"/sign-in"}>
                    Sing in
                  </Link>{" "}
                </div>
              </form>
            </Form>
          </div>
          <div className="hidden w-full items-center justify-center rounded-r-xl bg-green-600 md:flex">
            <Image alt="logo" src={"/logo.svg"} width={100} height={100} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default SignUpView;
