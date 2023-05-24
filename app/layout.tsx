import "./globals.css";
import { Archivo } from "next/font/google";
import Link from "next/link";
import Align from "../lib/alignment/Align";
import RadixDialog from "../components/radix/RadixDialog";
import Button from "../components/button/Button";
import { EnterIcon } from "@radix-ui/react-icons";
import Header from "../components/general/Header";

const archivo = Archivo({ subsets: ["latin"] });

export const metadata = {
  title: "SEIRYO GROUND",
  description: "Find places where you can relax.",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body
      className={`
        ${archivo.className}
        bg-zinc-100
        dark:bg-zinc-950
      `}
    >
      <Header />
      <section className={`min-h-screen`}>{children}</section>
      <footer
        className={` rounded-xl
          px-10 py-5
          grid grid-cols-4
          border-t 
          border-t-zinc-300
          dark:border-t-zinc-800 
          bg-zinc-200
          dark:bg-zinc-900
        `}
      >
        <div>
          <p>SEIRYO GROUND</p>
          <ul>
            <li>
              Produced By <Link href={"/"}>@501A_Designs</Link>
            </li>
            <li>
              Photos By <Link href={"/"}>@EyesObsolete</Link>
            </li>
          </ul>
        </div>
        <div>
          <p>General Information</p>
          <ul>
            <li>
              <Link href={"/about"}>About This Site</Link>
            </li>
            <li>
              <Link href={"/levels"}>Terms of Service</Link>
            </li>
          </ul>
        </div>
        <div>
          <p>Other Relevant Pages</p>
          <ul>
            <li>
              <Link href={"/levels"}>Updates / News</Link>
            </li>
            <li>
              <Link href={"/levels"}>Levels Documentation</Link>
            </li>
            <li>
              <Link href={"/design/"}>Design Language</Link>
            </li>
          </ul>
        </div>
        <p>2023</p>
      </footer>
    </body>
  </html>
);

export default RootLayout;
