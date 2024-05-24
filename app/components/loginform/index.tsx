"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { login } from '../../service/service'
import { paramSave } from "../token"
import { getCookie, setCookie } from 'cookies-next'

const formSchema = z.object({
    email: z.string().min(4, {message: "O usuário precisa ter mais de 4 caracteries."}),
    password: z.string().min(8, {message: "A senha precisa ter mais de 8 digitos."})
})






export function Loginform() {

  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    
    login(values)
    .then(result => { 
      if(result.title === "Unauthorized"){
        alert("Usuário ou Senha estão incorretos.");
      }else{
        alert("Login efetuado com sucesso.");
        setCookie("token", result.token)
        document.location.href = "/dashboard";
      }})
    .catch(error => { alert("Ocorreu um erro no login: " + error); });
  }

   
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Usuario" {...field} />
                </FormControl>
                <FormDescription>
                  Utilize o email de acesso.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input 
                  type={showPassword ? "text" : "password"}
                  className={cn("hide-password-toggle pr-10", "")} 
                  placeholder="*****" {...field} />
                </FormControl>
                <FormDescription>
                  Utilize a senha de acesso.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Login</Button>
        </form>
      </Form>
    )
  }