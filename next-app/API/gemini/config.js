////////////////////////////////////////////////////////////////////////////////
// Configuration API (config)
// (You already have getDiningOptions)
////////////////////////////////////////////////////////////////////////////////

export async function getAppliedExternalDiscounts(accessToken, guid, queryParams = {}) {
    logEvent("Getting applied external discounts...");
    if (!guid || !accessToken) {
        console.warn("Missing GUID or accessToken for getAppliedExternalDiscounts");
        return [];
    }
    const url = `/api/config/v2/appliedExternalDiscounts${constructQueryString(queryParams)}`;
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
            console.warn(`getAppliedExternalDiscounts response not OK: ${res.status} ${await res.text()}`);
            return [];
        }
        const data = await res.json();
        logEvent("OK - Applied External Discounts");
        return data;
    } catch (error) {
        console.error("Error in getAppliedExternalDiscounts:", error);
        return [];
    }
}

export async function getDeliveryAreas(accessToken, guid) {
    logEvent("Getting delivery areas...");
    if (!guid || !accessToken) {
        console.warn("Missing GUID or accessToken for getDeliveryAreas");
        return [];
    }
    const url = `/api/config/v2/deliveryAreas`;
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
            console.warn(`getDeliveryAreas response not OK: ${res.status} ${await res.text()}`);
            return [];
        }
        const data = await res.json();
        logEvent("OK - Delivery Areas");
        return data;
    } catch (error) {
        console.error("Error in getDeliveryAreas:", error);
        return [];
    }
}

export async function getDiscountsConfig(accessToken, guid) { // Renamed to avoid confusion
    logEvent("Getting discounts configuration...");
    if (!guid || !accessToken) {
        console.warn("Missing GUID or accessToken for getDiscountsConfig");
        return [];
    }
    const url = `/api/config/v2/discounts`;
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
            console.warn(`getDiscountsConfig response not OK: ${res.status} ${await res.text()}`);
            return [];
        }
        const data = await res.json();
        logEvent("OK - Discounts Configuration");
        return data;
    } catch (error) {
        console.error("Error in getDiscountsConfig:", error);
        return [];
    }
}


export async function getRevenueCenters(accessToken, guid) {
    logEvent("Getting revenue centers...");
    if (!guid || !accessToken) {
        console.warn("Missing GUID or accessToken for getRevenueCenters");
        return [];
    }
    const url = `/api/config/v2/revenueCenters`;
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
            console.warn(`getRevenueCenters response not OK: ${res.status} ${await res.text()}`);
            return [];
        }
        const data = await res.json();
        logEvent("OK - Revenue Centers");
        return data;
    } catch (error) {
        console.error("Error in getRevenueCenters:", error);
        return [];
    }
}

export async function getServiceChargesConfig(accessToken, guid) {
    logEvent("Getting service charges configuration...");
    if (!guid || !accessToken) {
        console.warn("Missing GUID or accessToken for getServiceChargesConfig");
        return [];
    }
    const url = `/api/config/v2/serviceCharges`;
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
            console.warn(`getServiceChargesConfig response not OK: ${res.status} ${await res.text()}`);
            return [];
        }
        const data = await res.json();
        logEvent("OK - Service Charges Configuration");
        return data;
    } catch (error) {
        console.error("Error in getServiceChargesConfig:", error);
        return [];
    }
}

export async function getTaxRates(accessToken, guid) {
    logEvent("Getting tax rates...");
    if (!guid || !accessToken) {
        console.warn("Missing GUID or accessToken for getTaxRates");
        return [];
    }
    const url = `/api/config/v2/taxRates`;
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
            console.warn(`getTaxRates response not OK: ${res.status} ${await res.text()}`);
            return [];
        }
        const data = await res.json();
        logEvent("OK - Tax Rates");
        return data;
    } catch (error) {
        console.error("Error in getTaxRates:", error);
        return [];
    }
}

// Add other config endpoints like getJobTypes, getKitchenStations, getMenuItemTags, etc. in a similar fashion.
