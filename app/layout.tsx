import "./globals.css";
import Header from "./_components/Header";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-full ">
        <div className="flex flex-col h-full gap-2">
          <div className="w-full">
            <Header />
          </div>
          <div className="w-full flex  h-full">
            <div className=" h-full  w-full md:w-[70%] m-auto">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
