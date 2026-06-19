"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "@gravity-ui/icons";

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
import { useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function SignupPage() {
  const searchParams = useSearchParams();

  const redirectTo = searchParams.get("redirect") || "/";

  const [password, setPassword] = useState("");

  const [role, setRole] = useState("user");

  const [isCreating, setIsCreating] = useState(false);

  const handlePasswordChange = (value) => {
    const val = typeof value === "string" ? value : value?.target?.value || "";

    setPassword(val);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    setIsCreating(true);

    const formData = new FormData(e.currentTarget);

    const data = Object.fromEntries(formData);

    const { error } = await authClient.signUp.email({
      name: data.name,

      email: data.email,

      password: data.password,

      role: data.role,
    });

    if (error) {
      toast.error(error.message || "Signup failed");

      setIsCreating(false);

      return;
    }

    toast.success("Account created successfully!");

    setIsCreating(false);
  };

  return (
    <main
      className="
      min-h-screen
      w-full
      flex
      items-center
      justify-center
      px-5
      py-10
      overflow-hidden
      relative
      bg-gradient-to-br
      from-indigo-950
      via-slate-900
      to-cyan-950
      "
    >
      {/* Glow Background */}

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
          shadow-[0_20px_60px_rgba(0,0,0,0.4)]
          "
        >
          <h1
            className="
            text-center
            text-3xl
            font-bold
            text-white
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
              <Label className="text-slate-200 font-semibold">Full Name</Label>

              <Input
                placeholder="John Doe"
                className="
                h-12
                rounded-xl
                bg-white/10
                border
                border-white/20
                text-white
                placeholder:text-slate-400
                "
              />

              <FieldError />
            </TextField>

            <TextField name="email" type="email" isRequired>
              <Label className="text-slate-200 font-semibold">
                Email Address
              </Label>

              <Input
                placeholder="john@example.com"
                className="
                h-12
                rounded-xl
                bg-white/10
                border
                border-white/20
                text-white
                placeholder:text-slate-400
                "
              />

              <FieldError />
            </TextField>

            <TextField
              name="password"
              type="password"
              isRequired
              onChange={handlePasswordChange}
            >
              <Label className="text-slate-200 font-semibold">Password</Label>

              <Input
                placeholder="********"
                className="
                h-12
                rounded-xl
                bg-white/10
                border
                border-white/20
                text-white
                placeholder:text-slate-400
                "
              />

              <Description className="text-slate-400">
                8+ characters with uppercase and number
              </Description>

              <FieldError />
            </TextField>

            <div
              className="
              rounded-xl
              bg-white/10
              border
              border-white/20
              p-4
              text-sm
              space-y-2
              "
            >
              <p
                className={
                  password.length >= 8 ? "text-green-400" : "text-slate-400"
                }
              >
                ✓ Minimum 8 characters
              </p>

              <p
                className={
                  /[A-Z]/.test(password) ? "text-green-400" : "text-slate-400"
                }
              >
                ✓ One uppercase letter
              </p>

              <p
                className={
                  /[0-9]/.test(password) ? "text-green-400" : "text-slate-400"
                }
              >
                ✓ One number
              </p>
            </div>

            <Select
              name="role"
              selectedKey={role}
              onSelectionChange={(key) => setRole(String(key))}
            >
              <Label className="text-slate-200 font-semibold">
                Account Type
              </Label>

              <Select.Trigger
                className="
                h-12
                rounded-xl
                bg-white/10
                border
                border-white/20
                text-white
                "
              >
                <Select.Value />

                <Select.Indicator />
              </Select.Trigger>

              <Select.Popover>
                <ListBox>
                  <ListBox.Item id="user">User</ListBox.Item>

                  <ListBox.Item id="librarian">Librarian</ListBox.Item>

                  <ListBox.Item id="admin">Admin</ListBox.Item>
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
              font-semibold
              hover:scale-[1.02]
              transition
              "
            >
              {isCreating ? (
                <>
                  <span className="animate-spin mr-2">⟳</span>
                  Creating...
                </>
              ) : (
                <>
                  <Check size={18} />
                  Create Account
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
            Already have an account?
            <Link
              href={`/login?redirect=${encodeURIComponent(redirectTo)}`}
              className="
              ml-1
              font-semibold
              text-cyan-400
              hover:text-cyan-300
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
