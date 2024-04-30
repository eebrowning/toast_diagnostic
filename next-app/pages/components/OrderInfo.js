import { getDiningOptions, getRecentOrders } from "../../API/ToastQueries.js";
import { useQuery } from "react-query";
import { useQueryClient } from "../../utils/ReactQueryProvider";
import { useEffect, useState } from "react";



///currently 'works', but having state issues. 
const OrderInfo = ({pageProps}) => {
    // let [optionMap,setOptionMap]=useState({})
    const queryClient = useQueryClient();
    const accessToken= queryClient.getQueryData('accessToken');
    const guid = sessionStorage.getItem('guid');

    // let drop=()=> queryClient.clear();//will drop current cache
    // console.log(guid, accessToken);

    const updateOptionMap = (newMap) => {
        queryClient.setQueryData('optionMap', newMap);
      };

    const { data:map, isLoading: mapIsLoading, error: mapError } = useQuery(['OrderInfo', accessToken, guid], async () => {
      if (!accessToken || !guid) return;//todo: maybe add to an errors useState for 'validation errors?
      return await getDiningOptions(accessToken, guid);
    },{
        onSuccess: updateOptionMap,
      });
    const { data:orders, isLoading: ordersIsLoading, error: ordersError } = useQuery(['Orders', accessToken, guid], async () => {
        if (!accessToken || !guid) return;//todo: maybe add to an errors useState for 'validation errors?
        return await getRecentOrders(accessToken, guid);
      });

    console.log(orders,'orders')//BOOOOOM -> good. We just need to figure out sorting to show each partner here!
    

      const handleClick = (e) => {
        e.preventDefault();
        queryClient.invalidateQueries(['OrderInfo', accessToken, guid]);
        // console.log(queryClient.getQueryData('optionMap'),'map?')
        // console.log(queryClient.getQueryData('optionMap'),'map?')

    };

    // if(isLoading) return(<div>Loading...</div>)
    // else if(error) return(<>error.message</>)
    // else 
    return (
      <div>

        <button onClick={handleClick}>Fetch Dining Options</button>
        <div>
        {map && <>{orders.length} orders with source "API" in the last 48 hours</>}
        </div>
      </div>
    );
    
}

export default OrderInfo