import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Heart, Loader2 } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { userApi } from "../lib/api";

const authSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  name: z.string().optional(),
});

type AuthFormValues = z.infer<typeof authSchema>;

export function Auth() {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === "/login";

  const form = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: { email: "", password: "", name: "" },
  });

  const onSubmit = async (data: AuthFormValues) => {
    setIsLoading(true);
    try {
      if (isLogin) {
        const result = await userApi.login(data.email, data.password);
        localStorage.setItem('userId', result.data.id);
        localStorage.setItem('userName', result.data.name);
        toast.success("Logged in successfully");
      } else {
        const result = await userApi.register(data.email, data.password, data.name || data.email);
        localStorage.setItem('userId', result.data.id);
        localStorage.setItem('userName', result.data.name);
        toast.success("Account created successfully");
      }
      navigate("/");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 bg-muted/20 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 to-transparent"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md bg-card border border-border p-8 rounded-2xl shadow-xl"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="bg-primary/10 p-3 rounded-full mb-4">
            <Heart className="text-primary w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">
            {isLogin ? "Welcome back" : "Create an account"}
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            {isLogin 
              ? "Enter your credentials to access your account" 
              : "Join the anonymous mental health community"
            }
          </p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Email</label>
            <input
              {...form.register("email")}
              type="email"
              placeholder="student@university.edu"
              disabled={isLoading}
              className="w-full h-11 px-3 rounded-lg border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            {form.formState.errors.email && (
              <p className="text-xs text-destructive mt-1">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">Password</label>
              {isLogin && (
                <Link to="#" className="text-xs text-primary hover:underline">Forgot password?</Link>
              )}
            </div>
            <input
              {...form.register("password")}
              type="password"
              placeholder="••••••••"
              disabled={isLoading}
              className="w-full h-11 px-3 rounded-lg border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            {form.formState.errors.password && (
              <p className="text-xs text-destructive mt-1">{form.formState.errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-11 inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-medium transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : null}
            {isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <Link
            to={isLogin ? "/signup" : "/login"}
            className="font-medium text-primary hover:underline"
          >
            {isLogin ? "Sign up" : "Log in"}
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
