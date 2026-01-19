"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/dashboard");
      }
    });

    return () => unsubscribe();
  }, [router]);
  const handleSignup = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      alert("All fields are required");
      return;
    }

    try {
      // 1️⃣ Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password,
      );

      const user = userCredential.user;

      // 2️⃣ Save extra user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: form.name,
        email: form.email,
        createdAt: new Date(),
      });

      // 3️⃣ Redirect to dashboard
      router.push("/dashboard");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md p-8"
      >
        <h1 className="text-3xl font-bold text-white mb-2 text-center">
          Create Account
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Start trading smarter with TradePro
        </p>

        <form className="space-y-5" onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

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
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors"
          >
            Create Free Account
          </motion.button>
        </form>

        <p className="text-gray-400 text-center mt-6">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/auth/login")}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </motion.div>
    </div>
  );
}
