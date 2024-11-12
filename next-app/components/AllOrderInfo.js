import { getDiningOptions, getRecentOrders } from "../API/ToastQueries.js";
import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from "../utils/ReactQueryProvider.js";
import { useEffect, useState } from "react";
import { logEvent } from "../utils/logger.js";

//this should be incorporated into Order Info, or at the very least remove query update, and use existing query from OrderInfo - not that it would matter for the scale of this /shrug
const AllOrderInfo = ({ pageProps, rxInfo, accessToken }) => {
  const queryClient = useQueryClient();
  const [partnerQuantity, setPartnerQuantity] = useState({});

  const [guid, setGuid] = useState(null);
  useEffect(() => {
    const iGuid = sessionStorage.getItem("guid") || "d52aef0a-4e4d-415b-aa62-858618c5c1d0";
    setGuid(iGuid ? iGuid : null);
  }, []);

  const updateOptionMap = (newMap) => {
    queryClient.setQueryData("optionMap", newMap);
  };

  const filterAllPartnerOrder = (batch) => {
    //diningOptionGUID = order.diningOption.guid
    //map[diningOptionGUID] = cx's name for dining option.
    let obj ={};
    batch?.forEach((order) => {
      return !obj[map[order.diningOption?.guid]] ?  obj[map[order.diningOption?.guid]] = 1 : obj[map[order.diningOption?.guid]]+=1;
    });
    setPartnerQuantity(obj)
  };


  const {
    data: map,
    isLoading: mapIsLoading,
    error: mapError,
  } = useQuery({
    queryKey: ["OrderInfo", guid],
    queryFn: async () => {
      if (!accessToken || !guid) return []; //todo: maybe add to an errors useState for 'validation errors?
      let diningOps = await getDiningOptions(accessToken, guid);
      return diningOps;
    },
    onSuccess: updateOptionMap,
  });

  const {
    data: orders,
    isLoading: ordersIsLoading,
    error: ordersError,
  } = useQuery({
    queryKey: ["Orders", guid],
    queryFn: async () => {
      if (!accessToken || !guid) return; 

      return await getRecentOrders(accessToken, guid);
    },
  });

  const handleClick = (e) => {
    logEvent("Show/Hide")
    e.preventDefault();
    queryClient.getQueryData(["OrderInfo", guid]);

    filterAllPartnerOrder(orders);

    let partnerOrders = document.getElementById("all-partner-orders");
    if (partnerOrders.style.display === "none") {
      partnerOrders.style.display = "";
    } else if (partnerOrders.style.display === "") {
      partnerOrders.style.display = "none";
    }
  };



  if (ordersIsLoading) return <div>Orders Loading...</div>;
  else if (ordersError) return <>{ordersError.message}</>;
  else
    return (
      <div>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="py-2">
              {orders && (
                <div className="font-bold py-1">
                  {orders.length} Third-Party Orders Last 3 Days
                </div>
              )}
              <div  id="all-partner-orders" style={{ display: "none" }}>
                {Object.keys(partnerQuantity)
                .sort((a, b) => a.localeCompare(b)) // Sorts keys alphabetically
                .map((partner) => (
                  <div key={partner}>
                  {partner}: {partnerQuantity[partner]}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button
            onClick={handleClick}
            className="transition duration-150 ease-in bg-blue-800 hover:bg-blue-950 text-white font-bold py-2 px-4 rounded-lg "
          >
            Show/Hide Dining Options
          </button>
        </div>
      </div>
    );
};

export default AllOrderInfo;
