"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";

import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { authClient } from "@/lib/auth-client";

import { BsGoogle } from "react-icons/bs";

export default function LoginPage() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const redirectTo = searchParams.get("redirect") || "/";

  const [isLogging, setIsLogging] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    setIsLogging(true);

    try {
      const formData = new FormData(e.currentTarget);

      const data = Object.fromEntries(formData);

      const { error } = await authClient.signIn.email({
        email: data.email,

        password: data.password,
      });

      if (error) {
        toast.error(error.message || "Invalid email or password");

        return;
      }

      // get user session

      const { data: session } = await authClient.getSession();

      const userRole = session?.user?.role;

      console.log("USER ROLE:", userRole);

      toast.success("Login successful");

      if (userRole === "librarian") {
        router.push("/dashboard/librarian");
      } else {
        router.push(redirectTo);
      }
    } catch (error) {
      console.log(error);

      toast.error("Login failed");
    } finally {
      setIsLogging(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",

        callbackURL: "/",
      });
    } catch (error) {
      console.log(error);

      toast.error("Google login failed");
    }
  };

  return (
    <main
      className="
fixed
inset-0
flex
items-center
justify-center
px-5
bg-gradient-to-br
from-indigo-950
via-slate-900
to-cyan-950
"
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="
w-full
max-w-md
"
      >
        <div
          className="
rounded-3xl
border
border-white/20
bg-white/10
backdrop-blur-xl
p-8
"
        >
          <h1
            className="
text-3xl
font-bold
text-white
text-center
mb-6
"
          >
            Welcome Back
          </h1>

          <Form
            onSubmit={onSubmit}
            className="
flex
flex-col
gap-5
"
          >
            <TextField name="email" type="email" isRequired>
              <Label className="text-white">Email</Label>

              <Input placeholder="example@gmail.com" />

              <FieldError />
            </TextField>

            <TextField name="password" type="password" isRequired>
              <Label className="text-white">Password</Label>

              <Input placeholder="********" />

              <FieldError />
            </TextField>

            <Button
              type="submit"
              isDisabled={isLogging}
              className="
h-12
w-full
rounded-xl
bg-gradient-to-r
from-indigo-600
via-purple-600
to-cyan-600
text-white
"
            >
              {isLogging ? (
                <>
                  <Loader2
                    className="
animate-spin
mr-2
"
                  />
                  Logging...
                </>
              ) : (
                <>
                  <Check className="mr-2" />
                  Login
                </>
              )}
            </Button>

            <div
              className="
flex
items-center
gap-3
text-slate-400
text-sm
"
            >
              <span className="flex-1 border-t border-white/20" />
              OR
              <span className="flex-1 border-t border-white/20" />
            </div>

            <Button
              type="button"
              onPress={handleGoogleLogin}
              className="
h-12
w-full
rounded-xl
bg-white
text-black
"
            >
              <BsGoogle className="mr-2" />
              Continue with Google
            </Button>
          </Form>

          <p
            className="
mt-5
text-center
text-slate-300
"
          >
            Don't have account?
            <Link
              href="/registration"
              className="
ml-2
text-cyan-400
"
            >
              Create Account
            </Link>
          </p>
        </div>
      </motion.div>
    </main>
  );
}
