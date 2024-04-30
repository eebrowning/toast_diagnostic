import { getRxInfo } from "../../API/ToastQueries.js";
import { useQuery } from "react-query";
import { useQueryClient } from "../../utils/ReactQueryProvider";
import {useState } from "react";


const RestaurantInfo = ({pageProps}) => {
    const iGuid = sessionStorage.getItem('guid');//since we aren't using much info. But, this could be handled by SSR?
    const queryClient = useQueryClient();
    const accessToken= queryClient.getQueryData('accessToken');
    const [guid, setGuid]= useState(iGuid?iGuid:null);//I shouldn't need this, but don't @ me...
    // console.log('heyy', guid)


    const { data, isLoading, error } = useQuery(['RxInfo', accessToken, guid], async () => {
      if (!accessToken || !guid) return;//todo: maybe add to an errors useState for 'validation errors'?
      return await getRxInfo(accessToken, guid);
    });

  // console.log(data)
 

    const handleClick = async (e) => {
        e.preventDefault();
        let input=document.getElementById('input-guid').value
        sessionStorage.setItem('guid',input);//needs to be set first,or else the doc reloads due to guid 'changing'.
        setGuid(input)
        queryClient.setQueryData('guid',guid)
        queryClient.invalidateQueries('guid')
        queryClient.invalidateQueries('RxInfo')
      
    }

    if(isLoading) return(<div>Loading...</div>)
    else if(error) return(<>error.message</>)
    else return (
      <div>
        <input id='input-guid' type='text'></input>
        <button onClick={handleClick}>Fetch Restaurant Info</button>
        {data && <div>
        <h3>{data.general?.name}</h3>
        <div>{data.location?.address1}{data.location?.address2?`, ${data.location?.address2}`:null}</div>
        <div>{data.location?.city}, {data.location?.stateCode}</div>
        <div>GUID: {data.guid}</div>
        
        </div>}
      </div>
    );
    
}

export default RestaurantInfo