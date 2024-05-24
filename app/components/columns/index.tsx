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
import { ProfileFormEdit } from "../../tabela/formCardapioEdit/form"
import { PedidoFormEdit } from "@/app/tabela/formPedidoEdit/form"

export type Cardapio = {
    id: string
    nome: string
    descricao: string
    imagem: string
    preco: number
    categoria: string
    destaque: boolean
    promocao: boolean
  }



export const columns: ColumnDef<Cardapio>[] = [
  
    {
        id: "ações",
        cell: ({ row }) => {
          const cardapio = row.original
          const id = cardapio.id;
          const destaque = cardapio.destaque
          const promocao = cardapio.promocao


          let edit = {
            id: id,
            nome: cardapio.nome,
            descricao : cardapio.descricao,
            preco : cardapio.preco,
            categoria: cardapio.categoria,
            destaque: destaque,
            promocao: promocao,
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
                        if(r==true){deleteItemCardapio(cardapio.id); setInterval(function(){location.reload()},1000);}
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

export type Pedido = {
  id: number
  nomeCliente: String
  cpf: String
  endereco: String
  data: String
  valor: String
  status: String
  numeroContato: number
  resumoPedido: Cardapio[]
}

export const columnsPedido: ColumnDef<Pedido>[] = [
  
  {
      id: "ações",
      cell: ({ row }) => {
        const pedido = row.original
        const id = pedido.id;


        let edit = {
          id: id,
          nomeCliente: pedido.nomeCliente,
          endereco : pedido.endereco,
          data : pedido.data,
          numeroContato: pedido.numeroContato,
          valor: pedido.valor,
          status: pedido.status,
          resumoPedido : pedido.resumoPedido,
          cpf: pedido.cpf
        }

   
        return (
          <Dialog>
            <DialogTrigger>
                <Pencil2Icon className="h-5 w-5"/>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Edite o pedido </DialogTitle>
                <DialogDescription>
                < PedidoFormEdit formEdit={edit}/>    
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
                    var r = confirm("Tem Certeza que deseja apagar o pedido de : " + pedido.nomeCliente  + " ? ");
                      if(r==true){deletePedido(pedido.id);setInterval(function(){location.reload()},1000);}
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
  header: "Cliente",
},
{
  accessorKey: "numeroContato",
  header: "Contato",
},
{
  accessorKey: "valor",
  header: () => <div className="text-right">Preço</div>,
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