import { MoreHorizontal } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import img from '../../../src/image/pizza.jpg'
import { EmpresaForm, EmpresaDto } from "@/app/tabela/formEmpresa/form"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function AvatarComp(empresaa: EmpresaDto) {
  
    return (
        <Dialog>
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



    )
}