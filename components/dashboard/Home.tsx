import { columns, Cardapio, Pedido, columnsPedido, columnsPix, PagamentoPix } from "../columns"
import { DataTable } from "../formCardapio/data-table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getCardapio, getPedidos, getEmpresa, getCaixa, getPix, getContagemPedido } from "../service/service";
import { EmpresaDto } from "../formEmpresa/form";
import { params } from "../token";
import AvatarComp from "../Avatar";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

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

async function getData3(): Promise<EmpresaDto[]> {
    return getEmpresa()
    .then(result => {console.log(result.data);return result.data;})
    .catch(error => {return Promise.reject(error);})
}

async function getData4(): Promise<any[]> {
  return getCaixa()
  .then(result => {
    return result.data
  })
  .catch(error => {return Promise.reject(error);})
}

async function getData5(): Promise<any[]> {
  return getPix()
  .then(result => {
    const objs = result.data.cobs;
    let ret:PagamentoPix[] = [];
    objs.forEach((obj) => {
      let pagamento:PagamentoPix = {};
      pagamento.data = new Date(obj.calendario.criacao).toLocaleDateString('pt-BR');
      pagamento.id = obj.loc.id
      pagamento.valor = obj.valor.original
      ret.push(pagamento);
    })
    return ret;
  })
  .catch(error => {return Promise.reject(error);})
}

async function getData6(): Promise<any[]> {
  return getContagemPedido()
  .then(result => {
    return result.data
  })
  .catch(error => {return Promise.reject(error);})
}





export default async function Dashboard() {
  const data: Cardapio[] = await getData();
  const data2: Pedido[] = await getData2();
  const data3: EmpresaDto[] = await getData3();
  const data4: any[] = await getData4();
  const data5: any[] = await getData5();
  let data6: any[] = await getData6();

  let check = false;
  
  const checkCont = async () => {
    const _data: any[] = await getData6();
    if (_data > data6){
      check = true;
    }else {
      check = false;
    }
  }
  
  
  const timer = setInterval(checkCont, 3000);

  return (
    <div className="container w-full">
         
        <Tabs defaultValue="Caixa" className="w-[1200px]">
        <TabsList className="w-full h-[50px] items-center" >
        <TabsTrigger value="Caixa">Caixa</TabsTrigger>
        <TabsTrigger value="Cardapio">Cardapio</TabsTrigger>
        <TabsTrigger value="Pedidos">Pedidos</TabsTrigger>
        <div className="w-full"/>
        {
          data3 != undefined ?
        <div className="mx-4">Olá {data3.nomeEmpresa}.</div>
        :
        <div className="mx-4">Bem vindo.</div>
        }
          <AvatarComp empresa={data3} check={check}/>
        </TabsList>
        <TabsContent value="Caixa">
          <div className="w-[1200px] h-[1000px] bg-slate-900 ">
            <div className="flex flex-row">
                <div className="w-[580px] h-[150px] bg-slate-900 mx-2 py-5">
                  <Card className="w-[580px] h-[140px] bg-slate-700 mx-2">
                    <CardHeader>
                      <CardTitle>Caixa</CardTitle>
                      <CardDescription className="text-lg">{new Intl.NumberFormat("pt-Br", {style: "currency",currency: "BRL",}).format(data4.saldo)}</CardDescription> 
                    </CardHeader>
                  </Card>
                </div>
                <div className="w-[580px] h-[150px] bg-slate-900 mx-2 py-5">
                  <Card className="w-[580px] h-[140px] bg-slate-700 mx-2">
                    <CardHeader>
                      <CardTitle>Pedidos do dia :</CardTitle>
                       <CardDescription className="text-lg">{data5.length}</CardDescription> 
                    </CardHeader>
                  </Card>
                </div>
              </div>
              <div className="w-[1150px] of mt-5 mx-5 content-center flex">
                <DataTable columns={columnsPix} data={data5} /> 
              </div>
          </div>
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