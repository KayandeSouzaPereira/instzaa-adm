"use server"
import api from "./api"
import { Cardapio, Pedido } from "../tabela/formCardapio/columns";
import { cookies } from "next/headers";

  function saveToken(body:any){
     api.post("auth/login", body).then(
      result => { 
        console.log(result.data.token);
        const oneDay = 24 * 60 * 60 * 1000
       cookies().set('token', result.data.token, { expires: Date.now() - oneDay })
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
    let tkk = cookies().get("token").value
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
      let token = cookies().get("token").value
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
      let token = cookies().get("token").value
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
        let ret = await  api.post('cardapio', data, config)
        return ret.data
      }catch (err: any){
        return err.response.data
      }
    }

    async function setItemCardapio(body:Cardapio, id:String) {
      let token = cookies().get("token").value
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
    let tkk = cookies().get("token").value
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
    let token = cookies().get("token").value
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

  function savePedido(body:any) {
    let token = cookies().get("token").value 
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
    let token = cookies().get("token").value
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
      console.log("updatePedido")
      return ret.data
    }catch (err: any){
      return err.response.data
    }
  }


export { saveToken,login,getCardapio,getItemCardapio,deleteItemCardapio,cadastroItemCardapio, setItemCardapio, getPedidos, getPedidoId, deletePedido, savePedido, updatePedido}