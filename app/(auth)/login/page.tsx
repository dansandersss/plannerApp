"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createUser, signIn } from "@/lib/appwrite";
import Image from "next/image";
import images from "@/constants/images";
import BackgroundParticles from "@/utils/Particles";
import { gsap } from "gsap";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const imageRef = useRef(null);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await signIn(email, password);
      router.push("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await createUser(email, password, username);
      router.push("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleMouseEnter = () => {
    gsap.to(imageRef.current, {
      scale: 1.1,
      duration: 0.3,
      ease: "power1.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(imageRef.current, {
      scale: 1,
      duration: 0.3,
      ease: "power1.out",
    });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-newBgColor-7-1 relative overflow-hidden">
      <BackgroundParticles src={images.bgParticles} />
      <div
        className={`flex bg-white ${
          isRegistering ? "md:flex-row-reverse" : ""
        } rounded-md items-center justify-center lg:justify-between gap-10 py-20 px-2 relative z-10 w-[70%]`}
      >
        <form
          onSubmit={isRegistering ? handleRegister : handleLogin}
          className=" text-white p-6 w-[450px]"
        >
          <h2 className="text-2xl mb-4 text-black font-bold">
            {isRegistering ? "Sign Up" : "Sign In"}
          </h2>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          {isRegistering && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Username:
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 p-2 border border-gray-300 text-black rounded-md w-full"
                required
                placeholder="Type your username..."
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 border border-gray-300 text-black rounded-md w-full"
              required
              placeholder="Type your email..."
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 border border-gray-300 text-black rounded-md w-full"
              required
              placeholder="Your Password..."
            />
          </div>
          <button
            type="submit"
            className=" bg-newBgColor-7-1 hover:bg-newBgColor-7-2 transition ease-in-out duration-200 text-white px-4 py-2 rounded-md"
          >
            {isRegistering ? "Sign Up" : "Sign In"}
          </button>
          <p className="mt-4 text-black">
            {isRegistering ? (
              <>
                Do you have an account?{" "}
                <span
                  className=" text-newTextColor-7-1 hover:text-newBgColor-7-2 transition-all ease-in-out duration-200 cursor-pointer"
                  onClick={() => setIsRegistering(false)}
                >
                  Sign In
                </span>
              </>
            ) : (
              <>
                {`You don&apos;t have an account?`}{" "}
                <span
                  className="text-newTextColor-7-1 hover:text-newBgColor-7-2 transition-all ease-in-out duration-200 cursor-pointer"
                  onClick={() => setIsRegistering(true)}
                >
                  Sign Up
                </span>
              </>
            )}
          </p>
        </form>
        <div className="w-1/2 hidden lg:flex justify-center">
          <Image
            src={isRegistering ? images.regImg : images.loginImg}
            alt="login"
            width={300}
            height={300}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={imageRef}
          />
        </div>
      </div>
    </div>
  );
}
