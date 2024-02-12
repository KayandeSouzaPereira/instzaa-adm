import Image from "next/image";

import "./globals.css"
import { Inter as FontSans } from "next/font/google"
import Dashboard from './tabela/page'

import {ModeToggle} from './darkmode'
 
export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",})

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center pt-5 ph-20 h-full">
      
      <div className="relative flex-col justify-center py-6 sm:py-12"><Dashboard/></div>
      <footer className="relative h-32 w-32"><div className="absolute inset-x-0 bottom-0 h-16 ..."><ModeToggle /></div></footer>
    </main>
    
  );
}
