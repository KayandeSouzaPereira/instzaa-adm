"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useEffect, useState } from 'react'
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
import {setEmpresa, getEmpresa} from '../../service/service'


export type EmpresaDto = {
  nomeEmpresa: string,
  enderecoEstabelecimento : string,
  numeroAtendimento : string,
  email: string,
  pixKey: string,
  idCont: string,
}


const formSchema = z.object({
  nomeEmpresa: z.string(),
  enderecoEstabelecimento : z.string(),
  numeroAtendimento : z.string(),
  email: z.string(),
  pixKey: z.string(),
  idCont: z.string(),
})

export function EmpresaForm(empresa:EmpresaDto) {

  const _empresa = empresa.empresa.empresa;
  

  const id = 1;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nomeEmpresa: _empresa.nomeEmpresa,
      enderecoEstabelecimento: _empresa.enderecoEstabelecimento,
      numeroAtendimento: _empresa.numeroAtendimento,
      email:_empresa.email,
      pixKey: _empresa.pixKey,
      idCont: _empresa.idCont,
    },
  })



  function onSubmit(values: z.infer<typeof formSchema>) {
    const _values = values
    setEmpresa(_values, 1)
    .then(result => {alert("Dados atualizados com sucesso."); document.location.href = "/dashboard/";})
    .catch(error => { alert("Ocorreu um erro na atualização."); }); 
  }
  
  return (
  <div className="h-[800px] w-[450px] p-4">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-8">
        <FormField
          control={form.control}
          name="nomeEmpresa"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="..." {...field} />
              </FormControl>
              <FormDescription>
                Nome da Empresa.
              </FormDescription>
              <FormMessage />
            </FormItem>
            
          )}
        />
        <FormField
          control={form.control}
          name="enderecoEstabelecimento"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Endereço</FormLabel>
              <FormControl>
                <Input placeholder="..." {...field} />
              </FormControl>
              <FormDescription>
              Endereço Completo da Empresa.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="numeroAtendimento"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número de Contato</FormLabel>
              <FormControl>
                <Input placeholder="..." {...field} />
              </FormControl>
              <FormDescription>
              Número de Contato para os clientes.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Outros" {...field} />
              </FormControl>
              <FormDescription>
              Email de contato da empresa.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="pixKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Chave Pix</FormLabel>
              <FormControl>
                <Input placeholder="..." {...field} />
              </FormControl>
              <FormDescription>
              Chave Pix da Empresa.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="idCont"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Id da Conta</FormLabel>
              <FormControl>
                <Input placeholder="..." {...field} />
              </FormControl>
              <FormDescription>
              Id Identificador para transações com cartão de credito.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="">
            <Button type="submit">Enviar</Button>
        </div>
      </form>
    </Form>
    </div>
  )

}
