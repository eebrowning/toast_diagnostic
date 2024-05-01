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
    // const [dd,setDd]=useState();
    // const [gh,setGh]=useState();
    // const [ue,setUe]=useState();
    const ue= queryClient.getQueryData('ue');
    const dd= queryClient.getQueryData('dd');
    const gh= queryClient.getQueryData('gh');


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
        let res= orders?.filter(order=>{
            //only want partner dining options...
            //for order -< if map[diningOptionGuid] includes 'grubhub' or 'uber eats' or 'doordash', allow.
            console.log(map[order.diningOption?.guid]?.toLowerCase(),'lowercase')
            if( map[order.diningOption?.guid]?.toLowerCase().includes(`${partner}`)){
            return order;
           }
        })
        // console.log(res, 'res')
       
        if(partner=='door') queryClient.setQueryData('dd', res); 
        if(partner=='grub') queryClient.setQueryData('gh', res);
        if(partner=='uber') queryClient.setQueryData('ue', res);;
        queryClient.getQueryData('accessToken');
    
 
    }


    const handleClick = (e) => {
        e.preventDefault();
        queryClient.invalidateQueries(['OrderInfo', accessToken, guid]);
        queryClient.invalidateQueries(['Orders', accessToken, guid]);

        // console.log(queryClient.getQueryData('optionMap'),'map?')
        // console.log(queryClient.getQueryData('optionMap'),'map?')
        filterPartnerOrder('door');
        filterPartnerOrder('grub');
        filterPartnerOrder('uber');
        console.log(ue,'wahhh')
    };

    // if(isLoading) return(<div>Loading...</div>)
    // else if(error) return(<>error.message</>)
    // else 
    return (
      <div>

        <button onClick={handleClick}>Check Recent Orders</button>
        <div>{orders && <>{orders.length} orders with source "API" in the last 48 hours</>}</div>
        <div>{dd && <>{dd.length} DoorDash orders in the last 48 hours</>}</div>
        <div>{gh && <>{gh.length} Grubhub orders in the last 48 hours</>}</div>
        <div>{ue && <>{ue.length} Uber Eats orders in the last 48 hours</>}</div>

      </div>
    );
    
}

export default OrderInfo