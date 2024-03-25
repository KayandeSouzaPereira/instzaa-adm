import "../../app/globals.css"
import Dashboard from '../../app/tabela/page'
import {ModeToggle} from '../../app/darkmode/index'



export default function Gestao() {
    return (
    
    <main className="flex min-h-screen flex-col items-center pt-5 ph-20 h-full">
        <div className="relative flex-col justify-center py-6 sm:py-12">

            <Dashboard/>
        </div>
        <footer className="relative h-32 w-32"><div className="absolute inset-x-0 bottom-0 h-16 ..."><ModeToggle /></div></footer>
    </main>
    )
}