
import "../../globals.css"
import Dashboard from "../../tabela/page"
import { ThemeProvider } from "@/components/theme-provider"

export default function DashboardPage() {
    
    return (
        
    
    <main className="flex min-h-screen flex-col items-center pt-5 ph-20 h-full">
        <div className="relative flex-col justify-center py-6 sm:py-12">
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Dashboard/>
        </ThemeProvider>
        </div>
    </main>
    )
}