"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
import { Switch } from "@/components/ui/switch"


import Previews from './uploadImage/index'


const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const formSchema = z.object({
  Nome: z.string(),
  Descricao : z.string(),
  Preco : z.coerce.number(),
  Categoria: z.string(),
  Destaque: z.boolean(),
  Promocao: z.boolean(),
  Imagem : z.string()

})

export function ProfileForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Nome: "",
      Descricao: "",
      Preco: 0,
      Categoria: "Outros",
      Destaque: false,
      Promocao: false,
      Imagem: ""
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("SUBMIT : " + JSON.stringify(values))
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-8">
        <FormField
          control={form.control}
          name="Nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="..." {...field} />
              </FormControl>
              <FormDescription>
                Nome do Item.
              </FormDescription>
              <FormMessage />
            </FormItem>
            
          )}
        />
        <FormField
          control={form.control}
          name="Descricao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descricao</FormLabel>
              <FormControl>
                <Input placeholder="..." {...field} />
              </FormControl>
              <FormDescription>
              Descricao do Item.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Preco"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preço</FormLabel>
              <FormControl>
                <Input placeholder="0" {...field} />
              </FormControl>
              <FormDescription>
              Preço do Item.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Categoria"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria</FormLabel>
              <FormControl>
                <Input placeholder="Outros" {...field} />
              </FormControl>
              <FormDescription>
              Categoria do Item.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row space-x-10">
            <div className="flex flex-col w-35 h-35">
                <FormField 
                control={form.control}
                name="Destaque"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Destaque</FormLabel>
                    <div className="space-y-0.5"/>
                    <FormControl>
                        <Switch checked={field.value}
                            onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                </div>
                <div className="flex flex-col w-35 h-35">
                <FormField
                control={form.control}
                name="Promocao"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Promocao</FormLabel>
                    <div className="space-y-0.5"/>
                    <FormControl>
                        <Switch checked={field.value}
                            onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
               </div>
               <div className="flex flex-col w-50 h-40">
                <FormField
                control={form.control}
                name="Imagem"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Imagem do Item</FormLabel>
                    <FormControl>
                        <Previews img={field}/>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                </div>
        </div>
        <div className="">
            <Button type="submit">Enviar</Button>
        </div>
      </form>
    </Form>
  )

}
