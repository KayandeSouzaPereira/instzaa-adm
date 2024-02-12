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
import { Badge } from "@/components/ui/badge"
import {setItemCardapio} from '../../service/service'


import Previews from '../uploadImage/index'


const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];


export const formSchema = z.object({
  idCardapio: z.number(),
  nome: z.string(),
  descricao : z.string(),
  preco : z.coerce.number(),
  categoria: z.string(),
  destaque: z.boolean(),
  promocao: z.boolean(),
  imagem : z.string()

})

export function ProfileFormEdit(formEdit:typeof formSchema) {

  const form = useForm<z.infer<typeof formSchema>>({
    

    resolver: zodResolver(formSchema),

    defaultValues: {
      idCardapio: formEdit.formEdit.idCardapio,
      nome: formEdit.formEdit.nome,
      descricao: formEdit.formEdit.descricao,
      preco: formEdit.formEdit.preco,
      categoria: formEdit.formEdit.categoria,
      destaque: formEdit.formEdit.destaque,
      promocao: formEdit.formEdit.promocao,
      imagem: formEdit.formEdit.imagem
    },


  })

  function onSubmit(values: z.infer<typeof formSchema>) {

    setItemCardapio(values)
    .then(result => {alert("Edição efetuada com sucesso.");
    location.reload();
    })
    .catch(error => { alert("Ocorreu um erro na edição."); });
  }
  
  return (
    <div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-8">
        <FormField
            control={form.control}
            name="idCardapio"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Badge variant="outline">ID :{field.value}</Badge>
                </FormControl>
                <FormMessage />
              </FormItem>
              
            )}
          />
          <FormField
            control={form.control}
            name="nome"
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
            name="descricao"
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
            name="preco"
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
            name="categoria"
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
                  name="destaque"
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
                  name="promocao"
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
                  name="imagem"
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
    </div>
  )

}
