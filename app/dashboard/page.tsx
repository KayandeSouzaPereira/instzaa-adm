
import "../../components/globals.css"
import DashboardModal from "../../components/dashboard/Home"

export default function Dashboard() {
    
    return (
    <main className="flex min-h-screen flex-col items-center pt-5 ph-20 h-full">
        <div className="relative flex-col justify-center py-6 sm:py-12">
            <DashboardModal/>
        </div>
    </main>
    )
}