// Инструкция "use client" указывает на использование клиентского (браузерного) режима.
"use client";

// Импорт необходимых типов и компонентов из библиотеки React и react-query.
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

// Определение типа для свойства "children" в компоненте Providers.
type ProviderProps = {
  children?: ReactNode;
};

// Экспортируемый функциональный компонент Providers, отвечающий за предоставление контекста react-query.
export function Providers({ children }: ProviderProps) {
  // Создание нового экземпляра QueryClient для управления состоянием запросов.
  const queryClient = new QueryClient();

  // Оборачиваем дочерние элементы в QueryClientProvider, предоставляющий контекст react-query.
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
