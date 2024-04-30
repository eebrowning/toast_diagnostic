//Baseline test for fetching to Toast API ->use these with React-Query!


//clientData->PostMan credentials > need to find out how to obtain programmatically from Toast.
//accessToken ->obtained by getAuth w/ clientData
// const [clientId,clientSecret, guid] = require("../keys");//put your own in an .env and it will pull from there-> see keys.js && dotenv package
//would need clientSecret and clientId provided by user



export const getAuth=async ()=>{
    const clientData = {
        "clientId": process.env.clientId,
        "clientSecret": process.env.clientSecret,
        "userAccessType": "TOAST_MACHINE_CLIENT"
    }

    let data= await fetch(`/api/authentication/v1/authentication/login`, {
        headers:{ 
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
        },
        method: 'POST',
        body: JSON.stringify(clientData)
    })
    //consider helper function to re-fresh token automatically, or just as a button for an app
    let token= await data.json();

    token= token.token;
    let axToken=token.accessToken;
    return axToken;

}



export function getRxInfo(accessToken, guid) {
   let url;
    if(guid){
         url = `/api/restaurants/v1/restaurants/${guid}`;

    }
    else{

         url = `/api/restaurants/v1/restaurants/${process.env.guid}`;
        // const url= `https://ws-api.toasttab.com/menus/v2/menus`;
        // const url= https://ws-api.toasttab.com/config/v2/diningOptions?pageToken=;
    }
    

    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'Toast-Restaurant-External-Id': `${guid}`

    };
    // const body = JSON.stringify({ guid: guid });
    return fetch(url, {
        method: 'GET',
        headers: headers
    })
    .then(response => {
        if (!response.ok) {
            console.log(response, 'res')
        }
        return response.json();
    })
    .then(data => {
        console.log('Data received:', data);
        // Process the data further as needed
        return data;
    })
}


export function getDiningOptions(accessToken, guid) {
    let url = `/api/config/v2/diningOptions?pageToken=`;
     

     const headers = {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${accessToken}`,
         'Toast-Restaurant-External-Id': `${guid}`
 
     };
     // const body = JSON.stringify({ guid: guid });
     return fetch(url, {
         method: 'GET',
         headers: headers
     })
     .then(response => {
         if (!response.ok) {
             console.log(response, 'res')
         }
         return response.json();
     })
     .then(data => {
        //  console.log('Dining Options received:', data);
        // Process the data further as needed
        let map={}; //optionGUID : optionName -> this format will allow us to just select by guid without needing effort front-end
        for( let obj of data){
            map[obj['guid']]=obj['name']
        }
         return map;
     })
 }



 export function getRecentOrders(accessToken, guid) {
 
    const today_ = new Date();
    const year = today_.getFullYear();
    const month = String(today_.getMonth() + 1).padStart(2, '0');
    const day = String(today_.getDate()).padStart(2, '0');

    const end = `${year}-${month}-${day}`;

    const twoday_= new Date(Date.now() - 2 * 24 * 3600 * 1000)
    const year2 = twoday_.getFullYear();
    const month2 = String(twoday_.getMonth() + 1).padStart(2, '0');
    const day2 = String(twoday_.getDate()).padStart(2, '0');

    const start= `${year2}-${month2}-${day2}`

    let url = `/api/orders/v2/ordersBulk?startDate=${start}T00:00:00.000-0000&endDate=${end}T23:00:00.000-0000`;


     const headers = {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${accessToken}`,
         'Toast-Restaurant-External-Id': `${guid}`
 
     };
     // const body = JSON.stringify({ guid: guid });
     return fetch(url, {
         method: 'GET',
         headers: headers
     })
     .then(response => {
         if (!response.ok) {
             console.log(response, 'res')
         }
         return response.json();
     })
     .then(data => {
         console.log('Order Data received:', data);
         // Process the data further as needed
         
        
        const apiOrders= data.filter(order=> order["source"]=="API");
         console.log(apiOrders,'still inside query')
         return apiOrders;



     })
 }
