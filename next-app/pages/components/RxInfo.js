import { getRxInfo } from "../../API/ToastQueries.js";
import { useQuery } from "react-query";
import { useQueryClient } from "../../utils/ReactQueryProvider";
import { useEffect, useState } from "react";


///currently 'works', but having state issues. 
const RestaurantInfo = ({pageProps}) => {

    const queryClient = useQueryClient();
    const accessToken= queryClient.getQueryData('accessToken');
    console.log('heyy', accessToken)

    const  { data, isLoading, error } = useQuery('RxInfo', async ()=> await getRxInfo(accessToken));
  

    const handleClick = (e) => {
        e.preventDefault();
        queryClient.invalidateQueries('RxInfo');
    };
    
    return (
      <div>
        <button onClick={handleClick}>Fetch Restaurant Info</button>
        {data && <div>{data.general?.name}</div>}
      </div>
    );
    
}

export default RestaurantInfo