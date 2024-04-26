import { columns, Cardapio, Pedidos, columnsPedido } from "../components/columns"
import { DataTable } from "./formCardapio/data-table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getCardapio, getPedidos } from "../service/service";

 async function getData(): Promise<Cardapio[]> {
  let token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrYXlhbkB0ZXN0LmNvbSIsImlhdCI6MTcxNDA3MjczNywiZXhwIjoxNzE0MzMxOTM3fQ.dfhq3kSwikBvELldfJUXDnOTwwsz_VEMI_0QGwq3ozU"
  return getCardapio(token)
  .then(result => {return result.data;})
  .catch(error => {return Promise.reject(error);})
}

async function getData2(): Promise<Pedido[]> {
  let token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrYXlhbkB0ZXN0LmNvbSIsImlhdCI6MTcxNDA3MjczNywiZXhwIjoxNzE0MzMxOTM3fQ.dfhq3kSwikBvELldfJUXDnOTwwsz_VEMI_0QGwq3ozU"
  return getPedidos(token)
  .then(result => {console.log(result.data); return result.data;})
  .catch(error => {return Promise.reject(error);})
}


export default async function Dashboard() {
  let data: Cardapio[] = await getData();
  
  const data2 = await getData2();

  /*  const data2: Cardapio[] =
  [
    {
      id: 302,
      nome: 'Pizza de Frango',
      descricao: 'Pizza com Frango',
      imagem: '',
      preco: 42,
      categoria: 'pizza',
      destaque: false,
      promocao: true
    },
  ];  */
  

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
