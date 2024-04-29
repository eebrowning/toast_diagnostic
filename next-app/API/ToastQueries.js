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

// getAuth().then(()=>fetchDataWithToken(guid, axToken));
// fetchDataWithToken(guid, axToken);




/*
Need dining options! -> programmatically find the GH / DD / UE options via config:
https://ws-api.toasttab.com/config/v2/diningOptions?pageToken=

grab dining options, associate partner to diningoption guid 
state management -> reactquery? redux? we will need to have a way of storing/accessing orders post-pull.
*/

/*

*/