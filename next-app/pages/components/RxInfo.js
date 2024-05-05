import { getRxInfo } from "../../API/ToastQueries.js";
import { useQuery } from "react-query";
import { useQueryClient } from "../../utils/ReactQueryProvider";
import {useEffect, useState } from "react";
import OrderInfo from "./OrderInfo.js";
import ScriptedSplunks from "./ScriptedSpunks.js";


const RestaurantInfo = ({pageProps, accessToken}) => {
    // const iGuid = sessionStorage.getItem('guid');//since we aren't using much info. But, this could be handled by SSR?
    const queryClient = useQueryClient();
    // const [guid, setGuid]= useState(iGuid?iGuid:null);//I shouldn't need this, but don't @ me...
    const [guid, setGuid] = useState(null);
    useEffect(() => {
      const iGuid = sessionStorage.getItem('guid');
      setGuid(iGuid ? iGuid : null);
    }, []);



    const { data, isLoading, error } = useQuery(['RxInfo', accessToken, guid], async () => {
      if (!accessToken || !guid) return;//todo: maybe add to an errors useState for 'validation errors'?
      return await getRxInfo(accessToken, guid);
    });

    const handleClick = async (e) => {
        e.preventDefault();
        let input=document.getElementById('input-guid').value
        sessionStorage.setItem('guid',input);//needs to be set first,or else the doc reloads due to guid 'changing'.
        setGuid(input)


        
        queryClient.invalidateQueries('guid')
        queryClient.setQueryData('guid',guid)
        queryClient.invalidateQueries('RxInfo')
        
        let partnerOrders= document.getElementById('partner-orders')
        if(partnerOrders) {partnerOrders.style.display='none'}

    }


    if(isLoading) return(<div>Loading Restaurant Info...</div>)
    else if(error) return(<>error.message</>)
    else return (
      <div>
        <input id='input-guid' type='text'></input>
        <button onClick={handleClick}>Fetch Restaurant Info</button>
        {data && <div>
          <div>{data.general?.name}</div>
          <div>{data.location?.address1}{data.location?.address2?`, ${data.location?.address2}`:null}</div>
          <div>{data.location?.city}, {data.location?.stateCode}</div>
          <div>GUID: {data.guid}</div>
          <OrderInfo {...pageProps} rxInfo={data} />
          <ScriptedSplunks accessToken={accessToken} guid={guid} {...pageProps}/>

        </div>}
      </div>
    );
    
}

export default RestaurantInfo