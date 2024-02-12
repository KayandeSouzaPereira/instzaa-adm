import { headers } from "next/headers";
import api from "./api"
import { Cardapio, Pedido } from "../tabela/formCardapio/columns";

  function getCardapio(): Promise<Cardapio[]>  {
    return api.get('cardapio/listCardapio')
    }  
    
    function getItemCardapio(id:number) {
    
        const bodyParameters = {
            id
        };
        return api.post('cardapio/findByIDCardapioItem', bodyParameters)
    }

    function deleteItemCardapio(id:number) {
    
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
  

  
 
  
  function getPedidos(): Promise<Pedido[]> {
    return api.get('pedido/listPedido')
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


export { getCardapio,getItemCardapio,deleteItemCardapio, setItemCardapio, getPedidos, getPedidoId, deletePedido, savePedido}