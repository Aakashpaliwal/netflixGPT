import React, { useEffect, useState } from "react";
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
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { auth } from "@/firebase";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2Icon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { loginUser, registerUser } from "@/API/AuthApi";
import useUserStore from "@/store/userStore";
import axiosInstance from "@/API/interceptor";

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
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const setUserName = useUserStore((state) => state.setUserName);
  const setUserImageUrl = useUserStore((state) => state.setUserImageUrl)
  const [isSignUp, setIsSignup] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(isSignUp ? signupSchema : loginSchema),
  });

  // Check if user is already authenticated and redirect to home
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/home");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const regsiterMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (res) => {
      toast.success("User Registered Successfully.");
      setIsSignup(false);
    },
    onError: (err) => {
      toast.error(err.code);
    },
  });

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: async (res) => {
      toast.success("User LoggedIn Successfully.");
      setUserName("Akash");
      navigate("/home");
      const result = await axiosInstance.get(
        "https://api.themoviedb.org/3/authentication"
      );
    },
    onError: (err) => {
      toast.error(err.code);
    },
  });

  const onSubmit = async (data) => {
    if (isSignUp) {
      regsiterMutation.mutate(data);
    } else {
      loginMutation.mutate(data);
    }
  };

  const loginWithGoogleHandler = async () => {
    try {
        const userGoogleCred = await signInWithPopup(auth, provider);
        if(userGoogleCred) {
          setUserImageUrl(userGoogleCred?.user?.photoURL)
          toast.success("User LoggedIn Successfully.");
        }
    } catch (error) {
      toast.error(error)
    }
  
  };

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
            <Button
              type="submit"
              disabled={regsiterMutation?.isPending || loginMutation?.isPending}
              className="w-full mt-7"
            >
              {(regsiterMutation?.isPending || loginMutation?.isPending) && (
                <Loader2Icon className="animate-spin" />
              )}
              {isSignUp ? "Sign Up" : "Login"}
            </Button>
          </form>
        </CardContent>
        {!isSignUp && (
          <CardFooter className="flex-col gap-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => loginWithGoogleHandler()}
            >
              Login with Google
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default Authentication;
