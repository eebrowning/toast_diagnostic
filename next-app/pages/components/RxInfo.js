import { getRxInfo } from "../../API/ToastQueries.js";
import { useQuery } from "react-query";
import { useQueryClient } from "../../utils/ReactQueryProvider";
import { useEffect } from "react";


///currently 'works', but having state issues. 
const RestaurantInfo = () => {
    const queryClient = useQueryClient();
    const accessToken=  queryClient.getQueryData('accessToken');
    // console.log('heyy', accessToken)

    useEffect(() => {
        if (accessToken) {
          queryClient.invalidateQueries('RxInfo');
          queryClient.prefetchQuery('RxInfo', () => getRxInfo(accessToken));
        }
      }, [accessToken, queryClient]);

    if(accessToken){

        const { data, isLoading, error } = useQuery('RxInfo', ()=>  getRxInfo(accessToken));
    
        const handleClick = (e) => {
            e.preventDefault();
            queryClient.invalidateQueries('RxInfo');
          };
        
          return (
            <div>
              <button onClick={handleClick}>Fetch Restaurant Info</button>
              {isLoading && <div>Loading...</div>}
              {error && <div>Error: {error.message}</div>}
              {data && <div>{data.general?.name}</div>}
            </div>
          );
}
else return <div>No Token</div>
    
}

export default RestaurantInfo