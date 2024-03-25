import api from "./api"
import { Cardapio, Pedido } from "../tabela/formCardapio/columns";

  function login(body:any): Promise<String>{
    return api.post("auth/login", body)
  }

  function getCardapio(token:String): Promise<Cardapio[]>  {
    const config = {
      headers: { 
      Authorization: `Bearer ${token}`,
      "Cache-Control": "no-cache",
      "Content-Type": "application/x-www-form-urlencoded",
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
    
        const bodyParameters = {
            id
        };
        return api.post('cardapio/deleteCardapioItem', bodyParameters)
    }

    function setItemCardapio(body:any) {
      
      const config = {
        headers: {"Cache-Control": "no-cache",
        "Access-Control-Allow-Origin": "*",}
    };
      
      return api.post('cardapio/saveCardapioItem', body, config)
    }
  

  
 
  
  function getPedidos(token:String): Promise<Pedido[]> {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
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
  
      const bodyParameters = {
          id
      };
      return api.post('pedido/deletePedido', bodyParameters)
  }

  function savePedido(body:any) {
    
    return api.post('pedido/savePedido', body)
  }


export { login,getCardapio,getItemCardapio,deleteItemCardapio, setItemCardapio, getPedidos, getPedidoId, deletePedido, savePedido}