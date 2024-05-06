import { useQuery } from "react-query";
import { useQueryClient } from "../../utils/ReactQueryProvider";
import {useEffect, useState } from "react";
import { getRxInfo } from "../../API/ToastQueries";



const ScriptedSplunks= ({pageProps, accessToken, guid}) => {
// const iGuid = sessionStorage.getItem('guid');//since we aren't using much info. But, this could be handled by SSR?
const queryClient = useQueryClient();
// const [guid, setGuid]= useState(iGuid?iGuid:null);//I shouldn't need this, but don't @ me...


const { data, isLoading, error } = useQuery(['RxInfo', accessToken, guid], async () => {
    if (!accessToken || !guid) return;//todo: maybe add to an errors useState for 'validation errors'?
    return await getRxInfo(accessToken, guid);
});
// console.log(data,'data in splunk')


    let queries=[
        {
            name:'Gift Card Transactions',
            query:
            `https://toast.splunkcloud.com/en-US/app/search/search?earliest=-48h%40h&latest=now&q=search%20index%3Dprod*%20${guid}%20%20%2Fstoredvalue&display.page.search.mode=verbose&dispatch.sample_ratio=1&sid=1714938668.3770202_172D0435-119F-45AD-97C6-4D1C545CCED5`
        },
        {
            name:'Loyalty Lookup and Transactions',
            query:
            `https://toast.splunkcloud.com/en-US/app/search/search?earliest=-48h%40h&latest=now&q=search%20index%3Dprod*%20${guid}%20%20%2Floyalty&display.page.search.mode=verbose&dispatch.sample_ratio=1&sid=1714938912.3770471_172D0435-119F-45AD-97C6-4D1C545CCED5`
        },
        {
            name:'Uber Eats errors',
            query:
            `https://toast.splunkcloud.com/en-US/app/search/search?earliest=-48h%40h&latest=now&q=search%20index%3Dprod_g2%20${guid}%20ZLwxqxmrSLeE5cRuWhcV1mH9Lti45lAB%20error&display.page.search.mode=verbose&dispatch.sample_ratio=1&sid=1714939140.3770683_172D0435-119F-45AD-97C6-4D1C545CCED5`
        },
        {
            name:'Grubhub errors',
            query:
            `https://toast.splunkcloud.com/en-US/app/search/search?earliest=-48h%40h&latest=now&q=search%20index%3Dprod_g2%20${guid}%20partner-grubhub%20error&display.page.search.mode=verbose&dispatch.sample_ratio=1&sid=1714939207.3770753_172D0435-119F-45AD-97C6-4D1C545CCED5`
        },
        {
            name:'DoorDash errors',
            query:
            `https://toast.splunkcloud.com/en-US/app/search/search?earliest=-48h%40h&latest=now&q=search%20index%3Dprod_g2%20${guid}%20partner-doordash%20error&display.page.search.mode=verbose&dispatch.sample_ratio=1&sid=1714939249.3770894_172D0435-119F-45AD-97C6-4D1C545CCED5`
        },
    ]



    if(isLoading) return(<div>Loading splunks Info...</div>)
    else if(error) return(<>error.message</>)
    else return (
      <div>
        <div>Links to Helpful Splunks</div>
       {data && <ul>
            {queries.map(query=>(
                <li key={query.name}><a style={{color:'blue'}} href={query.query} target="blank">{query.name}</a></li>
            ))}
        </ul>
        }
      </div>
    );
    
}

export default ScriptedSplunks