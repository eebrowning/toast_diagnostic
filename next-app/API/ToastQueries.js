//todo: Eventually, these should all be in their own folder for the endpoint associated.

export async function getInventoryStatus(accessToken, guid, itemGuid) {//works
    //gets inventory status of passed item.
    // let itemBLT= 'bc7fda9f-d701-4add-b727-eb22a25c2156';
    console.log("Getting inventory...");
    const res = await fetch(
      `/api/stock/v1/inventory/search`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Toast-Restaurant-External-ID': `${guid}`,
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            "guids": [
              `${itemGuid}`
            ]
          })
      }
    );

    const data = await res.json();
    console.log(data);
    return res;
    // let itemCheck= await getInventoryStatus(accessToken,guid,itemGuid);
}

export async function getMenus(accessToken, guid) {//works
    console.log("Getting menus...");
    const res = await fetch(
      `/api/menus/v2/menus`,
      {
        method: 'GET',
        headers: {
          'Toast-Restaurant-External-ID': `${guid}`,
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    const data = await res.json();
    return res;
}

///////== Auth and Rx Info
export const getAuth = async () => {
    console.log("Authenticating...");
    try {
        const clientData = {
            "clientId": process.env.clientId,
            "clientSecret": process.env.clientSecret,
            "userAccessType": "TOAST_MACHINE_CLIENT"
        };

        let data = await fetch(`/api/authentication/v1/authentication/login`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(clientData)
        });

        //consider helper function to re-fresh token automatically, or just as a button for an app
        let token = await data.json();

        token = token.token;
        let axToken = token.accessToken;
        console.log("OK");
        return axToken;
    } catch (error) {
        console.error("Error in getAuth:", error);
        return [];
    }
};

export async function getRxInfo(accessToken, guid) {
    console.log("Getting restaurant info...");
    if (!accessToken || !guid) {
        console.warn("Missing accessToken or GUID for getRxInfo");
        return [];
    }
    const url = `/api/restaurants/v1/restaurants/${guid}`;
    console.log(url);

    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'Toast-Restaurant-External-Id': `${guid}`
    };

    return fetch(url, {
        method: 'GET',
        headers: headers
    })
    .then(response => {
        if (!response.ok) {
            console.warn(`Response not OK: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("OK");
        return data || [];
    });
}

/////////////
//Config
export function getDiningOptions(accessToken, guid) {
    console.log("Getting dining options...");
    if (!guid || !accessToken) {
        console.warn("Missing GUID or accessToken for getDiningOptions");
        return [];
    }
    const url = `/api/config/v2/diningOptions?pageToken=`;

    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'Toast-Restaurant-External-Id': `${guid}`
    };

    return fetch(url, {
        method: 'GET',
        headers: headers
    })
    .then(response => {
        if (!response.ok) {
            console.warn(`Response not OK: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        let map = {}; //optionGUID : optionName -> this format will allow us to just select by Dining Option guid without needing effort front-end
        for (let obj of data) {
            map[obj['guid']] = obj['name'];
        }
        return map;
    });
}

/////////////////
//Orders/
export async function fetchOrders(start, end, timeString, accessToken, guid) {//TODO: start and end should be related to business day start/end times - find them on API
    //would need to adjust for local time -> needs to adapt to users' time zones
    console.log("Doing the math...");
    if (!guid || !accessToken) {
        console.warn("Missing GUID or accessToken for fetchOrders");
        return [];
    }
    const pageSize = 100; 
    let page = 1;
    let orders = [];
    while (true) {
        const url = `/api/orders/v2/ordersBulk?startDate=${start}T03:00:00.000-0000&endDate=${end}T${timeString}-0000&page=${page}&pageSize=${pageSize}`;

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
            'Toast-Restaurant-External-Id': `${guid}`
        };

        const response = await fetch(url, {
            method: 'GET',
            headers: headers
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch orders. Status Code: ${response.status}`);
        }

        const data = await response.json();

        if (data.length === 0) {
            break;
        }

        orders.push(...data);

        if (data.length < pageSize) {
            break;
        }

        page++;
    }
    console.log("OK");
    return orders || [];
}

export function getRecentOrders(accessToken, guid, span = 3, week = 0) {//defaults to 'this week', 3 day span - made to be flexible for later
    console.log("Getting recent orders...");
    if (!guid || !accessToken) {
        console.warn("Missing GUID or accessToken for getRecentOrders");
        return [];
    }

    const today_ = new Date(Date.now() - (week * (7 * 24 * 3600 * 1000)));
    const year = today_.getFullYear();
    const month = String(today_.getMonth() + 1).padStart(2, '0');
    const day = String(today_.getDate()).padStart(2, '0');
    const hours = String(today_.getHours()).padStart(2, '0');
    const minutes = String(today_.getMinutes()).padStart(2, '0');
    const seconds = String(today_.getSeconds()).padStart(2, '0');
    const milliseconds = String(today_.getMilliseconds()).padStart(3, '0');
    
    const timeString = `${hours}:${minutes}:${seconds}.${milliseconds}`;
    const end = `${year}-${month}-${day}`;

    const daySpan = new Date(Date.now() - span * 24 * 3600 * 1000);
    const year2 = daySpan.getFullYear();
    const month2 = String(daySpan.getMonth() + 1).padStart(2, '0');
    const day2 = String(daySpan.getDate()).padStart(2, '0');

    const start = `${year2}-${month2}-${day2}`;

    const orderFetch = fetchOrders(start, end, timeString, accessToken, guid)
        .then(apiOrders => {
            return apiOrders.filter(order => order["source"] === "API");
        });

    return orderFetch || [];
}