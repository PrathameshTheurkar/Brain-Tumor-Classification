import axios from "axios";
import { redirect } from "next/navigation";
import { FormEvent } from "react";

type inputSchemaType = {
    email: string,
    password: string
}

const useLogin =  async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const formData = new FormData(event.target as HTMLFormElement);

    const input: inputSchemaType = {
        email: formData.get('email') as string,
        password: formData.get('password') as string
    }

    const {data} = await axios.post(`http://localhost:4000/signin`, input, { withCredentials: true });

    if(data.success) {
        redirect('/dashboard');
    }
}

export default useLogin;