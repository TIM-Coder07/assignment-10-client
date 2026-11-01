"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Check,
  Loader2,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Eye,
  EyeOff,
} from "lucide-react";

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
  const [showPassword, setShowPassword] = useState(false);

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

      const { data: session } = await authClient.getSession();
      const userRole = session?.user?.role;

      toast.success("Login successful");

      if (userRole === "librarian") {
        router.push("/dashboard/librarian");
      } else {
        router.push(redirectTo);
      }
    } catch (error) {
      console.error(error);
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
      console.error(error);
      toast.error("Google login failed");
    }
  };

  return (
    <main className="min-h-dvh w-full overflow-x-hidden bg-slate-50">
      <div className="grid min-h-dvh w-full lg:grid-cols-2">
        {/* Left Branding Section */}
        <section className="relative hidden min-h-dvh overflow-hidden bg-[#111827] px-12 py-14 text-white lg:flex lg:flex-col lg:justify-between xl:px-20">
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />
          <div className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

          <Link href="/" className="relative z-10 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500">
              <BookOpen size={23} />
            </div>
            <span className="text-2xl font-bold tracking-tight">BookNest</span>
          </Link>

          <div className="relative z-10 max-w-xl">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-indigo-200">
              <ShieldCheck size={16} />
              Your reading journey starts here
            </span>

            <h1 className="text-4xl font-bold leading-tight tracking-tight xl:text-5xl">
              Welcome back to your
              <span className="mt-2 block text-indigo-400">
                world of books.
              </span>
            </h1>

            <p className="mt-6 max-w-md text-base leading-8 text-slate-400">
              Sign in to discover books, manage your deliveries, and continue
              exploring the stories you love.
            </p>

            <div className="mt-12 space-y-5">
              {[
                "Discover and explore your favorite books",
                "Track your book delivery easily",
                "Manage your personal reading collection",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-300">
                    <Check size={14} />
                  </div>
                  <span className="text-sm text-slate-300">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="relative z-10 text-sm text-slate-500">
            © {new Date().getFullYear()} BiblioDrop. All rights reserved.
          </p>
        </section>

        {/* Login Section */}
        <section className="flex min-h-dvh w-full items-center justify-center px-5 py-10 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="w-full max-w-md"
          >
            {/* Mobile Logo */}
            <Link
              href="/"
              className="mb-10 flex items-center justify-center gap-3 lg:hidden"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
                <BookOpen size={21} />
              </div>
              <span className="text-2xl font-bold text-slate-900">
                BiblioDrop
              </span>
            </Link>

            <div className="mb-8">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-indigo-600">
                Welcome back
              </p>

              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Sign in to your account
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Enter your details below to access your account.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <Form onSubmit={onSubmit} className="flex flex-col gap-6">
                {/* Email */}
                <TextField name="email" type="email" isRequired>
                  <Label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <Mail size={16} className="text-slate-400" />
                    Email address
                  </Label>

                  <Input
                    placeholder="you@example.com"
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus-within:border-indigo-500 focus-within:bg-white"
                  />

                  <FieldError />
                </TextField>

                {/* Password */}
                <TextField
                  name="password"
                  type={showPassword ? "text" : "password"}
                  isRequired
                >
                  <Label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <LockKeyhole size={16} className="text-slate-400" />
                    Password
                  </Label>

                  <div className="relative">
                    <Input
                      placeholder="Enter your password"
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 pr-12 text-sm text-slate-900 outline-none transition focus-within:border-indigo-500 focus-within:bg-white"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-indigo-600"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                    </button>
                  </div>

                  <FieldError />
                </TextField>

                {/* Login Button */}
                <Button
                  type="submit"
                  isDisabled={isLogging}
                  className="mt-1 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-60"
                >
                  {isLogging ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    <>
                      Sign in
                      <ArrowRight size={18} />
                    </>
                  )}
                </Button>

                {/* Divider */}
                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-slate-200" />
                  <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    Or continue with
                  </span>
                  <div className="h-px flex-1 bg-slate-200" />
                </div>

                {/* Google Login */}
                <Button
                  type="button"
                  onPress={handleGoogleLogin}
                  className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  <BsGoogle size={17} />
                  Continue with Google
                </Button>
              </Form>

              <div className="mt-7 border-t border-slate-100 pt-6 text-center">
                <p className="text-sm text-slate-500">
                  Don't have an account?
                  <Link
                    href="/registration"
                    className="ml-1 font-semibold text-indigo-600 transition hover:text-indigo-700"
                  >
                    Create account
                  </Link>
                </p>
              </div>
            </div>

            <p className="mt-6 text-center text-xs text-slate-400">
              Secure sign-in · Your account information stays protected
            </p>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
