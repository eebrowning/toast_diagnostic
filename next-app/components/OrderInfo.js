import { getDiningOptions, getRecentOrders } from "../API/ToastQueries.js";
import { useQuery } from "react-query";
import { useQueryClient } from "../utils/ReactQueryProvider.js";
import { useEffect, useState } from "react";


///currently 'works', but having state issues. 
const OrderInfo = ({pageProps, rxInfo}) => {
    const queryClient = useQueryClient();
    const accessToken= queryClient.getQueryData('accessToken');
    // const guid = sessionStorage.getItem('guid');//won't work w/chrome -< chrome storage? does it even need to persist?(yes)

    const ue= queryClient.getQueryData('ue');
    const dd= queryClient.getQueryData('dd');
    const gh= queryClient.getQueryData('gh');
    const [guid, setGuid] = useState(null);
    useEffect(() => {
      const iGuid = sessionStorage.getItem('guid');
      setGuid(iGuid ? iGuid : null);
    }, []);
    const updateOptionMap = (newMap) => {
        queryClient.setQueryData('optionMap', newMap);
      };

    const filterPartnerOrder=(partner)=>{
      let res= orders?.filter(order=>{
          //only want partner dining options...
          //for order -< if map[diningOptionGuid] includes 'grubhub' or 'uber eats' or 'doordash', allow.
          // console.log(map[order.diningOption?.guid]?.toLowerCase(),'lowercase')
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


    const { data:map, isLoading: mapIsLoading, error: mapError } = useQuery(['OrderInfo', accessToken, guid], async () => {
      if (!accessToken || !guid) return;//todo: maybe add to an errors useState for 'validation errors?
      return await getDiningOptions(accessToken, guid);
    },{
        onSuccess: updateOptionMap,
      });
    const { data:orders, isLoading: ordersIsLoading, error: ordersError } = useQuery(['Orders', accessToken, guid], async () => {
        if (!accessToken || !guid) return;//todo: maybe add to an errors useState for 'validation errors?
        filterPartnerOrder('door');//seems redundant: helps with some state issues
        filterPartnerOrder('grub');
        filterPartnerOrder('uber');
        return await getRecentOrders(accessToken, guid);
      });
    

    const handleClick = (e) => {
        e.preventDefault();
        queryClient.invalidateQueries(['OrderInfo', accessToken, guid]);
        queryClient.invalidateQueries(['Orders', accessToken, guid]);

        filterPartnerOrder('door');
        filterPartnerOrder('grub');
        filterPartnerOrder('uber');
        // console.log(ue,'wahhh')
        let partnerOrders= document.getElementById('partner-orders')
        if(partnerOrders) {partnerOrders.style.display=''}
    };


   
      const ddSearch= `https://www.google.com/search?q=site:doordash.com+${rxInfo?.location?.address1}`
      const ghSearch=`https://www.google.com/search?q=site:grubhub.com+${rxInfo?.location?.address1}`
      const ueSearch= `https://www.google.com/search?q=site:ubereats.com+${rxInfo?.location?.address1}`

      // partner logos 

      const partnerLogos = {
        DoorDash: "../assets/doordash_image.jpeg",
        Grubhub: "../assets/grubhub_image.png",
        UberEats: "../assets/ue-image.png"
    };
    
      


    if(ordersIsLoading) return(<div>Orders Loading...</div>)
    else if(ordersError) return(<>error.message</>)
    else 
    return (
      <div>
<div className="flex justify-between items-start">
    <div className="flex-1">
    <div className="py-2">
    {orders && <div>{orders.length} orders with source API in the last 2 days</div>}
    {dd && (
        <div>
            <img src={partnerLogos.DoorDash} alt="DoorDash logo" className="inline-block w-4 h-4 mr-2" />
            {dd.length} 
            <a href={ddSearch} className="text-blue-600 hover:text-blue-800 px-2" target="_blank">DoorDash</a> orders in the last 2 days
        </div>
    )}
    {gh && (
        <div>
            <img src={partnerLogos.Grubhub} alt="Grubhub logo" className="inline-block w-4 h-4 mr-2" />
            {gh.length} 
            <a href={ghSearch} className="text-blue-600 hover:text-blue-800 px-2" target="_blank">Grubhub</a> orders in the last 2 days
        </div>
    )}
    {ue && (
        <div>
            <img src={partnerLogos.UberEats} alt="Uber Eats logo" className="inline-block w-4 h-4 mr-2" />
            {ue.length} 
            <a href={ueSearch} className="text-blue-600 hover:text-blue-800 px-2" target="_blank">Uber Eats</a> orders in the last 2 days
        </div>
    )}
</div>

    </div>
    <button onClick={handleClick} className="transition duration-150 ease-in bg-blue-800 hover:bg-blue-950 text-white font-bold py-2 px-4 rounded-lg ">
        Show Partner Orders
    </button>
</div>
<div id="partner-orders" className="transition duration-500 ease-in-out transform scale-0">
    {/* Content of partner orders */}
</div>

      </div>
    );
    
}

export default OrderInfo