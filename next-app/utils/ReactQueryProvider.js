import React,{ createContext, useContext, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const QueryClientContext = createContext();

export const useQueryClient = () => useContext(QueryClientContext);



export const ReactQueryProvider = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientContext.Provider value={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </QueryClientContext.Provider>
  );
};
