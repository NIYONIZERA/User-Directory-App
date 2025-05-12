import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { NewUserForm, UserRole } from "../types/User";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  age: z.number().min(18, "Age must be 18 or older"),
  role: z.enum([UserRole.Admin, UserRole.Editor, UserRole.Viewer]),
});

export const useUserForm = () => {
  const form = useForm<NewUserForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      age: 18,
      role: UserRole.Viewer,
    },
  });

  return form;
};