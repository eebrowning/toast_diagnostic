import { useQuery } from "react-query";
import { useQueryClient } from "../utils/ReactQueryProvider";
import {useEffect, useState } from "react";
import { getRxInfo } from "../API/ToastQueries";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const ScriptedSplunks= ({pageProps, accessToken, guid}) => {
// const iGuid = sessionStorage.getItem('guid');//since we aren't using much info. But, this could be handled by SSR?
const queryClient = useQueryClient();
// const [guid, setGuid]= useState(iGuid?iGuid:null);//I shouldn't need this, but don't @ me... 


const [isOpen, setIsOpen] = useState(false); // Toggle state


const { data, isLoading, error } = useQuery(['RxInfo', accessToken, guid], async () => {
    if (!accessToken || !guid) return;//todo: maybe add to an errors useState for 'validation errors'?
    return await getRxInfo(accessToken, guid);
});
// console.log(data,'data in splunk')

const toggleLinks = () => setIsOpen(!isOpen); // Function to toggle the list



let queries=[
    {
        name:'DoorDash errors',
        query:
        `https://toast.splunkcloud.com/en-US/app/search/search?earliest=-48h%40h&latest=now&q=search%20index%3Dprod_g2%20${guid}%20partner-doordash%20error&display.page.search.mode=verbose&dispatch.sample_ratio=1&sid=1714939249.3770894_172D0435-119F-45AD-97C6-4D1C545CCED5`
    },
    {
        name:'Grubhub errors',
        query:
        `https://toast.splunkcloud.com/en-US/app/search/search?earliest=-48h%40h&latest=now&q=search%20index%3Dprod_g2%20${guid}%20partner-grubhub%20error&display.page.search.mode=verbose&dispatch.sample_ratio=1&sid=1714939207.3770753_172D0435-119F-45AD-97C6-4D1C545CCED5`
    },
    {
        name:'Uber Eats errors',
        query:
        `https://toast.splunkcloud.com/en-US/app/search/search?earliest=-48h%40h&latest=now&q=search%20index%3Dprod_g2%20${guid}%20ZLwxqxmrSLeE5cRuWhcV1mH9Lti45lAB%20error&display.page.search.mode=verbose&dispatch.sample_ratio=1&sid=1714939140.3770683_172D0435-119F-45AD-97C6-4D1C545CCED5`
    },
    {
        name:'Loyalty Transactions',
        query:
        `https://toast.splunkcloud.com/en-US/app/search/search?earliest=-48h%40h&latest=now&q=search%20index%3Dprod*%20${guid}%20%20%2Floyalty&display.page.search.mode=verbose&dispatch.sample_ratio=1&sid=1714938912.3770471_172D0435-119F-45AD-97C6-4D1C545CCED5`
    },
    {
        name:'Gift Card Transactions',
        query:
        `https://toast.splunkcloud.com/en-US/app/search/search?earliest=-48h%40h&latest=now&q=search%20index%3Dprod*%20${guid}%20%20%2Fstoredvalue&display.page.search.mode=verbose&dispatch.sample_ratio=1&sid=1714938668.3770202_172D0435-119F-45AD-97C6-4D1C545CCED5`
    },
    {
        name:'Resource: Types of Order Errors',
        query:`https://toasttab.atlassian.net/wiki/spaces/~6390bcb52acfad92d7b5b054/pages/3998318903/Orders+API+Errors`
    }
]



    if(isLoading) return(<div>Loading splunks Info...</div>)
    else if(error) return(<>error.message</>)
    else return (
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <div className="font-bold">Links to Helpful Splunks</div>
                <button onClick={toggleLinks}>
                    <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
                </button>
            </div>
            {isOpen && data && (
                <ul className="transition-all ease-in-out duration-100">
                    {queries.map(query => (
                        <li key={query.name}>
                            <a href={query.query} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                                {query.name}
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
    
}

export default ScriptedSplunks