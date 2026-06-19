"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "@gravity-ui/icons";

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

export default function LoginPage() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const redirectTo = searchParams.get("redirect") || "/";

  const [isLogging, setIsLogging] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    setIsLogging(true);

    const formData = new FormData(e.currentTarget);

    const data = Object.fromEntries(formData);

    const { error } = await authClient.signIn.email({
      email: data.email,

      password: data.password,
    });

    if (error) {
      toast.error(error.message || "Login failed");

      setIsLogging(false);

      return;
    }

    toast.success("Login successful");

    router.push(redirectTo);

    setIsLogging(false);
  };

  return (
    <main
      className="
      fixed
      inset-0
      flex
      items-center
      justify-center
      overflow-y-auto
      px-5
      bg-gradient-to-br
      from-indigo-950
      via-slate-900
      to-cyan-950
      "
    >
      {/* Background Glow */}

      <div
        className="
        absolute
        -top-20
        -left-20
        h-96
        w-96
        rounded-full
        bg-purple-500/30
        blur-3xl
        "
      />

      <div
        className="
        absolute
        -bottom-20
        -right-20
        h-96
        w-96
        rounded-full
        bg-cyan-500/30
        blur-3xl
        "
      />

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
          scale: 0.95,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.6,
        }}
        className="
        relative
        z-10
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
          shadow-[0_20px_60px_rgba(0,0,0,0.35)]
          "
        >
          <h1
            className="
            mb-6
            text-center
            text-3xl
            font-bold
            text-white
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
              <Label
                className="
                font-semibold
                text-slate-200
                "
              >
                Email Address
              </Label>

              <Input
                placeholder="john@example.com"
                className="
                h-12
                rounded-xl
                text-white
                placeholder:text-slate-400
                "
              />

              <FieldError />
            </TextField>

            <TextField name="password" type="password" isRequired>
              <Label
                className="
                font-semibold
                text-slate-200
                "
              >
                Password
              </Label>

              <Input
                placeholder="********"
                className="
                h-12
                rounded-xl
                text-white
                placeholder:text-slate-400
                "
              />

              <FieldError />
            </TextField>

            <Button
              type="submit"
              isDisabled={isLogging}
              className="
              h-12
              rounded-xl
              bg-gradient-to-r
              from-indigo-600
              via-purple-600
              to-cyan-600
              font-semibold
              text-white
              transition
              hover:scale-[1.02]
              "
            >
              {isLogging ? (
                <>
                  <span className="mr-2 animate-spin">⟳</span>
                  Logging in...
                </>
              ) : (
                <>
                  <Check size={18} />
                  Login
                </>
              )}
            </Button>
          </Form>

          <p
            className="
            mt-5
            text-center
            text-sm
            text-slate-300
            "
          >
            Don't have an account?
            <Link
              href="/registration"
              className="
              ml-1
              font-semibold
              text-cyan-400
              hover:text-cyan-300
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
