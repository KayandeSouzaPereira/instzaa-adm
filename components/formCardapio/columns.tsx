"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { deleteItemCardapio, deletePedido } from "@/app/service/service"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Pencil2Icon } from "@radix-ui/react-icons"
import { ProfileFormEdit } from "../formCardapioEdit/form"
import { PedidoFormEdit } from "../formPedidoEdit/form"




// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Cardapio = {
  id: number
  nome: String
  descricao: String
  preco: number
  categoria: String
  promocao: boolean
  destaque: boolean
  itemLanche: boolean
  imagem: string
}

export type CardapioDTO = {
  nome: String
  descricao: String
  preco: number
  categoria: String
  promocao: boolean
  destaque: boolean
  itemLanche: boolean
  imagem: string
}

  

export type Pedido = {
    id: number
    nomeCliente: String
    cpf: String
    endereco: String
    data: String
    valor: String
    status: null
    numeroContato: number
    avaliacao: number
  }


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

export const columns: ColumnDef<Cardapio>[] = [
  
    {
        id: "ações",
        cell: ({ row }) => {
          const cardapio = row.original
          const id = cardapio.id;
          const destaque = cardapio.destaque
          const promocao = cardapio.promocao
          const itemLanche = cardapio.itemLanche


          let edit = {
            id: id,
            nome: cardapio.nome,
            descricao : cardapio.descricao,
            preco : cardapio.preco,
            categoria: cardapio.categoria,
            destaque: destaque,
            promocao: promocao,
            itemLanche: itemLanche,
            imagem : cardapio.imagem
          }
     
          return (
            <Dialog>
              <DialogTrigger>
                  <Pencil2Icon className="h-5 w-5"/>
              </DialogTrigger>
              <DialogContent>
                  <DialogHeader>
                  <DialogTitle>Edite um item ao cardápio </DialogTitle>
                  <DialogDescription>
                  < ProfileFormEdit formEdit={edit}/>    
                  </DialogDescription>
                  </DialogHeader>
              </DialogContent>
          
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Abrir Menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Ações</DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={() => navigator.clipboard.writeText(cardapio.id)}
                  >
                  Copiar ID
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                  onClick={
                    () => {
                      var r = confirm("Tem Certeza que deseja apagar o item : " + cardapio.nome  + " ? ");
                      if(r === true) {deleteItemCardapio(cardapio.id);location.reload();}
                    }}
                    >Remover</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </Dialog>
          )
        },
      },
  {
    accessorKey: "nome",
    header: "Nome",
  },
  {
    accessorKey: "categoria",
    header: "Categoria",
  },
  {
    accessorKey: "preco",
    header: () => <div className="text-right">Preço</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("preco"))
      const formatted = new Intl.NumberFormat("pt-Br", {
        style: "currency",
        currency: "BRL",
      }).format(amount)
 
      return <div className="text-right font-medium">{formatted}</div>
    },
  }
]

export const columnsPedido: ColumnDef<Pedido>[] = [
    {
        id: "ações",
        cell: ({ row }) => {
          const pedido = row.original
          const status = pedido.status
          console.log(pedido)

          let edit = {
            id: pedido.id,
            nomeCliente: pedido.nomeCliente,
            cpf : pedido.cpf,
            endereco: pedido.endereco,
            data : pedido.data,
            numeroContato: pedido.numeroContato,
            valor: pedido.valor,
            resumoPedido: "",
            status : status,
            avaliacao: pedido.nota
          }
     
          return (
            <Dialog>
              <DialogTrigger>
                  <Pencil2Icon className="h-5 w-5"/>
              </DialogTrigger>
              <DialogContent>
                  <DialogHeader>
                  <DialogTitle>Edite o pedido do Cliente </DialogTitle>
                  <DialogDescription>
                  <PedidoFormEdit formEdit={edit}/>    
                  </DialogDescription>
                  </DialogHeader>
              </DialogContent>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Abrir Menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(pedido.id)}
                >
                 Copiar ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                onClick={
                  () => {
                    var r = confirm("Tem Certeza que deseja apagar o pedido do : " + pedido.nomeCliente  + " ? ");
                    if(r === true) {deletePedido(pedido.id);location.reload();}
                  }}
                >Remover</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            </Dialog>
          )
        },
      },
  {
    accessorKey: "nomeCliente",
    header: "Nome Cliente",
  },
  {
    accessorKey: "cpf",
    header: "CPF",
  },
  {
    accessorKey: "data",
    header: "Data",
  },
  {
    accessorKey: "valor",
    header: () => <div className="text-right">Valor</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("valor"))
      const formatted = new Intl.NumberFormat("pt-Br", {
        style: "currency",
        currency: "BRL",
      }).format(amount)
 
      return <div className="text-right font-medium">{formatted}</div>
    },
  }
]
