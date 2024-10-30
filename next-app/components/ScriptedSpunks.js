// import { useQuery } from "@tanstack/react-query";
import {useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const ScriptedSplunks= ({pageProps, accessToken, guid}) => {
const [isOpen, setIsOpen] = useState(false); // Toggle state
const toggleLinks = () => setIsOpen(!isOpen); // Function to toggle the list


let queries=[
    {
        name:'DoorDash Errors',
        query:
        `https://toast.splunkcloud.com/en-US/app/search/search?earliest=-3d%40d&latest=now&q=search%20index%3Dprod_g2%20${guid}%20service%3Dorders%20client_id%3Dpartner-doordash%20className%3Dc.t.s.c.e.BaseExceptionMapper&display.page.search.mode=verbose&dispatch.sample_ratio=1&sid=1715720494.4907586_172D0435-119F-45AD-97C6-4D1C545CCED5`
    },
    {
        name:'Grubhub Errors',
        query:
        `https://toast.splunkcloud.com/en-US/app/search/search?earliest=-3d%40d&latest=now&q=search%20index%3Dprod_g2%20${guid}%20service%3Dorders%20client_id%3Dpartner-grubhub%20className%3Dc.t.s.c.e.BaseExceptionMapper&display.page.search.mode=verbose&dispatch.sample_ratio=1&sid=1715720521.4907669_172D0435-119F-45AD-97C6-4D1C545CCED5`
    },
    {
        name:'Uber Eats Errors',
        query:
        `https://toast.splunkcloud.com/en-US/app/search/search?earliest=-3d%40d&latest=now&q=search%20index%3Dprod_g2%20${guid}%20service%3Dorders%20client_id%3DZLwxqxmrSLeE5cRuWhcV1mH9Lti45lAB%20className%3Dc.t.s.c.e.BaseExceptionMapper&display.page.search.mode=verbose&dispatch.sample_ratio=1&sid=1715720543.4907691_172D0435-119F-45AD-97C6-4D1C545CCED5`
    },
    {
        name:'Loyalty Transactions',
        query:
        `https://toast.splunkcloud.com/en-US/app/search/search?earliest=-3d%40d&latest=now&q=search%20index%3Dprod_g2%20${guid}%20service%3Dcards%20endpoint%3D%2Fv2%2Floyalty*&display.page.search.mode=verbose&dispatch.sample_ratio=1&sid=1715720572.4907782_172D0435-119F-45AD-97C6-4D1C545CCED5`
    },
    {
        name:'Gift Card Transactions',
        query:
        `https://toast.splunkcloud.com/en-US/app/search/search?earliest=-3d%40d&latest=now&q=search%20index%3Dprod_g2%20${guid}%20service%3Dcards%20endpoint%3D%2Fv2%2Fstoredvalue*&display.page.search.mode=verbose&dispatch.sample_ratio=1&sid=1715720590.4907881_172D0435-119F-45AD-97C6-4D1C545CCED5`
    },
    {
        name:'Comp Card Transactions',
        query:
        `https://toast.splunkcloud.com/en-US/app/search/search?earliest=-3d%40d&latest=now&q=search%20index%3Dprod_g2%20${guid}%20service%3Dcards%20endpoint%3D%2Fv2%2Fcompcard*&display.page.search.mode=verbose&dispatch.sample_ratio=1&sid=1717448181.1913744_92010533-9A2F-4280-9278-38F3AA2914C3`
    },
    {
        name:'HPMS Transactions',
        query:
        `https://toast.splunkcloud.com/en-US/app/search/search?earliest=-3d%40d&latest=now&q=search%20index%3Dprod_g2%20${guid}%20service%3Dtender%20endpoint%3D%2Fv1%2Ftender*&display.page.search.mode=verbose&dispatch.sample_ratio=1&sid=1717605999.3593695_B6FE220A-FE80-4764-9C0A-698A56F99855`
    },
    {
        name:'Reservations Transactions',
        query:
        `https://toast.splunkcloud.com/en-US/app/search/search?earliest=-3d%40d&latest=now&q=search%20index%3Dprod_g2%20${guid}%20service%3Dorders%20className%3Dc.t.s.o.r.OrdersResource%20endpoint%3D*POST*&display.page.search.mode=verbose&dispatch.sample_ratio=1&sid=1717448418.1913803_92010533-9A2F-4280-9278-38F3AA2914C3`
    },
    {
        name:'Analytics Transactions',
        query:
        `https://toast.splunkcloud.com/en-US/app/search/search?earliest=-3d%40d&latest=now&q=search%20index%3Dprod_g2%20${guid}%20service%3Dorders%20className%3Dc.t.s.o.s.d.OrderService%20endpoint%3D*GET*&display.page.search.mode=verbose&dispatch.sample_ratio=1&sid=1717448846.1913885_92010533-9A2F-4280-9278-38F3AA2914C3`
    },
    {
        name:'Labor Transactions',
        query:
        `https://toast.splunkcloud.com/en-US/app/search/search?earliest=-3d%40d&latest=now&q=search%20index%3Dprod_g2%20${guid}%20service%3Dlabor%20endpoint%3D*%2Fv1%2Fshifts*%20OR%20endpoint%3D*%2Fv1%2Femployees*&display.page.search.mode=verbose&dispatch.sample_ratio=1&sid=1717449065.1913937_92010533-9A2F-4280-9278-38F3AA2914C3`
    },
    {
        name:'Resource: Types of Order Errors',
        query:`https://toasttab.atlassian.net/wiki/spaces/~6390bcb52acfad92d7b5b054/pages/3998318903/Orders+API+Errors`
    },
    {
        name:'Resource: Types of Loyalty Errors',
        query:`https://doc.toasttab.com/doc/devguide/apiLoyaltyErrorHandling.html`
    },
    {
        name:'Resource: Types of Gift Card Errors',
        query:`https://doc.toasttab.com/doc/devguide/apiGiftCardIntegrationWorkflow.html#apiGiftCardIntegrationResponseTypes`
    },
    {
        name:'Resource: Types of Comp Card Errors',
        query:`https://doc.toasttab.com/doc/devguide/apiGiftCardIntegrationWorkflow.html#apiGiftCardIntegrationResponseTypes`
    },
    {
        name:'Resource: Types of HPMS Errors',
        query:`https://doc.toasttab.com/doc/devguide/apiTenderProviderIntegrationsOverview.html#apiTenderErrorHandling`
    }
]

return (
    <div className="space-y-2">
        <div className="flex justify-between items-center">
            <div className="font-bold">Links to Helpful Splunks</div>
            <button onClick={toggleLinks}>
                <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
            </button>
        </div>
        {isOpen && guid && (
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
