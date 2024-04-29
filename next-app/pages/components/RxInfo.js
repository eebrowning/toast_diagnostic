import { getRxInfo } from "../../API/ToastQueries.js";
import { useQuery } from "react-query";
import { useQueryClient } from "../../utils/ReactQueryProvider";
import { useState } from "react";



///currently 'works', but having state issues. 
const RestaurantInfo = ({pageProps}) => {

    const queryClient = useQueryClient();
    const accessToken= queryClient.getQueryData('accessToken');
    const [guid, setGuid]= useState(null)
    // console.log('heyy', accessToken)

    const  { data, isLoading, error } = useQuery('RxInfo', async ()=> await getRxInfo(accessToken, guid));
  
  console.log(data)
    const handleClick = (e) => {
        e.preventDefault();
        queryClient.invalidateQueries('RxInfo');
        setGuid(document.getElementById('input-guid').value)
        console.log( guid, 'button')
    };
    
    return (
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