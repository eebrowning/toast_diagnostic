import { getRxInfo } from "../API/ToastQueries.js";
import { useQuery } from "react-query";
import { useQueryClient } from "../utils/ReactQueryProvider.js";
import { useEffect, useState } from "react";
import OrderInfo from "./OrderInfo.js";
import ScriptedSplunks from "./ScriptedSpunks.js";

const RestaurantInfo = ({ pageProps, accessToken }) => {
   // const iGuid = sessionStorage.getItem('guid');//since we aren't using much info. But, this could be handled by SSR?
    const queryClient = useQueryClient();
     // const [guid, setGuid]= useState(iGuid?iGuid:null);//I shouldn't need this, but don't @ me...
    const [guid, setGuid] = useState(null);

    useEffect(() => {
        const iGuid = sessionStorage.getItem('guid');
        
        setGuid(iGuid ? iGuid : null);
    }, []);

    // to copy stuff to make it easeir 

    const handleCopyClickAddress = async () => {
      const textToCopy = `${data.location?.address1}${data.location?.address2 ? `, ${data.location?.address2}, ${data.location?.city}, ${data.location?.stateCode}` : ''}`;
      try {
          await navigator.clipboard.writeText(textToCopy);
          alert("Address copied to clipboard!"); // Or use a more subtle notification method
      } catch (err) {
          console.error("Failed to copy text: ", err);
          alert("Failed to copy text, check console for more details.");
      }
  };

// same thing but for GUID 

const handleCopyGUIDClick = async () => {
  const textToCopy = data.guid;
  try {
      await navigator.clipboard.writeText(textToCopy);
      alert("GUID copied to clipboard!"); // Provide user feedback
  } catch (err) {
      console.error("Failed to copy GUID: ", err);
      alert("Failed to copy GUID, check console for more details.");
  }
};

  

    const { data, isLoading, error } = useQuery(['RxInfo', accessToken, guid], async () => {
        if (!accessToken || !guid) return; //todo: maybe add to an errors useState for 'validation errors'?
        return await getRxInfo(accessToken, guid);
    });

    const handleClick = async (e) => {
        e.preventDefault();
        let input = document.getElementById('input-guid').value;
        sessionStorage.setItem('guid', input); //needs to be set first,or else the doc reloads due to guid 'changing'.
        setGuid(input);
        queryClient.invalidateQueries(['RxInfo', accessToken, guid]);
    };

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
                    <h3 className="text-xl font-semibold text-orange-500">{data.general?.name}</h3>
                    <p onClick={handleCopyClickAddress} role="button" tabIndex="0" style={{ cursor: 'pointer' }}>{data.location?.address1}{data.location?.address2 ? `, ${data.location?.address2}` : null}</p>
                    <p>{data.location?.city}, {data.location?.stateCode}</p>
                    <p className="mb-4" onClick={handleCopyGUIDClick} role="button" tabIndex="0" style={{ cursor: 'pointer' }}>GUID: {data.guid}</p>
                    <div className="space-y-4">
                        <div className="bg-gray-100 p-4 rounded-lg shadow">
                            <OrderInfo {...pageProps} rxInfo={data} />
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg shadow">
                            <ScriptedSplunks accessToken={accessToken} guid={guid} {...pageProps} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RestaurantInfo;
