import React, { createContext, useContext } from 'react';
import { useQueryClient } from 'react-query';

const QueryStoreContext = createContext();

export function useQueryStore() {
  return useContext(QueryStoreContext);
}

export function QueryStoreProvider({ children }) {
  const queryClient = useQueryClient();

  function setData(key, data) {
    queryClient.setQueryData(key, data);
  }

  function removeData(key) {
    queryClient.removeQueries(key);
  }

  return (
    <QueryStoreContext.Provider value={{ setData, removeData }}>
      {children}
    </QueryStoreContext.Provider>
  );
}