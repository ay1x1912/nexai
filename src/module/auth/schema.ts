import {z }from "zod"
export const signInSchema = z.object({
    email: z.string().email(),
    password:z.string().min(1,{message:"Password is required"})
})

export const signUpSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email(),
  password: z.string().min(1, { message: "Password is required" }),
  confirmPassword: z.string().min(1, { message: "Confirm password is required" }),
}).refine((data) => data.confirmPassword === data.password, {
    message: "Password does not match",
    path:["confirmPassword"]
});