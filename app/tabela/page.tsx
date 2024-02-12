import { Cardapio, columns, columnsPedido, Pedido } from "./formCardapio/columns"
import { DataTable } from "./formCardapio/data-table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { getCardapio, getPedidos } from "../service/service"


async function getData(): Promise<Cardapio[]> {
  return getCardapio()
  .then(result => { return result.data.lista; })
  .catch(error => { return Promise.reject(error); });
}

async function getData2(): Promise<Pedido[]> {
    // Fetch data from your API here.
    return getPedidos()
    .then(result => { return result.data.lista; })
    .catch(error => { return Promise.reject(error); });
  }

export default async function Dashboard() {

  const data = await getData()
  const data2 = await getData2();

  

  return (
    <div className="container w-full">
        <Tabs defaultValue="Cardapio" className="w-[800px]">
        <TabsList className="w-full">
        
        

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
