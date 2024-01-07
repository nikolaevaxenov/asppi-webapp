// Импортируем необходимые зависимости и компоненты.
import { Providers } from "./providers"; // Импорт провайдеров из файла providers.js.
import HeaderComponent from "@/components/HeaderComponent"; // Импорт компонента HeaderComponent из каталога components.
import Head from "./head"; // Импорт компонента Head из файла head.js.
import "@/styles/globals.scss"; // Импорт глобальных стилей из файла globals.scss.

// Экспортируемый по умолчанию функциональный компонент RootLayout.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Обертка страницы в элемент <html>
    <html lang="en">
      {/* Подключаем компонент Head для управления мета-информацией страницы. */}
      <Head />

      {/* Тело страницы. */}
      <body>
        {/* Обертка провайдеров для управления состоянием и зависимостями. */}
        <Providers>
          {/* Основной контент страницы внутри обертки с классом "wrapper". */}
          <div className="wrapper">
            {/* Шапка страницы с компонентом HeaderComponent. */}
            <div className="wrapper__header">
              <HeaderComponent />
            </div>

            {/* Основной контент страницы внутри обертки с классом "wrapper__content". */}
            <main className="wrapper__content">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
