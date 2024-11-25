"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import { Form,FormControl,FormDescription,FormField, FormItem,FormLabel,FormMessage} from "@/components/ui/form"
import { Card, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {updatePedido, getAvaliacao} from '../../service/service'
import PreviewsPedido from "../uploadImagePedido"



export const formSchemaPedido = z.object({
  id: z.number(),
  nomeCliente: z.string(),
  cpf : z.string(),
  endereco: z.string(),
  data: z.number(),
  numeroContato: z.string(),
  valor : z.coerce.number(),
  status: z.string(),
  resumoPedido: z.array(
    z.object({
      id: z.number(),
      nome: z.string(),
      descricao : z.string(),
      preco : z.coerce.number(),
      categoria: z.string(),
      destaque: z.boolean(),
      promocao: z.boolean(),
      imagem : z.string()
    })
  )
})

function statusCOD(val:String) {

  var answer = "";

  
  switch( val ) {
    case "Fabricando": 
      answer = "Em Fabricação";
      break;
    case "Enviado": 
      answer = "Enviado";
      break;
    case "Concluido": 
      answer = "Concluído";
      break;
      case "Cancelado": 
      answer = "Cancelado";
      break;
    default:
      answer = "A Confirmar...";
  }
  return answer;
}

function data(val:number){
  var a = new Date(val);
  var b = a.getUTCHours();
  return a.toLocaleString();
}


export function PedidoFormEdit(formEdit:typeof formSchemaPedido, avaliacao:number) {
  const pedidos = formEdit.formEdit.resumoPedido;
  const _avaliacao = formEdit.formEdit.avaliacao;
 
  
  const form = useForm<z.infer<typeof formSchemaPedido>>({
    

    resolver: zodResolver(formSchemaPedido),

    defaultValues: {
      id: formEdit.formEdit.id,
      nomeCliente: formEdit.formEdit.nomeCliente,
      cpf: formEdit.formEdit.cpf,
      endereco: formEdit.formEdit.endereco,
      data: formEdit.formEdit.data,
      numeroContato: formEdit.formEdit.numeroContato,
      valor: formEdit.formEdit.valor,
      status: formEdit.formEdit.status,
      resumoPedido: pedidos
    },


  })

  const pedidoList = pedidos.map(pedido =>
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardDescription>Nome : {pedido.nome}</CardDescription>
        </CardHeader>
        <CardFooter>
          <FormDescription>Preço R$: {pedido.preco}</FormDescription>
          <PreviewsPedido img={pedido.imagem}/>
        </CardFooter>
      </Card>
    </div>
  );

  function onSubmit(values: z.infer<typeof formSchemaPedido>) {
    updatePedido(values, values.id)
    .then(result => {alert("Edição efetuada com sucesso.");
    location.reload();
  })
    .catch(error => { alert("Ocorreu um erro na edição."); });
  }
  
  return (
    <ScrollArea className="h-[800px] w-[450px] p-4">
      
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-8">
        <FormField
            control={form.control}
            name="id"
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
            name="data"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Badge variant="outline">Data : {data(field.value)}</Badge>
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
          <ul>
            <CardTitle>
              Resumo do Pedido:
            </CardTitle>
              <ScrollArea className="h-[300px] w-[400px] p-4">
              {pedidoList}
              </ScrollArea>
            </ul>
          <div className="">
              <Button type="submit">Enviar</Button>
          </div>
          
        </form>
        <div>
        {formEdit.formEdit.status.includes("Concluido")?
        <div>
          Avaliação do Pedido pelo Cliente
         <div className="flex flex-row my-2">
          {
            _avaliacao > 0?
            <StarFilledIcon/>
            :
            <StarIcon/>
          }
           {
            _avaliacao > 1?
            <StarFilledIcon/>
            :
            <StarIcon/>
          }
           {
            _avaliacao > 2?
            <StarFilledIcon/>
            :
            <StarIcon/>
          }
           {
            _avaliacao > 3?
            <StarFilledIcon/>
            :
            <StarIcon/>
          }
           {
            _avaliacao > 4?
            <StarFilledIcon/>
            :
            <StarIcon/>
          }
         </div></div>
         :
         <></> 
        }
        </div>
      </Form>
     
    </ScrollArea>
    
  )

}
