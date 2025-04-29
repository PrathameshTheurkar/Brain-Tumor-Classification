import axios from "axios";
import { redirect } from "next/navigation";
import { FormEvent } from "react";

type inputSchemaType = {
  name: string;
  email: string;
  password: string;
};

const useSignup = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  const formData = new FormData(event.target as HTMLFormElement);

  const input: inputSchemaType = {
    name: formData.get("fullName") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { data } = await axios.post(`http://localhost:4000/signup`, input, {
    withCredentials: true,
  });

  if (data.success) {
    redirect("/dashboard");
  }
};

export default useSignup;
