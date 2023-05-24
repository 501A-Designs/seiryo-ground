const StaticPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section
      className={`
        px-10 py-5
        sm:w-auto 
        md:w-2/4 
        xl:w-2/4 
        2xl:w-1/4 
        grid grid-cols-1 gap-4
      `}
    >
      {children}
    </section>
  );
};

export default StaticPageLayout;
