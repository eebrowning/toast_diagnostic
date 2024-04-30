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
    const [dd,setDd]=useState([]);
    const [gh,setGh]=useState([]);
    const [ue,setUe]=useState([]);


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

    // console.log(orders,map,'orders')//BOOOOOM -> good. We just need to figure out sorting to show each partner here!
    //need to make sure orders update dynamically--currently 1 refresh
    
    const filterPartnerOrder=(partner)=>{
        let res= orders.filter(order=>{
            //only want partner dining options...
            //for order -< if map[diningOptionGuid] includes 'grubhub' or 'uber eats' or 'doordash', allow.
           console.log(order.diningOption.guid,map[order.diningOption.guid])
            if( map[order.diningOption.guid].toLowerCase().includes(`${partner}`)){
            return order;
           }
        })
        // console.log(res, 'res')
       
        if(partner=='doordash')setDd(res); 
        if(partner=='grub')setGh(res); 
        if(partner=='uber') setUe(res);
       

    }


    const handleClick = (e) => {
        e.preventDefault();
        queryClient.invalidateQueries(['OrderInfo', accessToken, guid]);
        // console.log(queryClient.getQueryData('optionMap'),'map?')
        // console.log(queryClient.getQueryData('optionMap'),'map?')
        filterPartnerOrder('doordash');
        filterPartnerOrder('grub');
        filterPartnerOrder('uber');

    };

    // if(isLoading) return(<div>Loading...</div>)
    // else if(error) return(<>error.message</>)
    // else 
    return (
      <div>

        <button onClick={handleClick}>Fetch Dining Options</button>
        <div>{orders && <>{orders.length} orders with source "API" in the last 48 hours</>}</div>
        <div>{orders && <>{dd.length} DoorDash orders in the last 48 hours</>}</div>
        <div>{orders && <>{gh.length} Grubhub orders in the last 48 hours</>}</div>
        <div>{orders && <>{ue.length} Uber Eats orders in the last 48 hours</>}</div>

      </div>
    );
    
}

export default OrderInfo