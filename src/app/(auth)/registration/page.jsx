"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";

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

  const [role, setRole] = useState("user");

  const [isCreating, setIsCreating] = useState(false);

  const handleGoogleSignup = async () => {
    await authClient.signIn.social({
      provider: "google",

      callbackURL: "/",
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    setIsCreating(true);

    const formData = new FormData(e.currentTarget);

    const data = Object.fromEntries(formData);

    console.log("FORM DATA", data);

    console.log("ROLE", role);

    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");

      setIsCreating(false);

      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9]).{8,}$/;

    if (!passwordRegex.test(data.password)) {
      toast.error("Password must contain 8+ characters, uppercase and number");

      setIsCreating(false);

      return;
    }

    const { error } = await authClient.signUp.email({
      name: data.name,

      email: data.email,

      password: data.password,

      image: data.image,

      role: role,

      callbackURL: "/",
    });

    console.log("SIGNUP ERROR", error);

    if (error) {
      toast.error(error.message || "Signup failed");

      setIsCreating(false);

      return;
    }

    toast.success("Account created successfully");

    // get latest session

    const session = await authClient.getSession();

    const userRole = session.data?.user?.role;

    console.log("USER ROLE", userRole);

    setIsCreating(false);

    if (userRole === "librarian") {
      router.push("/dashboard/librarian");
    } else {
      router.push("/dashboard/user");
    }
  };

  return (
    <main
      className="
min-h-screen
flex
items-center
justify-center
px-5
py-10
bg-gradient-to-br
from-indigo-950
via-slate-900
to-cyan-950
relative
overflow-hidden
"
    >
      <div
        className="
absolute
-top-40
-left-40
h-[500px]
w-[500px]
rounded-full
bg-purple-500/30
blur-3xl
"
      />

      <div
        className="
absolute
-bottom-40
-right-40
h-[500px]
w-[500px]
rounded-full
bg-cyan-500/30
blur-3xl
"
      />

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
relative
z-10
w-full
max-w-md
"
      >
        <div
          className="
rounded-3xl
bg-white/10
backdrop-blur-xl
border
border-white/20
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
            Create Account
          </h1>

          <Form
            onSubmit={onSubmit}
            className="
flex
flex-col
gap-5
"
          >
            <TextField name="name" isRequired>
              <Label className="text-white">Full Name</Label>

              <Input placeholder="John Doe" />

              <FieldError />
            </TextField>

            <TextField name="email" type="email" isRequired>
              <Label className="text-white">Email</Label>

              <Input placeholder="john@gmail.com" />
            </TextField>

            <TextField name="image" isRequired>
              <Label className="text-white">Photo URL</Label>

              <Input placeholder="https://image.com" />
            </TextField>

            <TextField
              name="password"
              type="password"
              isRequired
              onChange={(value) => {
                const val =
                  typeof value === "string"
                    ? value
                    : value?.target?.value || "";

                setPassword(val);
              }}
            >
              <Label className="text-white">Password</Label>

              <Input placeholder="********" />

              <Description>8+ characters, uppercase and number</Description>
            </TextField>

            <TextField
              name="confirmPassword"
              type="password"
              isRequired
              onChange={(value) => {
                const val =
                  typeof value === "string"
                    ? value
                    : value?.target?.value || "";

                setConfirmPassword(val);
              }}
            >
              <Label className="text-white">Confirm Password</Label>

              <Input placeholder="********" />
            </TextField>

            {confirmPassword && (
              <p
                className={
                  password === confirmPassword
                    ? "text-green-400 text-sm"
                    : "text-red-400 text-sm"
                }
              >
                {password === confirmPassword
                  ? "Passwords match"
                  : "Passwords do not match"}
              </p>
            )}

            {/* IMPORTANT */}

            <input type="hidden" name="role" value={role} />

            <Select
              selectedKey={role}
              onSelectionChange={(key) => {
                setRole(String(key));
              }}
            >
              <Label className="text-white">Account Type</Label>

              <Select.Trigger>
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

            <Button
              type="submit"
              isDisabled={isCreating}
              className="
h-12
rounded-xl
bg-gradient-to-r
from-indigo-600
via-purple-600
to-cyan-600
text-white
"
            >
              {isCreating ? (
                <>
                  <Loader2 className="animate-spin mr-2" />
                  Creating...
                </>
              ) : (
                <>
                  <Check size={20} />
                  Create Account
                </>
              )}
            </Button>

            <Button
              type="button"
              onPress={handleGoogleSignup}
              className="
h-12
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
text-center
text-slate-300
mt-5
"
          >
            Already have account?
            <Link
              href={`/login?redirect=${encodeURIComponent(redirectTo)}`}
              className="
ml-2
text-cyan-400
"
            >
              Login
            </Link>
          </p>
        </div>
      </motion.div>
    </main>
  );
}
