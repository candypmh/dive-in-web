import { getHome } from "@/api/server/home";

export const revalidate = 3600;
import Image from "next/image";
import HomeClient from "./clientPage";

// export default function Home({content}: {content: string}) {
export default async function Home() {
    const home = await getHome();

  return (
    <div className="flex flex-col">
         <header className="flex gap-2 pt-4 px-4 xl:hidden">
           <div className="flex items-center gap-2">
             <Image
               alt="로고"
               src="/image/logo_o.png"
               width={68}
               height={16}
               className="h-4 w-[68px] object-cover"
             />
           </div>
         </header>
   
         <section className="flex flex-col">
           <div>
             <HomeClient home={home}/>
           </div>
         </section>
       </div>
  );
}
