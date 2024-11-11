import { getRxInfo } from "../API/ToastQueries.js";
import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from "../utils/ReactQueryProvider.js";
import { useEffect, useState } from "react";
import AllOrderInfo from "./AllOrderInfo.js";
import ScriptedSplunks from "./ScriptedSpunks.js";

const RestaurantInfo = ({ pageProps, accessToken }) => {
    const queryClient = useQueryClient();
    const [guid, setGuid] = useState(null);

    useEffect(() => {
        const iGuid = sessionStorage.getItem('guid') || "d52aef0a-4e4d-415b-aa62-858618c5c1d0";
        
        setGuid(iGuid ? iGuid : null);
    }, []);

    const handleCopyClickAddress = async (e) => {
        e.preventDefault();
      const textToCopy =`${data.general?.name} ${data.general?.locationName ? data.general.locationName:''} \n${data.location?.address1}${data.location?.address2 ? `, ${data.location?.address2}, ${data.location?.city}, ${data.location?.stateCode}` : ''} \n${data.location?.city}, ${data.location?.stateCode} ${data.location?.zipCode}\nToast GUID: ${data.guid}`;
      try {
          await navigator.clipboard.writeText(textToCopy);
          let pop= document.getElementById('popup-address')
          pop.style.display=''
          setTimeout(() => {
              pop.style.display='none'
          }, 1600); 
      } catch (err) {
          console.error("Failed to copy text: ", err);
      }
    };

    const handleCopyGUIDClick = async () => {
    const textToCopy = data.guid;
    try {
        await navigator.clipboard.writeText(textToCopy);
        let pop= document.getElementById('popup-guid')
        pop.style.display=''
        setTimeout(() => {
            pop.style.display='none'
        }, 1600); 

    } catch (err) {
        console.error("Failed to copy GUID: ", err);
    }
    };


    const { data, isLoading, error } = useQuery({//todo: handle initial null guid 
        queryKey: ['RxInfo', guid],
        queryFn: async () => {
          if (!accessToken || !guid) {
            return [];
          }; //todo: maybe add to an errors useState for 'validation errors'?
          return await getRxInfo(accessToken, guid);
        },
        config: {
            staleTime: 3600000, // 1hr
          },
    });

    const handleClick = async (e) => {
        console.log("Fetch")
        e.preventDefault();
        let input = document.getElementById('input-guid').value;
        sessionStorage.setItem('guid', input); //needs to be set first,or else the doc reloads due to guid 'changing'.
        queryClient.removeQueries(['RxInfo', guid]);
        queryClient.removeQueries(['Orders', guid]);
        queryClient.removeQueries(['OrdersInfo', guid]);
        setGuid(input);
    };
    const handleOptToggle = async (e) => {
        e.preventDefault();
        let allOrders=document.getElementById('all-order-info')
        let threePioOrders = document.getElementById('order-info')

        const isAllOrdersVisible = allOrders.style.display !== 'none';

        if (isAllOrdersVisible) {
            allOrders.style.display = 'none';
            threePioOrders.style.display = 'block'; 
        } else {
            allOrders.style.display = 'block'; 
            threePioOrders.style.display = 'none';
        }
    };

    let intlCode=(code)=>{//fancy fun, works for chrome but not safari/firefox!
        let regionNames = new Intl.DisplayNames(['en'], {type: 'region'});
        return regionNames.of(code);
    }

    if (isLoading) return (<div className="text-center py-4">Loading Restaurant Info...</div>);
    else if (error) return (<div className="text-red-500 text-center py-4">Error loading information.</div>);
    else return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="flex gap-4 mb-4">
                <input id="input-guid" type="text" placeholder="Enter GUID" className="border border-gray-300 p-2 rounded-md flex-grow" />
                <button onClick={handleClick} className="transition duration-150 ease-in bg-blue-800 hover:bg-blue-950 text-white font-bold py-2 px-4 rounded-lg">
                    Fetch Restaurant
                </button>
            </div>
            {data && (
                <div className="bg-white shadow-md rounded-lg p-4">
                    <div id='rx-info'>
                        <p>{data.location?.address1 ? null: "ERROR: Please enter a valid GUID or refresh the page"}</p>
                        <h3 onClick={handleCopyClickAddress}  className='text-xl font-semibold text-orange-500 inline-block' role="button" tabIndex="0" style={{ cursor: 'pointer' }} >{data.general?.name} - {data.general?.locationName}</h3>
                        <p id='popup-address' className="inline-block bg-black text-gray-300 mx-1 px-1 rounded-sm" style={{display:"none"}}>Customer Info Copied!</p>
                        <p>{data.location?.address1}{data.location?.address2 ? `, ${data.location?.address2}` : null}</p>
                        <p>{data.location?.city}, {data.location?.stateCode} {data.location?.zipCode}</p>
                        <p>{data.location?.country?intlCode(data.location?.country):null}</p>
                        
                        <p className="inline-block mb-4" onClick={handleCopyGUIDClick} role="button" tabIndex="0" style={{ cursor: 'pointer' }}>GUID: {data.guid}</p>
                        <p id='popup-guid' className="inline-block bg-black text-gray-300 mx-1 px-1 rounded-sm" style={{display:"none"}}>GUID Copied!</p>
                    </div>
                    
                    <div className="space-y-4">
                        
        
                        <div className="bg-gray-100 p-4 rounded-lg shadow">
                            {/* <button onClick={handleOptToggle} className="transition duration-150 ease-in bg-blue-800 hover:bg-blue-950 text-white font-bold py-2 px-4 rounded-lg " id='orders-toggle'>Toggle Partners/Dining Options</button> */}
                            {/* <span id='order-info'><OrderInfo {...pageProps} rxInfo={data}  accessToken={accessToken} /></span> */}
                            <span id='all-order-info' style={{display: "block"}}><AllOrderInfo {...pageProps} rxInfo={data} accessToken={accessToken} /></span>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg shadow">
                            <ScriptedSplunks accessToken={accessToken} guid={guid} {...pageProps} />
                        </div>
                    </div>
                </div>
            )}
            {!data.location && (
                <div>
                </div>
            )}
        </div>
    );
    }

export default RestaurantInfo;
