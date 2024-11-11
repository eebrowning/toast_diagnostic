import { useQuery } from "@tanstack/react-query";
import RestaurantInfo from "../components/RxInfo.js";
import { getAuth } from "../API/ToastQueries";
import { useQueryClient } from "../utils/ReactQueryProvider";

const IndexPage = ({pageProps}) => {
  const queryClient = useQueryClient();

//   const { data: accessToken } = useQuery('accessToken', getAuth, {
//     staleTime: 3600000,//1hr
//   });
  const { data: accessToken } = useQuery({
    queryKey: ['accessToken'],
    queryFn: getAuth,
    config: {
      staleTime: 3600000, // 1hr
    },
  });

  const handleClick = async (e) => {
    e.preventDefault();
    let id=document.getElementById('input-id').value
    let secret=document.getElementById('input-secret').value
    queryClient.invalidateQueries(['accessToken'])

  }

  return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl text-center font-bold mb-4 text-slate-700">Toast Integrations Diagnostic Tool</h1>
            {accessToken ? (
                <RestaurantInfo accessToken={accessToken} {...pageProps} />
            ) : (
                <div className="text-center py-4">Loading...</div>
            )}
        </div>

  );
};

export default IndexPage;
