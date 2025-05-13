import { getOrder, getCheck } from "../API/gemini/orders.js"; // Assuming these are correctly implemented
// Removed getDiningOptions and getRecentOrders as they are no longer used in this simplified version
import { useQuery } from "@tanstack/react-query";
// useQueryClient is not actively used in this simplified version but kept in imports if needed later
import { useQueryClient } from "../utils/ReactQueryProvider.js";
import { useEffect, useState } from "react";
import { logEvent } from "../utils/logger.js";

const SearchOrder = ({ pageProps, rxInfo, accessToken }) => {
  // queryClient is initialized but not used in this simplified version.
  // const queryClient = useQueryClient();

  // State for restaurant GUID
  const [restaurantGuid, setRestaurantGuid] = useState(null);

  // State for search functionality
  const [orderGuidInput, setOrderGuidInput] = useState(""); // For standalone order search
  const [checkGuidInput, setCheckGuidInput] = useState("");   // For check search (target check)
  const [orderGuidForCheckSearchInput, setOrderGuidForCheckSearchInput] = useState(""); // Order GUID when searching for a check

  const [searchOrderGuid, setSearchOrderGuid] = useState(null); // GUID to trigger order search
  const [searchCheckParams, setSearchCheckParams] = useState(null); // { orderGuid, checkGuid } to trigger check search

  useEffect(() => {
    const iGuid = sessionStorage.getItem("guid"); // Using 'guid' as per your session storage key
    setRestaurantGuid(iGuid ? iGuid : null);
    logEvent(`Restaurant GUID set to: ${iGuid} (from sessionStorage key 'guid')`);
  }, []);

  // Query for fetching a specific order by GUID
  const {
    data: searchedOrderData,
    isLoading: searchedOrderIsLoading,
    error: searchedOrderError,
    isFetching: searchedOrderIsFetching,
  } = useQuery({
    queryKey: ["specificOrder", searchOrderGuid, restaurantGuid, accessToken],
    queryFn: async () => {
      if (!searchOrderGuid || !accessToken || !restaurantGuid) {
        logEvent("Skipping specific order fetch: Missing searchOrderGuid, accessToken, or restaurantGuid");
        return null;
      }
      logEvent(`Workspaceing specific order: ${searchOrderGuid} for restaurant: ${restaurantGuid}`); // Corrected typo
      return await getOrder(accessToken, restaurantGuid, searchOrderGuid);
    },
    enabled: !!searchOrderGuid && !!accessToken && !!restaurantGuid,
    retry: 1,
  });

  // Query for fetching a specific check by its GUID and its parent Order GUID
  const {
    data: searchedCheckData,
    isLoading: searchedCheckIsLoading,
    error: searchedCheckError,
    isFetching: searchedCheckIsFetching,
  } = useQuery({
    // queryKey includes both GUIDs from searchCheckParams
    queryKey: ["specificCheck", searchCheckParams?.orderGuid, searchCheckParams?.checkGuid, restaurantGuid, accessToken],
    queryFn: async () => {
      if (!searchCheckParams || !searchCheckParams.orderGuid || !searchCheckParams.checkGuid || !accessToken || !restaurantGuid) {
        logEvent("Skipping specific check fetch: Missing params, accessToken, or restaurantGuid");
        return null;
      }
      logEvent(`Workspaceing specific check: ${searchCheckParams.checkGuid} from order: ${searchCheckParams.orderGuid} for restaurant: ${restaurantGuid}`); // Corrected typo
      // Assuming getCheck is updated to: getCheck(accessToken, restaurantGuid, orderGuid, targetCheckGuid)
      return await getCheck(accessToken, restaurantGuid, searchCheckParams.orderGuid, searchCheckParams.checkGuid);
    },
    enabled: !!searchCheckParams && !!searchCheckParams.orderGuid && !!searchCheckParams.checkGuid && !!accessToken && !!restaurantGuid,
    retry: 1,
  });

  const handleOrderGuidSearch = (e) => {
    e.preventDefault();
    if (orderGuidInput.trim()) {
      logEvent(`Initiating search for order GUID: ${orderGuidInput.trim()}`);
      setSearchOrderGuid(orderGuidInput.trim());
      // REMOVED redundant imperative call: getOrder(accessToken, restaurantGuid, orderGuidInput.trim())
      setSearchCheckParams(null); // Clear other search type
    } else {
      logEvent("Order GUID input is empty, search not initiated.");
    }
  };

  const handleCheckGuidSearch = (e) => {
    e.preventDefault();
    const orderGuidForCheck = orderGuidForCheckSearchInput.trim();
    const targetCheckGuid = checkGuidInput.trim();

    if (orderGuidForCheck && targetCheckGuid) {
      logEvent(`Initiating search for check GUID: ${targetCheckGuid} within order GUID: ${orderGuidForCheck}`);
      setSearchCheckParams({ orderGuid: orderGuidForCheck, checkGuid: targetCheckGuid });
      setSearchOrderGuid(null); // Clear other search type
    } else {
      logEvent("Order GUID for check search or Check GUID input is empty, search not initiated.");
    }
  };

  return (
    <div className="p-4 space-y-6">
      {!accessToken && <div className="text-red-500 font-bold">Access Token is missing. API calls will fail.</div>}
      {!restaurantGuid && <div className="text-red-500 font-bold">Restaurant GUID is missing (did not load from session storage 'guid'). API calls will fail.</div>}

      <div className="p-4 border rounded-lg shadow space-y-4">
        <h2 className="text-xl font-semibold">Search Specific Order</h2>
        <form onSubmit={handleOrderGuidSearch} className="flex items-center space-x-2">
          <input
            type="text"
            value={orderGuidInput}
            onChange={(e) => setOrderGuidInput(e.target.value)}
            placeholder="Enter Order GUID"
            className="border p-2 rounded-md flex-grow focus:ring-blue-500 focus:border-blue-500"
            aria-label="Order GUID"
          />
          <button
            type="submit"
            className="transition duration-150 ease-in bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
            disabled={!orderGuidInput.trim() || searchedOrderIsFetching || !restaurantGuid || !accessToken }
          >
            {searchedOrderIsFetching ? "Searching..." : "Search Order"}
          </button>
        </form>

        {/* Display Searched Order Data */}
        {searchOrderGuid && (
          <div className="mt-4 p-2 border-t">
            <h3 className="font-semibold">Searched Order Details (GUID: {searchOrderGuid}):</h3>
            {searchedOrderIsLoading && <div>Loading order data...</div>}
            {searchedOrderError && <div className="text-red-500">Error fetching order: {searchedOrderError.message}</div>}
            {searchedOrderData && (
              <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
                {JSON.stringify(searchedOrderData, null, 2)}
              </pre>
            )}
            {!searchedOrderData && !searchedOrderIsLoading && !searchedOrderError && <div>No data found for this Order GUID, or search conditions not met.</div>}
          </div>
        )}
      </div>

      <div className="p-4 border rounded-lg shadow space-y-4 mt-6">
        <h2 className="text-xl font-semibold">Search Specific Check (within an Order)</h2>
        <form onSubmit={handleCheckGuidSearch} className="space-y-3">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={orderGuidForCheckSearchInput}
              onChange={(e) => setOrderGuidForCheckSearchInput(e.target.value)}
              placeholder="Enter Order GUID (for the check)"
              className="border p-2 rounded-md flex-grow focus:ring-blue-500 focus:border-blue-500"
              aria-label="Order GUID for Check Search"
            />
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={checkGuidInput}
              onChange={(e) => setCheckGuidInput(e.target.value)}
              placeholder="Enter Check GUID (target)"
              className="border p-2 rounded-md flex-grow focus:ring-blue-500 focus:border-blue-500"
              aria-label="Check GUID"
            />
          </div>
          <button
            type="submit"
            className="transition duration-150 ease-in bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
            disabled={!orderGuidForCheckSearchInput.trim() || !checkGuidInput.trim() || searchedCheckIsFetching || !restaurantGuid || !accessToken}
          >
            {searchedCheckIsFetching ? "Searching..." : "Search Check"}
          </button>
        </form>

        {/* Display Searched Check Data */}
        {searchCheckParams && searchCheckParams.checkGuid && (
          <div className="mt-4 p-2 border-t">
            <h3 className="font-semibold">Searched Check Details (GUID: {searchCheckParams.checkGuid} from Order: {searchCheckParams.orderGuid}):</h3>
            {searchedCheckIsLoading && <div>Loading check data...</div>}
            {searchedCheckError && <div className="text-red-500">Error fetching check: {searchedCheckError.message}</div>}
            {searchedCheckData && (
              <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
                {JSON.stringify(searchedCheckData, null, 2)}
              </pre>
            )}
            {!searchedCheckData && !searchedCheckIsLoading && !searchedCheckError && <div>No data found for this Check GUID, or search conditions not met.</div>}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchOrder;