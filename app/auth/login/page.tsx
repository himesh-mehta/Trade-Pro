"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert("Email and password required");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);

      router.push("/dashboard");
    } catch (error: any) {
      alert(error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push(`/dashboard/${user.uid}`);
      }
    });
    return () => unsubscribe();
  }, [router]);
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md p-8"
      >
        <h1 className="text-3xl font-bold text-white mb-2 text-center">
          Welcome Back
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Login to your TradePro account
        </p>

        <form className="space-y-5" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full px-4 py-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <motion.button
            // onClick={() => router.push(`/dashboard/${user.uid}`)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors"
          >
            Login
          </motion.button>
        </form>

        <p className="text-gray-400 text-center mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => router.push("/auth/signup")}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Create one
          </span>
        </p>
      </motion.div>
    </div>
  );
}
