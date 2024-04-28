//TODO DELETE

// import { getAuth } from "../../API/ToastQueries.js";
// import { useQuery } from "react-query";
// import { useQueryClient } from "../../utils/ReactQueryProvider";
// import { useEffect } from "react";



// const Authentication = () => {
//     const queryClient = useQueryClient();
// //just automatically obtains at the moment, we can adjust, but proving functionality ATM
//     const { data, isLoading, error } = useQuery('accessToken', getAuth, {
//         staleTime: 1000 * 60,
//       });


//     const handleClick = (e) => {
//         e.preventDefault();
//         // Manually trigger the query when the button is clicked
//         queryClient.invalidateQueries('accessToken');
//         // queryClient.invalidateQueries('RxInfo');

//         console.log(data)
//       };
    
//       return (
//         <div>
//           <button onClick={handleClick}>Update Auth Token</button>
//           {isLoading && <div>Loading...</div>}
//           {error && <div>Error: {error.message}</div>}
//         </div>
//       );
      
      
//       // return (
//           //     <div>
//           //     {data? "Auth received: stored in queryClient under 'accessToken'":"issue obtaining token"}
//           //     </div>
//           // )
// }
    
// export default Authentication