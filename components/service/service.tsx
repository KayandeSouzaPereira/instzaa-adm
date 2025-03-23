"use server"
import api from "./api"
import { Cardapio, Pedido } from "../tabela/formCardapio/columns";
import { EmpresaDto } from "../tabela/formEmpresa/form";
import { cookies, type UnsafeUnwrappedCookies } from "next/headers";

  function saveToken(body:any){
     api.post("auth/login", body).then(
      result => { 
        const oneDay = 24 * 60 * 60 * 1000
       (cookies() as unknown as UnsafeUnwrappedCookies).set('token', result.data.token, { expires: Date.now() - oneDay })
    }).catch(err => {console.log("error")});
   
      
  }


  async function login(body:any) {
    try {
      const resp = await api.post("auth/login", body)
      return resp.data
    } catch (err: any){
      return err.response.data
    }
    
  }

  function getCardapio(token:String) {
    let tkk = (cookies() as unknown as UnsafeUnwrappedCookies).get("token").value
    const config = {
      headers: { 
        Authorization: `Bearer ${tkk}`,
        "Cache-Control": "no-cache",
      }
    };
    return api.get('cardapio/', config) 
  }  
    
    function getItemCardapio(id:number) {
    
        const bodyParameters = {
            id
        };
        return api.post('cardapio/findByIDCardapioItem', bodyParameters)
    }

    function deleteItemCardapio(id:string) {
      let token = (cookies() as unknown as UnsafeUnwrappedCookies).get("token").value
      const config = {
        headers: { 
        Authorization: `Bearer ${token}`,
        "Cache-Control": "no-cache",
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json',
      }
      };
        
        return api.delete('cardapio/'+ id, config)
    }

    async function cadastroItemCardapio(body:CardapioDTO) {
      let token = (await cookies()).get("token").value
      const config = {
        headers: {
          "Cache-Control": "no-cache",
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      };
      const data = JSON.stringify(body)
      
      try{
        let ret = await api.post('cardapio', data, config)
        
        return ret.data
      }catch (err: any){
        return err.response.data
      }
    }

    async function setItemCardapio(body:Cardapio, id:String) {
      let token = (await cookies()).get("token").value
      const config = {
        headers: {
          "Cache-Control": "no-cache",
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      };
      let data = JSON.stringify(body)
      
      try {
        const resp = await api.put('cardapio/'+id, body, config)
        return resp.data
      }catch (err: any){
        return err.response.data
      }
    }
  

  
 
  
  function getPedidos(token:String): Promise<Pedido[]> {
    let tkk = (cookies() as unknown as UnsafeUnwrappedCookies).get("token").value
    const config = {
      headers: { Authorization: `Bearer ${tkk}` }
    };
    return api.get('pedido/', config)
    }  

  function getPedidoId(id:number) {
    
      const bodyParameters = {
          id
      };
      
      return api.post('pedido/findByIDPedido', bodyParameters)
  }

  function deletePedido(id:number) {
    let token = (cookies() as unknown as UnsafeUnwrappedCookies).get("token").value
      const config = {
        headers: {
          "Cache-Control": "no-cache",
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      };
      return api.delete('pedido/' + id, config)
  }

  function updateStatusPedido(id:number) {
    let token = (cookies() as unknown as UnsafeUnwrappedCookies).get("token").value
      const config = {
        headers: {
          "Cache-Control": "no-cache",
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      };
      return api.get('pedido/status/' + id, config)
  }

  function updateStatusCancelamentoPedido(id:number) {
    let token = (cookies() as unknown as UnsafeUnwrappedCookies).get("token").value
      const config = {
        headers: {
          "Cache-Control": "no-cache",
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      };
      return api.get('pedido/cancelaStatus/' + id, config)
  }

  function savePedido(body:any) {
    let token = (cookies() as unknown as UnsafeUnwrappedCookies).get("token").value 
      const config = {
        headers: {
          "Cache-Control": "no-cache",
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      };
    return api.post('pedido/savePedido', body, config)
  }

  async function updatePedido(body:any, id) {
    let token = (await cookies()).get("token").value
      const config = {
        headers: {
          "Cache-Control": "no-cache",
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      };
    try{
      let ret = await api.put('pedido/'+id, body, config)
      return ret.data
    }catch (err: any){
      return err.response.data
    }
  }

  async function getEmpresa() {
    let token = (await cookies()).get("token").value
    let cargo = (await cookies()).get("cargo").value

    if(cargo.includes("Admin")){

    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    return api.get('empresa/', config)
    } else {
      return {data: undefined};
    }
  }

  async function setEmpresa(body:EmpresaDto, id: number) {
    let token = (await cookies()).get("token").value
    const config = {
      headers: {
        "Cache-Control": "no-cache",
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    };
    const data = JSON.stringify(body)
    
    try{
      let ret = await  api.put('empresa/'+ id, data, config)
      
      return ret.data
    }catch (err: any){
      return err.response.data
    }
  }

  function getPix() {
    let tkk = (cookies() as unknown as UnsafeUnwrappedCookies).get("token").value
    const config = {
      headers: { 
        Authorization: `Bearer ${tkk}`,
        "Cache-Control": "no-cache",
      }
    };
    return api.get('pagamento/listaPagamentosPix', config) 
  }

  function getCaixa() {
    let tkk = (cookies() as unknown as UnsafeUnwrappedCookies).get("token").value
    const config = {
      headers: { 
        Authorization: `Bearer ${tkk}`,
        "Cache-Control": "no-cache",
      }
    };
    return api.get('pagamento/caixa', config) 
  }

  function getContagemPedido() {
    let tkk = (cookies() as unknown as UnsafeUnwrappedCookies).get("token").value
    const config = {
      headers: { 
        Authorization: `Bearer ${tkk}`,
        "Cache-Control": "no-cache",
      }
    };
    return api.get('pedido/contagem', config) 
  }

  function getAvaliacao(id) {
    let tkk = (cookies() as unknown as UnsafeUnwrappedCookies).get("token").value
    const config = {
      headers: { 
        Authorization: `Bearer ${tkk}`,
        "Cache-Control": "no-cache",
      }
    };
    return api.get('avaliacao/' + id, config) 
  }


export { saveToken,login,getCardapio,getItemCardapio,deleteItemCardapio,cadastroItemCardapio, setItemCardapio, getPedidos, getPedidoId, deletePedido, savePedido, updatePedido, getEmpresa, setEmpresa, getCaixa, getPix, updateStatusPedido, updateStatusCancelamentoPedido, getContagemPedido, getAvaliacao}