import { Cardapio, columns, columnsPedido, Pedido } from "./columns"
import { DataTable } from "./data-table"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "@radix-ui/react-icons"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { ProfileForm } from './form'


async function getData(): Promise<Cardapio[]> {
  // Fetch data from your API here.
  return [
    {
      id: 2,
      Nome: "Pizza de Calabresa",
      Descricao: "Pizza com Linguiça Calabresa e Cebola",
      Preco: 50.3,
      Categoria: "Pizza",
    },
    {
        id: 3,
        Nome: "Pizza de Mussarela",
        Descricao: "Pizza com Linguiça Calabresa e Cebola",
        Preco: 50.3,
        Categoria: "Pizza",
      },
      {
        id: 2,
        Nome: "Pizza de Portuguesa",
        Descricao: "Pizza com Linguiça Calabresa e Cebola",
        Preco: 60.7,
        Categoria: "Pizza",
      },
      {
        id: 2,
        Nome: "Pizza de Frango",
        Descricao: "Pizza com Linguiça Calabresa e Cebola",
        Preco: 68,
        Categoria: "Pizza",
      },
      {
        id: 2,
        Nome: "X Podrão",
        Descricao: "Pizza com Linguiça Calabresa e Cebola",
        Preco: 38.75,
        Categoria: "Hamburguer",
      },
    // ...
  ]
}

async function getData2(): Promise<Pedido[]> {
    // Fetch data from your API here.
    return [
      {
        id: 1,
        NomeCliente: "João",
        CPF: "123.456.789-45",
        Data: "11/02/2024 14:35",
        Valor: "75.5",
        Status: 2
      },
      {
        id: 2,
        NomeCliente: "Samuel",
        CPF: "123.654.789-45",
        Data: "11/02/2024 16:28",
        Valor: "125.49",
        Status: 2
      }
    ]
  }

export default async function Dashboard() {

  const data = await getData()
  const data2 = await getData2();

  return (
    <div className="container w-full">
        <Tabs defaultValue="Cardapio" className="w-[800px]">
        <TabsList className="w-full">

        <Dialog>
            <DialogTrigger>
                <PlusIcon className="h-5 w-5"/>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Adicione um item ao cardápio </DialogTitle>
                <DialogDescription>
                < ProfileForm />    
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

        <div className="w-[600px]"></div>
        <TabsTrigger value="Cardapio">Cardapio</TabsTrigger>
        <TabsTrigger value="Pedidos">Pedidos</TabsTrigger>
           
        </TabsList>
        <TabsContent value="Cardapio">
            <DataTable columns={columns} data={data} />
        </TabsContent>
        <TabsContent  value="Pedidos">
            <DataTable columns={columnsPedido} data={data2} />
        </TabsContent>
        
        </Tabs>
    </div>
  )
}
