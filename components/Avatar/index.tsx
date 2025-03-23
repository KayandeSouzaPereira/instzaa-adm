'use client'
import { useEffect } from "react"
import { MoreHorizontal } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import img from "../../src/image/pizza.jpg"
import { EmpresaForm, EmpresaDto } from "../formEmpresa/form"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Toaster, toast } from 'sonner'

 function checkContPedidos () {
    toast("Um novo pedido foi realizado !", {
      action: {
        label: "Atualizar pagina",
        onClick: () => location.reload(),
      },
    })
} 

export default function AvatarComp(empresaa: EmpresaDto, check: boolean) {

  useEffect(() => {
    if (check == true){
      checkContPedidos();
    }
    
  },[check])
  
    return (
        <div>
        {
        empresaa.nomeEmpresa != undefined ?
        <Dialog>
              <Toaster position="bottom-center" />
              <DialogTrigger>
                <Avatar className="w-8 h-8 mh-3">
                  <MoreHorizontal className="h-4 w-4" />
                  <AvatarImage src={img.src} />
                  <AvatarFallback>ID</AvatarFallback>
                </Avatar>
              </DialogTrigger>
              <DialogContent>
                  <DialogHeader>
                  <DialogTitle>Edite informações da sua Empresa </DialogTitle>
                  <DialogDescription>
                    <EmpresaForm empresa={empresaa} />
                  </DialogDescription>
                  </DialogHeader>
              </DialogContent>
            </Dialog>
            :
            <Avatar className="w-8 h-8 mh-3">
              <Toaster position="bottom-center" />
                  <MoreHorizontal className="h-4 w-4" />
                  <AvatarImage src={img.src} />
                  <AvatarFallback>ID</AvatarFallback>
            </Avatar>
        }
      </div>
    )
}