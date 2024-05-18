import React,{ createContext, useContext, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const QueryClientContext = createContext();

export const useQueryClient = () => useContext(QueryClientContext);



export const ReactQueryProvider = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());
  
  return (
    <QueryClientContext.Provider value={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </QueryClientContext.Provider>
  );
};
