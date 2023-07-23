import Link from "next/link";

export default function NotFound() {
  return (
    <section
      className={`
        h-screen
        bg-zinc-50
        dark:bg-zinc-950
      `}
    >
      <div
        className={`
          px-10 py-5
          sm:w-auto 
          md:w-2/4 
          xl:w-2/4 
          2xl:w-1/4 
          grid grid-cols-1 gap-4
        `}
      >
        <h1>Not Found</h1>
        <p>ページが見当たりませんでした。</p>
        <Link href="/">メインへ戻る</Link>
      </div>
    </section>
  );
}
