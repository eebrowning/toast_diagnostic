// utils/logger.js (assumed to exist from your import)
// export function logEvent(message) { console.log(message); }
// export function logDateRange(start, end) { console.log(`Date Range: ${start} to ${end}`); }

// Helper function to construct query strings from an object
function constructQueryString(params) {
    if (!params || Object.keys(params).length === 0) {
        return '';
    }
    return '?' + Object.entries(params)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
}

// Your existing functions would go here (getAuth, getRxInfo, getInventoryStatus, getMenus, getDiningOptions, fetchOrders, getRecentOrders)
// ...

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

////////////////////////////////////////////////////////////////////////////////
// Labor API (labor)
////////////////////////////////////////////////////////////////////////////////

export async function getEmployees(accessToken, guid, queryParams = {}) {
    logEvent("Getting employees...");
    if (!guid || !accessToken) {
        console.warn("Missing GUID or accessToken for getEmployees");
        return [];
    }
    // Note: Accessing full PII requires specific 'labor.employees:read:pii' scope,
    // otherwise, use 'labor.employees:read' for non-PII fields.
    // The API behavior might differ based on granted scopes.
    const url = `/api/labor/v1/employees${constructQueryString(queryParams)}`;
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
            console.warn(`getEmployees response not OK: ${res.status} ${await res.text()}`);
            return [];
        }
        const data = await res.json();
        logEvent("OK - Employees");
        return data;
    } catch (error) {
        console.error("Error in getEmployees:", error);
        return [];
    }
}

export async function getEmployee(accessToken, guid, employeeGuid) {
    logEvent(`Getting employee: ${employeeGuid}...`);
    if (!guid || !accessToken || !employeeGuid) {
        console.warn("Missing GUID, accessToken, or employeeGuid for getEmployee");
        return null;
    }
    const url = `/api/labor/v1/employees/${employeeGuid}`;
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
            console.warn(`getEmployee response not OK: ${res.status} ${await res.text()}`);
            return null;
        }
        const data = await res.json();
        logEvent("OK - Employee");
        return data;
    } catch (error) {
        console.error("Error in getEmployee:", error);
        return null;
    }
}

export async function getShifts(accessToken, guid, queryParams = {}) {
    logEvent("Getting shifts...");
    if (!guid || !accessToken) {
        console.warn("Missing GUID or accessToken for getShifts");
        return [];
    }
    // queryParams can include businessDate, startDate & endDate (for modifiedDate), employeeGuid, jobGuid, etc.
    const url = `/api/labor/v1/shifts${constructQueryString(queryParams)}`;
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
            console.warn(`getShifts response not OK: ${res.status} ${await res.text()}`);
            return [];
        }
        const data = await res.json();
        logEvent("OK - Shifts");
        return data;
    } catch (error) {
        console.error("Error in getShifts:", error);
        return [];
    }
}

export async function getShift(accessToken, guid, shiftGuid) {
    logEvent(`Getting shift: ${shiftGuid}...`);
    if (!guid || !accessToken || !shiftGuid) {
        console.warn("Missing GUID, accessToken, or shiftGuid for getShift");
        return null;
    }
    const url = `/api/labor/v1/shifts/${shiftGuid}`;
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
            console.warn(`getShift response not OK: ${res.status} ${await res.text()}`);
            return null;
        }
        const data = await res.json();
        logEvent("OK - Shift");
        return data;
    } catch (error) {
        console.error("Error in getShift:", error);
        return null;
    }
}

export async function getTimeEntries(accessToken, guid, queryParams = {}) {
    logEvent("Getting time entries...");
    if (!guid || !accessToken) {
        console.warn("Missing GUID or accessToken for getTimeEntries");
        return [];
    }
    // queryParams can include shiftGuid, employeeGuid, startDate, endDate, etc.
    const url = `/api/labor/v1/timeEntries${constructQueryString(queryParams)}`;
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
            console.warn(`getTimeEntries response not OK: ${res.status} ${await res.text()}`);
            return [];
        }
        const data = await res.json();
        logEvent("OK - Time Entries");
        return data;
    } catch (error) {
        console.error("Error in getTimeEntries:", error);
        return [];
    }
}

// Add getJobs, getJob, getTimeEntry, getBreaksForTimeEntry similarly.

////////////////////////////////////////////////////////////////////////////////
// Menus API (menus)
// (You already have getMenus for v2)
////////////////////////////////////////////////////////////////////////////////

export async function getMenuV2(accessToken, guid, menuGuid) {
    logEvent(`Getting menu (v2): ${menuGuid}...`);
    if (!guid || !accessToken || !menuGuid) {
        console.warn("Missing GUID, accessToken, or menuGuid for getMenuV2");
        return null;
    }
    const url = `/api/menus/v2/menus/${menuGuid}`;
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
            console.warn(`getMenuV2 response not OK: ${res.status} ${await res.text()}`);
            return null;
        }
        const data = await res.json();
        logEvent("OK - Menu (v2)");
        return data;
    } catch (error) {
        console.error("Error in getMenuV2:", error);
        return null;
    }
}

export async function getMenusMetadataV2(accessToken, guid) {
    logEvent("Getting menus metadata (v2)...");
    if (!guid || !accessToken) {
        console.warn("Missing GUID or accessToken for getMenusMetadataV2");
        return null;
    }
    const url = `/api/menus/v2/metadata`;
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
            console.warn(`getMenusMetadataV2 response not OK: ${res.status} ${await res.text()}`);
            return null;
        }
        const data = await res.json();
        logEvent("OK - Menus Metadata (v2)");
        return data;
    } catch (error) {
        console.error("Error in getMenusMetadataV2:", error);
        return null;
    }
}

// Note: Menus API v3 often requires a different scope (e.g., 'menus.channel:read')
export async function getMenusV3(accessToken, guid, queryParams = {}) {
    logEvent("Getting menus (v3)...");
    if (!guid || !accessToken) {
        console.warn("Missing GUID or accessToken for getMenusV3");
        return [];
    }
    const url = `/api/menus/v3/menus${constructQueryString(queryParams)}`;
    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
                'Toast-Restaurant-External-Id': `${guid}`
                // Potentially different/additional headers for v3 if specified in docs
            }
        });
        if (!res.ok) {
            console.warn(`getMenusV3 response not OK: ${res.status} ${await res.text()}`);
            return [];
        }
        const data = await res.json();
        logEvent("OK - Menus (v3)");
        return data;
    } catch (error) {
        console.error("Error in getMenusV3:", error);
        return [];
    }
}


////////////////////////////////////////////////////////////////////////////////
// Orders API (orders)
// (You already have fetchOrders for ordersBulk)
////////////////////////////////////////////////////////////////////////////////

export async function getOrder(accessToken, guid, orderGuid) {
    logEvent(`Getting order: ${orderGuid}...`);
    if (!guid || !accessToken || !orderGuid) {
        console.warn("Missing GUID, accessToken, or orderGuid for getOrder");
        return null;
    }
    const url = `/api/orders/v2/orders/${orderGuid}`;
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
            console.warn(`getOrder response not OK: ${res.status} ${await res.text()}`);
            return null;
        }
        const data = await res.json();
        logEvent("OK - Order");
        return data;
    } catch (error) {
        console.error("Error in getOrder:", error);
        return null;
    }
}

export async function getChecksForOrder(accessToken, guid, orderGuid, queryParams = {}) {
    logEvent(`Getting checks for order: ${orderGuid}...`);
    if (!guid || !accessToken || !orderGuid) {
        console.warn("Missing GUID, accessToken, or orderGuid for getChecksForOrder");
        return [];
    }
    const url = `/api/orders/v2/orders/${orderGuid}/checks${constructQueryString(queryParams)}`;
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
            console.warn(`getChecksForOrder response not OK: ${res.status} ${await res.text()}`);
            return [];
        }
        const data = await res.json();
        logEvent("OK - Checks for Order");
        return data;
    } catch (error) {
        console.error("Error in getChecksForOrder:", error);
        return [];
    }
}

export async function getCheck(accessToken, guid, checkGuid) {
    logEvent(`Getting check: ${checkGuid}...`);
    if (!guid || !accessToken || !checkGuid) {
        console.warn("Missing GUID, accessToken, or checkGuid for getCheck");
        return null;
    }
    const url = `/api/orders/v2/checks/${checkGuid}`;
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
            console.warn(`getCheck response not OK: ${res.status} ${await res.text()}`);
            return null;
        }
        const data = await res.json();
        logEvent("OK - Check");
        return data;
    } catch (error) {
        console.error("Error in getCheck:", error);
        return null;
    }
}

export async function getPaymentsForCheck(accessToken, guid, checkGuid, queryParams = {}) {
    logEvent(`Getting payments for check: ${checkGuid}...`);
     if (!guid || !accessToken || !checkGuid) {
        console.warn("Missing GUID, accessToken, or checkGuid for getPaymentsForCheck");
        return [];
    }
    const url = `/api/orders/v2/checks/${checkGuid}/payments${constructQueryString(queryParams)}`;
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
            console.warn(`getPaymentsForCheck response not OK: ${res.status} ${await res.text()}`);
            return [];
        }
        const data = await res.json();
        logEvent("OK - Payments for Check");
        return data;
    } catch (error) {
        console.error("Error in getPaymentsForCheck:", error);
        return [];
    }
}


// Add getPayment, getSelectionsForCheck, getServiceChargesForCheck, getAppliedDiscountsForCheck similarly.


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

////////////////////////////////////////////////////////////////////////////////
// Cash Management API (cashmgmt)
////////////////////////////////////////////////////////////////////////////////
export async function getCashEntries(accessToken, guid, queryParams = {}) {
    logEvent("Getting cash entries...");
    if (!guid || !accessToken) {
        console.warn("Missing GUID or accessToken for getCashEntries");
        return [];
    }
    // queryParams can include businessDate, startDate, endDate, cashDrawerGuid, entryType, etc.
    const url = `/api/cashmgmt/v1/entries${constructQueryString(queryParams)}`;
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
            console.warn(`getCashEntries response not OK: ${res.status} ${await res.text()}`);
            return [];
        }
        const data = await res.json();
        logEvent("OK - Cash Entries");
        return data;
    } catch (error) {
        console.error("Error in getCashEntries:", error);
        return [];
    }
}

export async function getCashDrawers(accessToken, guid) {
    logEvent("Getting cash drawers...");
    if (!guid || !accessToken) {
        console.warn("Missing GUID or accessToken for getCashDrawers");
        return [];
    }
    const url = `/api/cashmgmt/v1/drawers`;
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
            console.warn(`getCashDrawers response not OK: ${res.status} ${await res.text()}`);
            return [];
        }
        const data = await res.json();
        logEvent("OK - Cash Drawers");
        return data;
    } catch (error) {
        console.error("Error in getCashDrawers:", error);
        return [];
    }
}


////////////////////////////////////////////////////////////////////////////////
// Kitchen API (kitchen)
////////////////////////////////////////////////////////////////////////////////
export async function getKitchenDisplayTickets(accessToken, guid, queryParams = {}) {
    logEvent("Getting kitchen display tickets...");
    if (!guid || !accessToken) {
        console.warn("Missing GUID or accessToken for getKitchenDisplayTickets");
        return [];
    }
    // queryParams can include prepStationGuid, state (OPEN, FULFILLED), etc.
    const url = `/api/kitchen/v1/displayTickets${constructQueryString(queryParams)}`;
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
            console.warn(`getKitchenDisplayTickets response not OK: ${res.status} ${await res.text()}`);
            return [];
        }
        const data = await res.json();
        logEvent("OK - Kitchen Display Tickets");
        return data;
    } catch (error) {
        console.error("Error in getKitchenDisplayTickets:", error);
        return [];
    }
}

////////////////////////////////////////////////////////////////////////////////
// Webhooks API (webhooks)
////////////////////////////////////////////////////////////////////////////////
export async function getWebhookSubscriptions(accessToken, guid) {
    logEvent("Getting webhook subscriptions...");
    // Note: Webhook subscriptions might be managed at a partner level rather than restaurant-specific GUID in all cases.
    // The 'guid' here would be for the Toast-Restaurant-External-Id if required by the specific endpoint.
    // Some webhook management endpoints might not require the restaurant GUID but operate on the partner credentials.
    // Consult the specific webhook API documentation. This is a general structure.
    if (!accessToken) { // guid might be optional depending on the endpoint
        console.warn("Missing accessToken for getWebhookSubscriptions");
        return [];
    }
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`
    };
    if (guid) { // Add restaurant GUID if applicable for the endpoint
        headers['Toast-Restaurant-External-Id'] = `${guid}`;
    }

    const url = `/api/webhook/v1/subscriptions`; // Endpoint path might vary

    try {
        const res = await fetch(url, { method: 'GET', headers: headers });
        if (!res.ok) {
            console.warn(`getWebhookSubscriptions response not OK: ${res.status} ${await res.text()}`);
            return [];
        }
        const data = await res.json();
        logEvent("OK - Webhook Subscriptions");
        return data;
    } catch (error) {
        console.error("Error in getWebhookSubscriptions:", error);
        return [];
    }
}