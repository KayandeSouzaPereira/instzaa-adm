import api from "./api"
import { Cardapio, Pedido } from "../tabela/formCardapio/columns";


  function login(body:any): Promise<String>{
    return api.post("auth/login", body)
  }

  function getCardapio(token:String): Cardapio[]  {
    const config = {
      headers: { 
      Authorization: `Bearer ${token}`,
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
      console.log("DELETE : " + id)
      let token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrYXlhbkB0ZXN0LmNvbSIsImlhdCI6MTcxNDA3MjczNywiZXhwIjoxNzE0MzMxOTM3fQ.dfhq3kSwikBvELldfJUXDnOTwwsz_VEMI_0QGwq3ozU"
      const config = {
        headers: { 
        Authorization: `Bearer ${token}`,
        "Cache-Control": "no-cache",
      }
      };
        
        return api.delete('cardapio/'+ id, config)
    }

    function cadastroItemCardapio(body:Cardapio) {
      let token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrYXlhbkB0ZXN0LmNvbSIsImlhdCI6MTcxNDA3MjczNywiZXhwIjoxNzE0MzMxOTM3fQ.dfhq3kSwikBvELldfJUXDnOTwwsz_VEMI_0QGwq3ozU"
      
      const config = {
        headers: {
          "Cache-Control": "no-cache",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        }
      };
      const data = JSON.stringify(body)
      
      return api.post('cardapio/', data, config)
    }

    function setItemCardapio(body:Cardapio, id:String) {
      let token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrYXlhbkB0ZXN0LmNvbSIsImlhdCI6MTcxNDA3MjczNywiZXhwIjoxNzE0MzMxOTM3fQ.dfhq3kSwikBvELldfJUXDnOTwwsz_VEMI_0QGwq3ozU"
      
      const config = {
        headers: {
          "Cache-Control": "no-cache",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        }
      };
      let data = JSON.stringify(body)
      
      return api.put('cardapio/'+id, body, config)
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


export { login,getCardapio,getItemCardapio,deleteItemCardapio,cadastroItemCardapio, setItemCardapio, getPedidos, getPedidoId, deletePedido, savePedido}