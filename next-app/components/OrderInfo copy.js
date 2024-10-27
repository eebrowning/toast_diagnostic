import { getDiningOptions, getRecentOrders } from "../API/ToastQueries.js";
import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from "../utils/ReactQueryProvider.js";
import { useEffect, useState } from "react";

//this copy should be the stage to merge allorder and orderinfo
const OrderInfo = ({pageProps, rxInfo,accessToken}) => {
    const queryClient = useQueryClient();
    // const accessToken= queryClient.getQueryData(['accessToken']);
    const [ue, setUE] = useState(queryClient.getQueryData('ue'));
    const [dd, setDD] = useState(queryClient.getQueryData('dd'));
    const [gh, setGH] = useState(queryClient.getQueryData('gh'));


    const [guid, setGuid] = useState(null);
    useEffect(() => {
      const iGuid = sessionStorage.getItem('guid');
      setGuid(iGuid ? iGuid : null);
    }, []);

    const updateOptionMap = (newMap) => {
        queryClient.setQueryData('optionMap', newMap);
      };

    const filterPartnerOrder=(partner, batch)=>{
        let res= batch?.filter(order=>{
            //only want partner dining options...
            //for order -< if map[diningOptionGuid] includes 'grubhub' or 'uber eats' or 'doordash', allow.
            // console.log(map[order.diningOption?.guid]?.toLowerCase(),'lowercase')
            if( map[order.diningOption?.guid]?.toLowerCase().includes(`${partner}`)){
            return order;
            }
        })

        if(partner=='door') setDD(res); 
        if(partner=='grub') setGH(res);
        if(partner=='uber') setUE(res);
      }
  
    
    const { data: map, isLoading: mapIsLoading, error: mapError } = useQuery({
      queryKey: ['OrderInfo',guid],
      queryFn: async () => {

        if (!accessToken || !guid) return []; //todo: maybe add to an errors useState for 'validation errors?
        return await getDiningOptions(accessToken, guid);
      },
      onSuccess: updateOptionMap,
    });
    
    const { data: orders, isLoading: ordersIsLoading, error: ordersError } = useQuery({
      queryKey: ['Orders',guid],
      queryFn: async () => {

        if (!accessToken || !guid) return; //todo: maybe add to an errors useState for 'validation errors?
        // filterPartnerOrder('door'); //seems redundant: helps with some state issues
        // filterPartnerOrder('grub');
        // filterPartnerOrder('uber');
        return await getRecentOrders(accessToken, guid);
      },
    });
    

    const handleClick = (e) => {
        e.preventDefault();
        queryClient.getQueryData(['OrderInfo',guid]);
        
        filterPartnerOrder('door',orders);
        filterPartnerOrder('grub',orders);
        filterPartnerOrder('uber',orders);

        let partnerOrders= document.getElementById('partner-orders')
        if(partnerOrders.style.display==='none') {partnerOrders.style.display=''}
        else if(partnerOrders.style.display==='') {partnerOrders.style.display='none'}
    };

    //All of this could be an object.
    //search strings
    const ddSearch= `https://www.google.com/search?q=site:doordash.com+${rxInfo?.location?.address1}+${rxInfo?.location?.zipCode}`
    const ghSearch=`https://www.google.com/search?q=site:grubhub.com+${rxInfo?.location?.address1}+${rxInfo?.location?.zipCode}`
    const ueSearch= `https://www.google.com/search?q=site:ubereats.com+${rxInfo?.location?.address1}+${rxInfo?.location?.zipCode}`
    // partner logos 
    const partnerLogos = {
      DoorDash: "../assets/doordash_image.jpeg",
      Grubhub: "../assets/grubhub_image.png",
      UberEats: "../assets/ue-image.png"
    };
    ////////////////////////////////
      
    if(ordersIsLoading) return(<div>Orders Loading...</div>)
    else if(ordersError) return(<>{ordersError.message}</>)
    else 
    return (
      <div>
        <div className="flex justify-between items-start">
            <div className="flex-1">
            <div className="py-2">
            {orders && <div className="font-bold py-1">{orders.length} Third Party Orders Last 3 Days</div>}
            <div id='partner-orders' style={{display:"none"}}>
              {(
                  <div>
                      <img src={partnerLogos.DoorDash} alt="DoorDash logo" className="inline-block w-4 h-4 mr-2" />
                      {dd?.length} 
                      <a href={ddSearch} className="text-blue-600 hover:text-blue-800 px-2" target="_blank">DoorDash</a> orders in the last 3 days
                  </div>
              )}
              { (
                  <div>
                      <img src={partnerLogos.Grubhub} alt="Grubhub logo" className="inline-block w-4 h-4 mr-2" />
                      {gh?.length} 
                      <a href={ghSearch} className="text-blue-600 hover:text-blue-800 px-2" target="_blank">Grubhub</a> orders in the last 3 days
                  </div>
              )}
              {(
                  <div>
                      <img src={partnerLogos.UberEats} alt="Uber Eats logo" className="inline-block w-4 h-4 mr-2" />
                      {ue?.length} 
                      <a href={ueSearch} className="text-blue-600 hover:text-blue-800 px-2" target="_blank">Uber Eats</a> orders in the last 3 days
                  </div>
              )}
            </div>
        </div>

        </div>
            <button onClick={handleClick} className="transition duration-150 ease-in bg-blue-800 hover:bg-blue-950 text-white font-bold py-2 px-4 rounded-lg ">
                Show DD/UE/GH Orders
            </button>
        </div>

      </div>
    );
      
}

export default OrderInfo