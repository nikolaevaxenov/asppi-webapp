import { Providers } from "./providers";
import HeaderComponent from "@/components/HeaderComponent";
import Head from "./head";
import "@/styles/globals.scss";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head />
      <body>
        <Providers>
          <div className="wrapper">
            <div className="wrapper__header">
              <HeaderComponent />
            </div>
            <main className="wrapper__content">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
