"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "@/lib/axios";
import { User } from "@/lib/@types/user";
import Image from "next/image";

interface LoginResponse extends User { }

interface ErrorResponse {
  message: string;
}

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const query = useSearchParams();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const promise = new Promise<LoginResponse>(async (resolve, reject) => {

      try {
        const response = await axios.post("/api/auth/login", { email, password })
        if (response.status !== 200) {
          throw response;
        }
        const data = response.data as LoginResponse;
        const redirect = query.get("redirect");
        if (redirect) {
          router.push(redirect);
        } else {
          router.push("/");
        }
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
    toast.promise<LoginResponse, ErrorResponse>(promise, {
      pending: "Logging in...",
      success: {
        render: ({ data }) => `Welcome back, ${data.firstName}`,
      },
      error: {
        render: ({ data }) => data.message || "An error occurred",
      },
    });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100"
      style={{
        backgroundImage: 'url(/background.png)',
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full"
      >
        <div className="flex flex-col items-center mb-6">
          <Image src="/logo.png" width={100} height={100} alt="Logo" />
          <h1 className="text-2xl font-bold text-gray-900 mt-2">Falore Autos</h1>
        </div>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm text-gray-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm text-gray-700"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gray-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Log in
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
