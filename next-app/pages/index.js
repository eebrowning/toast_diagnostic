import {useQuery } from "react-query";
import RestaurantInfo from "../components/RxInfo.js";
import { getAuth } from "../API/ToastQueries";
import { useQueryClient } from "../utils/ReactQueryProvider";
import OrderInfo from "../components/OrderInfo.js"



const IndexPage = ({pageProps}) => {
  const queryClient = useQueryClient();

  const { data: accessToken } = useQuery('accessToken', getAuth, {
    staleTime: 3600000,//1hr
  });


  const handleClick = async (e) => {
    e.preventDefault();
    let id=document.getElementById('input-id').value
    let secret=document.getElementById('input-secret').value
    sessionStorage.setItem('clientId',id)
    sessionStorage.setItem('clientSecret',secret)
    queryClient.invalidateQueries('accessToken')

  }

  return (
<div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl text-center font-bold mb-4 text-slate-700">Toast Integrations Diagnostic Tool</h1>
            {!accessToken && (
                <div>
                    <div id="user-creds" className="bg-white shadow-md rounded-lg p-4">
                        <div className="mb-4">
                            <label htmlFor="input-id" className="block text-sm font-medium text-gray-700">ClientId</label>
                            <input id="input-id" type="text" className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="input-secret" className="block text-sm font-medium text-gray-700">ClientSecret</label>
                            <input id="input-secret" type="text" className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
                        </div>
                        <div className="flex justify-center mx-8 my-8">
                            <button onClick={handleClick} className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded">
                                Submit Credentials
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {accessToken ? (
                <RestaurantInfo accessToken={accessToken} {...pageProps} />
            ) : (
                <div className="text-center py-4">Loading...</div>
            )}
        </div>

  );
};

export default IndexPage;
