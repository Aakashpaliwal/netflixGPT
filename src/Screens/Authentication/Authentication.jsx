import React, { useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Button from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/firebase";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Authentication = () => {
  const [isSignUp, setIsSignup] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(isSignUp ? signupSchema : loginSchema),
  });

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    // Add login/signup logic here
    try {
      if (isSignUp) {
        const userCred = await createUserWithEmailAndPassword(
          auth,
          data?.email,
          data?.password
        );
        console.log(userCred);
        toast.success('User Registered Successfully.')
      } else {
        console.log("else");
        const userCred = await signInWithEmailAndPassword(
          auth,
          data?.email,
          data?.password
        );
        console.log(userCred);
        toast.success('User LoggedIn Successfully.')
      }
    } catch (error) {
      console.log(error);
      toast.error(error.code)
    }
  };

  console.log(isSignUp);

  return (
    <div className="flex justify-center items-center h-screen m-auto w-full">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Button
              variant="link"
              onClick={() => {
                setIsSignup(!isSignUp);
              }}
            >
              {isSignUp ? "Log In" : "Sign Up"}
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              {isSignUp && (
                <div className="grid gap-2">
                  <Label htmlFor="username">UserName</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Akash404"
                    {...register("username")}
                  />
                  {errors.username && (
                    <p className="text-sm text-red-500">
                      {errors.username.message}
                    </p>
                  )}
                </div>
              )}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  {!isSignUp && (
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  )}
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
            <Button type="submit" className="w-full mt-7">
              {isSignUp ? "Sign Up" : "Login"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Authentication;
