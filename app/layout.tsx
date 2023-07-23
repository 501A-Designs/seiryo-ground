import "./globals.css";
import { Archivo } from "next/font/google";
import Link from "next/link";
import Header from "./components/general/Header";

const archivo = Archivo({ subsets: ["latin"] });

export const metadata = {
  title: "SEIRYO GROUND",
  description: "Find places where you can truly  relax.",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body
      className={`
        ${archivo.className}
        bg-zinc-50
        dark:bg-zinc-950
      `}
    >
      <Header />
      <section className={`min-h-screen`}>{children}</section>
      <footer
        className={`
          px-10 py-5
          grid grid-cols-4
          border-t 
          border-t-zinc-200
          dark:border-t-zinc-800
          bg-gradient-to-b
          from-zinc-100
          to-zinc-50
          dark:from-zinc-900
          dark:to-zinc-900/50
        `}
      >
        <div>
          <p>SEIRYO GROUND</p>
          <ul>
            <li>
              作者：<Link href={"/"}>@501A_Designs</Link>
            </li>
            <li>
              写真提供：<Link href={"/"}>@EyesObsolete</Link>
            </li>
          </ul>
        </div>
        <div>
          <p>基本情報</p>
          <ul>
            <li>
              <Link href={"/about"}>本サイトについて</Link>
            </li>
            <li>
              <Link href={"/levels"}>利用規約</Link>
            </li>
          </ul>
        </div>
        <div>
          <p>他のページ</p>
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
