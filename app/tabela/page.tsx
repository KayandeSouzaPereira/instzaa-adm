
import { columns, Cardapio, Pedido, columnsPedido } from "../components/columns"
import { DataTable } from "./formCardapio/data-table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getCardapio, getPedidos } from "../service/service";
import { params } from "../components/token";
 async function getData(): Promise<Cardapio[]> {
  const tkTest = await params();
    return getCardapio(tkTest)
    .then(result => {return result.data;})
    .catch(error => {return Promise.reject(error);})
}

async function getData2(): Promise<Pedido[]> {
  const tkTest = await params();
    return getPedidos(tkTest)
    .then(result => {return result.data;})
    .catch(error => {return Promise.reject(error);})
}


export default async function Dashboard() {
  const data: Cardapio[] = await getData();
  const data2: Pedido[] = await getData2();
  console.log(data2[0].resumoPedido);
  return (
    <div className="container w-full">
        <Tabs defaultValue="Cardapio" className="w-[800px]">
        <TabsList className="w-full">
        
        

        <div className="w-[600px]"></div>
        <TabsTrigger value="Caixa">Caixa</TabsTrigger>
        <TabsTrigger value="Cardapio">Cardapio</TabsTrigger>
        <TabsTrigger value="Pedidos">Pedidos</TabsTrigger>
           
        </TabsList>
        <TabsContent value="Caixa">
        </TabsContent>
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
