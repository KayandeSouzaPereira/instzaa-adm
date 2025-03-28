
import "../components/globals.css"
import { Inter as FontSans } from "next/font/google";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Spline from '@splinetool/react-spline/next';

import { ModeToggle } from "@/components/darkmode";
import { Loginform } from "@/components/loginform";

 
export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",})

export default function Home() {
  return (
    <div>
      <main className="flex min-h-screen flex-col items-center pt-5 ph-20 h-full">
      <Spline
            scene="https://prod.spline.design/LnG4vWbScej-SnCk/scene.splinecode" 
          />
         <div className="absolute flex min-h-screen h-full flex-row items-start pt-[200px] left-[150px]">
        
        <Card className="w-[350px] justify">
        <CardHeader>
          <CardTitle>Instzaa</CardTitle>
          <CardDescription>Administre seu delivery com praticidade.</CardDescription>
        </CardHeader>
        <CardContent><Loginform/></CardContent>
        <CardFooter className="flex justify-between">
        <div className="bottom-0 w-max"><ModeToggle /></div>
        </CardFooter>
      </Card>
      </div>
        
      </main>
    </div>
    
  );
}
