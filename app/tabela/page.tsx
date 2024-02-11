import { Cardapio, columns, columnsPedido } from "./columns"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


async function getData(): Promise<Cardapio[]> {
  // Fetch data from your API here.
  return [
    {
      id: 2,
      Nome: "Pizza de Calabresa",
      Descricao: "Pizza com Linguiça Calabresa e Cebola",
      Preco: 50,
      Categoria: "Pizza",
    },
    {
        id: 3,
        Nome: "Pizza de Mussarela",
        Descricao: "Pizza com Linguiça Calabresa e Cebola",
        Preco: 50,
        Categoria: "Pizza",
      },
      {
        id: 2,
        Nome: "Pizza de Portuguesa",
        Descricao: "Pizza com Linguiça Calabresa e Cebola",
        Preco: 50,
        Categoria: "Pizza",
      },
      {
        id: 2,
        Nome: "Pizza de Frango",
        Descricao: "Pizza com Linguiça Calabresa e Cebola",
        Preco: 50,
        Categoria: "Pizza",
      },
    // ...
  ]
}

async function getData2(): Promise<Cardapio[]> {
    // Fetch data from your API here.
    return [
      {
        id: 1,
        NomeCliente: "João",
        CPF: "123.456.789-45",
        Data: "11/02/2024",
        Valor: "75.5",
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
                <DialogTitle>Adicione</DialogTitle>
                <DialogDescription>
                    
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
        <TabsContent value="Pedidos">
            <DataTable columns={columnsPedido} data={data2} />
        </TabsContent>
        
        </Tabs>
    </div>
  )
}
