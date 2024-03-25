import { columns, Cardapio } from "../components/columns"
import { DataTable } from "./formCardapio/data-table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getCardapio } from "../service/service";

 async function getData(): Promise<Cardapio[]> {
  let token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrYXlhbkB0ZXN0LmNvbSIsImlhdCI6MTcxMTMwMjU3MCwiZXhwIjoxNzExNTYxNzcwfQ.Sd_sAYA8Q_9EapzRWHWJ3LkWpcYzhc3yzXvGGQVKej4";
  return getCardapio(token)
  .then(result => { return result.data;})
  .catch(error => { console.log(error); return Promise.reject(error); });
}
/*
async function getData2(): Promise<Pedido[]> {
    // Fetch data from your API here.
    let token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrYXlhbkB0ZXN0LmNvbSIsImlhdCI6MTcxMTMwMjU3MCwiZXhwIjoxNzExNTYxNzcwfQ.Sd_sAYA8Q_9EapzRWHWJ3LkWpcYzhc3yzXvGGQVKej4";
  return getPedidos(token)
    .then(result => { console.log(result.data); return result.data; })
    .catch(error => { return Promise.reject(error); });
  } */

export default function Dashboard() {

  const data = getData();
  //const data2 = await getData2();

  /* const data: Cardapio[] =
  [
    {
      id: '152',
      nome: 'Pizza de Calabresa',
      descricao: 'Pizza com Calabresa e cebola',
      imagem: '',
      preco: 0.00,
      categoria: 'pizza',
      destaque: false,
      promocao: true
    }
  ]; */
  

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
           
        </TabsContent>
        
        </Tabs>
    </div>
  )
}
