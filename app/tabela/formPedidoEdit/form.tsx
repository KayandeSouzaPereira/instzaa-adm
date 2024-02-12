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
import {savePedido} from '../../service/service'


import Previews from '../uploadImage/index'


const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];


export const formSchemaPedido = z.object({
  idPedido: z.number(),
  nomeCliente: z.string(),
  cpf : z.string(),
  endereco: z.string(),
  data: z.string(),
  numeroContato: z.string(),
  valor : z.coerce.number(),
  resumoPedido: z.string(),
  status: z.number()
})

function statusCOD(val:number) {

  var answer = "";
  switch( val ) {
    case 1: 
      answer = "Em Fabricação";
      break;
    case 2: 
      answer = "Enviado";
      break;
    case 3: 
      answer = "Concluído";
      break;
    default:
      answer = "A Confirmar...";
  }
  return answer;
}

export function PedidoFormEdit(formEdit:typeof formSchemaPedido) {

  const form = useForm<z.infer<typeof formSchemaPedido>>({
    

    resolver: zodResolver(formSchemaPedido),

    defaultValues: {
      idPedido: formEdit.formEdit.idPedido,
      nomeCliente: formEdit.formEdit.nomeCliente,
      cpf: formEdit.formEdit.cpf,
      endereco: formEdit.formEdit.endereco,
      data: formEdit.formEdit.data,
      numeroContato: formEdit.formEdit.numeroContato,
      valor: formEdit.formEdit.valor,
      resumoPedido: formEdit.formEdit.resumoPedido,
      status: formEdit.formEdit.status,
    },


  })

  function onSubmit(values: z.infer<typeof formSchemaPedido>) {
    savePedido(values)
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
            name="idPedido"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Badge variant="outline">ID : {field.value}</Badge>
                </FormControl>
                <FormMessage />
              </FormItem>
              
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Badge variant="outline">Status : {statusCOD(field.value)}</Badge>
                </FormControl>
                <FormMessage />
              </FormItem>
              
            )}
          />
          <FormField
            control={form.control}
            name="valor"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Badge variant="outline">Valor Total R$: {field.value}</Badge>
                </FormControl>
                <FormMessage />
              </FormItem>
              
            )}
          />
          <FormField
            control={form.control}
            name="nomeCliente"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do Cliente</FormLabel>
                <FormControl>
                  <Input placeholder="..." {...field} />
                </FormControl>
                <FormDescription>
                  Nome do Cliente.
                </FormDescription>
                <FormMessage />
              </FormItem>
              
            )}
          />
          <FormField
            control={form.control}
            name="cpf"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CPF</FormLabel>
                <FormControl>
                  <Input placeholder="..." {...field} />
                </FormControl>
                <FormDescription>
                CPF do Cliente.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endereco"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Endereço</FormLabel>
                <FormControl>
                  <Input placeholder="0" {...field} />
                </FormControl>
                <FormDescription>
                Endereco do Cliente.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="numeroContato"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numero do Cliente</FormLabel>
                <FormControl>
                  <Input placeholder="Outros" {...field} />
                </FormControl>
                <FormDescription>
                Numero de Contato do Cliente.
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
