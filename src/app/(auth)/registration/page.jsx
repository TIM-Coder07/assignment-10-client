"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  Loader2,
  BookOpen,
  ShieldCheck,
  Users,
  Sparkles,
  ArrowRight,
  LockKeyhole,
  Eye,
  EyeOff,
} from "lucide-react";

import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  ListBox,
  Select,
} from "@heroui/react";

import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { BsGoogle } from "react-icons/bs";

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectTo = searchParams.get("redirect") || "/";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user");
  const [isCreating, setIsCreating] = useState(false);

  // Google Signup
  const handleGoogleSignup = async () => {
    try {
      setIsCreating(true);

      const { data, error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: redirectTo,
        errorCallbackURL: "/registration",
      });

      if (error) {
        console.error("Google Signup Error:", error);
        toast.error(error.message || "Google signup failed");
        setIsCreating(false);
        return;
      }

      console.log("Google Signup Response:", data);
    } catch (error) {
      console.error("Google Signup Failed:", error);
      toast.error("Unable to connect to authentication server");
      setIsCreating(false);
    }
  };

  // Email Signup
  const onSubmit = async (e) => {
    e.preventDefault();

    setIsCreating(true);

    try {
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData);

      if (data.password !== data.confirmPassword) {
        toast.error("Passwords do not match");
        setIsCreating(false);
        return;
      }

      const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9]).{8,}$/;

      if (!passwordRegex.test(data.password)) {
        toast.error(
          "Password must contain 8+ characters, uppercase and number",
        );
        setIsCreating(false);
        return;
      }

      const { data: signupData, error } = await authClient.signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
        image: data.image,
        role,
        callbackURL: "/",
      });

      console.log("SIGNUP RESPONSE:", signupData);
      console.log("SIGNUP ERROR:", error);

      if (error) {
        toast.error(error.message || "Signup failed");
        setIsCreating(false);
        return;
      }

      toast.success("Account created successfully");

      const { data: session } = await authClient.getSession();
      const userRole = session?.user?.role;

      setIsCreating(false);

      if (userRole === "librarian") {
        router.push("/dashboard/librarian/overview");
      } else if (userRole === "admin") {
        router.push("/dashboard/admin/overview");
      } else {
        router.push("/dashboard/user/overview");
      }
    } catch (error) {
      console.error("Signup Failed:", error);
      toast.error("Something went wrong. Please try again.");
      setIsCreating(false);
    }
  };

  return (
    <main className="min-h-screen w-full bg-white">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-2"
      >
        {/* LEFT PANEL */}
        <section className="relative hidden min-h-screen flex-col justify-between overflow-hidden bg-[#172554] p-10 text-white lg:flex xl:p-14 2xl:p-20">
          {/* Background Decorations */}
          <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-blue-400/15 blur-3xl" />
          <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-indigo-400/20 blur-3xl" />

          {/* Brand */}
          <div className="relative z-10 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-blue-900 shadow-lg">
              <BookOpen size={25} />
            </div>

            <div>
              <h2 className="text-xl font-bold tracking-tight">BookNest</h2>
              <p className="text-xs text-blue-200">Your Digital Bookstore</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="relative z-10 my-12 max-w-xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-blue-100">
              <Sparkles size={15} />
              <span>Discover. Read. Grow.</span>
            </div>

            <h1 className="text-4xl font-bold leading-tight xl:text-5xl 2xl:text-6xl">
              Your next favorite book is waiting.
            </h1>

            <p className="mt-6 max-w-md text-base leading-8 text-blue-100/80">
              Join our growing reading community and discover books that
              inspire, educate, and entertain you.
            </p>

            {/* Features */}
            <div className="mt-12 space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10">
                  <BookOpen size={21} />
                </div>

                <div>
                  <h3 className="font-semibold">Explore Books</h3>
                  <p className="mt-1 text-sm text-blue-200">
                    Discover books across different categories.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10">
                  <Users size={21} />
                </div>

                <div>
                  <h3 className="font-semibold">Join Our Community</h3>
                  <p className="mt-1 text-sm text-blue-200">
                    Connect with readers and librarians.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10">
                  <ShieldCheck size={21} />
                </div>

                <div>
                  <h3 className="font-semibold">Secure Experience</h3>
                  <p className="mt-1 text-sm text-blue-200">
                    Enjoy a reliable and secure platform.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="relative z-10 border-t border-white/15 pt-6 text-sm text-blue-200">
            © {new Date().getFullYear()} BiblioDrop. All rights reserved.
          </div>
        </section>

        {/* RIGHT PANEL */}
        <section className="flex min-h-screen w-full flex-col justify-center px-5 py-10 sm:px-10 md:px-16 lg:px-12 xl:px-20 2xl:px-28">
          {/* Mobile Brand */}
          <div className="mb-9 flex items-center gap-3 lg:hidden">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-900 text-white">
              <BookOpen size={23} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900">BiblioDrop</h2>
              <p className="text-xs text-slate-500">Your Digital Bookstore</p>
            </div>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <p className="mb-2 text-sm font-semibold tracking-wider text-blue-700">
              GET STARTED FOR FREE
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Create your account
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Enter your information to create your BiblioDrop account.
            </p>
          </div>

          {/* Signup Form */}
          <Form onSubmit={onSubmit} className="flex w-full flex-col gap-5">
            {/* Full Name */}
            <TextField name="name" isRequired>
              <Label className="mb-2 text-sm font-semibold text-slate-700">
                Full Name
              </Label>

              <Input
                placeholder="Enter your full name"
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus-within:border-blue-500 focus-within:bg-white"
              />

              <FieldError />
            </TextField>

            {/* Email */}
            <TextField name="email" type="email" isRequired>
              <Label className="mb-2 text-sm font-semibold text-slate-700">
                Email Address
              </Label>

              <Input
                placeholder="you@example.com"
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus-within:border-blue-500 focus-within:bg-white"
              />

              <FieldError />
            </TextField>

            {/* Photo URL */}
            <TextField name="image" isRequired>
              <Label className="mb-2 text-sm font-semibold text-slate-700">
                Profile Photo URL
              </Label>

              <Input
                placeholder="https://example.com/photo.jpg"
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus-within:border-blue-500 focus-within:bg-white"
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
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>

              <FieldError />
            </TextField>

            {/* Confirm Password */}
            <TextField
              name="password"
              type={showPassword ? "text" : "password"}
              isRequired
            >
              <Label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <LockKeyhole size={16} className="text-slate-400" />
                Confirm Password
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
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>

              <FieldError />
            </TextField>

            {/* Password Match */}
            {confirmPassword && (
              <div
                className={`-mt-3 flex items-center gap-2 text-xs font-medium ${
                  password === confirmPassword
                    ? "text-emerald-600"
                    : "text-red-500"
                }`}
              >
                {password === confirmPassword ? (
                  <Check size={15} />
                ) : (
                  <LockKeyhole size={14} />
                )}

                {password === confirmPassword
                  ? "Passwords match"
                  : "Passwords do not match"}
              </div>
            )}

            {/* Account Type */}
            <input type="hidden" name="role" value={role} />

            <Select
              selectedKey={role}
              onSelectionChange={(key) => {
                if (key) setRole(String(key));
              }}
            >
              <Label className="mb-2 text-sm font-semibold text-slate-700">
                Account Type
              </Label>

              <Select.Trigger className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-800">
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>

              <Select.Popover>
                <ListBox>
                  <ListBox.Item id="user">User</ListBox.Item>

                  <ListBox.Item id="librarian">Librarian</ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>

            {/* Create Account */}
            <Button
              type="submit"
              isDisabled={isCreating}
              className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-900 text-sm font-semibold text-white shadow-lg shadow-blue-900/15 transition hover:bg-blue-800 disabled:opacity-60"
            >
              {isCreating ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight size={18} />
                </>
              )}
            </Button>

            {/* Divider */}
            <div className="flex w-full items-center gap-4">
              <div className="h-px flex-1 bg-slate-200" />

              <span className="text-xs font-medium text-slate-400">
                OR CONTINUE WITH
              </span>

              <div className="h-px flex-1 bg-slate-200" />
            </div>

            {/* Google Signup */}
            <Button
              type="button"
              onPress={handleGoogleSignup}
              isDisabled={isCreating}
              className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <BsGoogle className="text-base text-red-500" />
              Continue with Google
            </Button>
          </Form>

          {/* Login */}
          <p className="mt-7 text-center text-sm text-slate-500">
            Already have an account?
            <Link
              href={`/login?redirect=${encodeURIComponent(redirectTo)}`}
              className="ml-1 font-semibold text-blue-700 transition hover:text-blue-900"
            >
              Sign in
            </Link>
          </p>

          {/* Security Note */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
            <ShieldCheck size={14} />
            Your information is protected and secure.
          </div>
        </section>
      </motion.div>
    </main>
  );
}
