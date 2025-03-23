"use server"
import { cookies } from 'next/headers'

export async function params(){
        return (await cookies()).get("token").value;
};

export async function paramSave(tk){
  await cookies.set("token", tk);
  return "ok";
}