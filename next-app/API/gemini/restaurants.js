
////////////////////////////////////////////////////////////////////////////////
// Restaurants API (restaurants)
// (You already have getRxInfo)
////////////////////////////////////////////////////////////////////////////////

export async function getRestaurantServices(accessToken, guid) {
    logEvent("Getting restaurant services...");
    if (!guid || !accessToken) {
        console.warn("Missing GUID or accessToken for getRestaurantServices");
        return [];
    }
    const url = `/api/restaurants/v1/restaurants/${guid}/servicesAvailable`; // Path may vary slightly based on exact API spec, e.g. /services
     try {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
                'Toast-Restaurant-External-Id': `${guid}`
            }
        });
        if (!res.ok) {
            console.warn(`getRestaurantServices response not OK: ${res.status} ${await res.text()}`);
            return [];
        }
        const data = await res.json();
        logEvent("OK - Restaurant Services");
        return data;
    } catch (error) {
        console.error("Error in getRestaurantServices:", error);
        return [];
    }
}

export async function getRestaurantHours(accessToken, guid) {
    logEvent("Getting restaurant hours...");
    if (!guid || !accessToken) {
        console.warn("Missing GUID or accessToken for getRestaurantHours");
        return [];
    }
    const url = `/api/restaurants/v1/restaurants/${guid}/hours`;
    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
                'Toast-Restaurant-External-Id': `${guid}`
            }
        });
        if (!res.ok) {
            console.warn(`getRestaurantHours response not OK: ${res.status} ${await res.text()}`);
            return [];
        }
        const data = await res.json();
        logEvent("OK - Restaurant Hours");
        return data;
    } catch (error) {
        console.error("Error in getRestaurantHours:", error);
        return [];
    }
}

export async function getRestaurantTimeZone(accessToken, guid) {
    logEvent("Getting restaurant time zone...");
    if (!guid || !accessToken) {
        console.warn("Missing GUID or accessToken for getRestaurantTimeZone");
        return null;
    }
    const url = `/api/restaurants/v1/restaurants/${guid}/timeZone`;
     try {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
                'Toast-Restaurant-External-Id': `${guid}`
            }
        });
        if (!res.ok) {
            console.warn(`getRestaurantTimeZone response not OK: ${res.status} ${await res.text()}`);
            return null;
        }
        const data = await res.json();
        logEvent("OK - Restaurant Time Zone");
        return data;
    } catch (error) {
        console.error("Error in getRestaurantTimeZone:", error);
        return null;
    }
}
