import { logEvent } from "../../utils/logger"; // Assuming this path is correct

// Assume constructQueryString is defined elsewhere or imported if needed by getChecksForOrder/getPaymentsForCheck
// Example placeholder:
// const constructQueryString = (params) => {
//   if (!params || Object.keys(params).length === 0) return '';
//   return '?' + new URLSearchParams(params).toString();
// };

////////////////////////////////////////////////////////////////////////////////
// Orders API (orders)
////////////////////////////////////////////////////////////////////////////////

export async function getOrder(accessToken, restaurantGuid, orderGuid) { // Changed 'guid' to 'restaurantGuid' for clarity
    logEvent(`Getting order: ${orderGuid} for restaurant: ${restaurantGuid}...`);
    if (!restaurantGuid || !accessToken || !orderGuid) {
        console.warn("Missing restaurantGuid, accessToken, or orderGuid for getOrder");
        return null;
    }
    // Ensure your proxy or API base URL is correctly prepended to this path
    const url = `/api/orders/v2/orders/${orderGuid}`;
    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
                'Toast-Restaurant-External-Id': `${restaurantGuid}`
            }
        });
        if (!res.ok) {
            const errorText = await res.text();
            console.warn(`getOrder response not OK: ${res.status} ${errorText}`);
            logEvent(`Error fetching order ${orderGuid}: ${res.status} ${errorText}`);
            return null;
        }
        const data = await res.json();
        logEvent(`OK - Order ${orderGuid} fetched successfully.`);
        return data;
    } catch (error) {
        console.error(`Error in getOrder for ${orderGuid}:`, error);
        logEvent(`Exception in getOrder for ${orderGuid}: ${error.message}`);
        return null;
    }
}

/**
 * Fetches all checks associated with a specific order.
 * Note: The existence of a dedicated `/orders/{orderGuid}/checks` endpoint should be verified
 * against Toast API documentation. If it doesn't exist, checks should be retrieved
 * from the `checks` array within the full order object returned by `getOrder()`.
 * This function assumes such an endpoint might exist for a summarized list of checks.
 */
export async function getChecksForOrder(accessToken, restaurantGuid, orderGuid, queryParams = {}) {
    logEvent(`Getting checks for order: ${orderGuid} for restaurant: ${restaurantGuid}...`);
    if (!restaurantGuid || !accessToken || !orderGuid) {
        console.warn("Missing restaurantGuid, accessToken, or orderGuid for getChecksForOrder");
        return [];
    }
    // This endpoint path assumes Toast API provides a way to list checks under an order.
    // If not, you'd use getOrder(accessToken, restaurantGuid, orderGuid) and then return order.checks.
    const url = `/api/orders/v2/orders/${orderGuid}/checks${constructQueryString(queryParams)}`;
    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
                'Toast-Restaurant-External-Id': `${restaurantGuid}`
            }
        });
        if (!res.ok) {
            const errorText = await res.text();
            console.warn(`getChecksForOrder response not OK: ${res.status} ${errorText}`);
            logEvent(`Error fetching checks for order ${orderGuid}: ${res.status} ${errorText}`);
            return [];
        }
        const data = await res.json();
        logEvent(`OK - Checks for Order ${orderGuid} fetched successfully.`);
        return data;
    } catch (error) {
        console.error(`Error in getChecksForOrder for ${orderGuid}:`, error);
        logEvent(`Exception in getChecksForOrder for ${orderGuid}: ${error.message}`);
        return [];
    }
}

/**
 * Retrieves a specific check by first fetching its parent order and then finding the check within that order.
 */
export async function getCheck(accessToken, restaurantGuid, orderGuid, targetCheckGuid) {
    logEvent(`Attempting to get check: ${targetCheckGuid} from order: ${orderGuid} for restaurant: ${restaurantGuid}...`);
    if (!restaurantGuid || !accessToken || !orderGuid || !targetCheckGuid) {
        console.warn("Missing restaurantGuid, accessToken, orderGuid, or targetCheckGuid for getCheck");
        return null;
    }

    try {
        const orderData = await getOrder(accessToken, restaurantGuid, orderGuid);
        if (!orderData || !orderData.checks || !Array.isArray(orderData.checks)) {
            logEvent(`Order ${orderGuid} not found or has no checks array when searching for check ${targetCheckGuid}.`);
            return null;
        }

        const foundCheck = orderData.checks.find(check => check.guid === targetCheckGuid);

        if (foundCheck) {
            logEvent(`OK - Check ${targetCheckGuid} found within order ${orderGuid}.`);
            return foundCheck;
        } else {
            logEvent(`Check ${targetCheckGuid} not found within order ${orderGuid}.`);
            return null;
        }
    } catch (error) {
        // getOrder already logs its own errors, this would be for other potential issues.
        console.error(`Error in getCheck while processing order ${orderGuid} for check ${targetCheckGuid}:`, error);
        logEvent(`Exception in getCheck for ${targetCheckGuid} (order ${orderGuid}): ${error.message}`);
        return null;
    }
}

/**
 * Fetches payments for a specific check within a specific order.
 * Assumes the API path is /api/orders/v2/orders/{orderGuid}/checks/{checkGuid}/payments
 */
export async function getPaymentsForCheck(accessToken, restaurantGuid, orderGuid, checkGuid, queryParams = {}) {
    logEvent(`Getting payments for check: ${checkGuid} (order: ${orderGuid}) for restaurant: ${restaurantGuid}...`);
    if (!restaurantGuid || !accessToken || !orderGuid || !checkGuid) {
        console.warn("Missing restaurantGuid, accessToken, orderGuid, or checkGuid for getPaymentsForCheck");
        return [];
    }
    // This path structure is more consistent with how sub-resources are typically accessed.
    const url = `/api/orders/v2/orders/${orderGuid}/checks/${checkGuid}/payments${constructQueryString(queryParams)}`;
    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
                'Toast-Restaurant-External-Id': `${restaurantGuid}`
            }
        });
        if (!res.ok) {
            const errorText = await res.text();
            console.warn(`getPaymentsForCheck response not OK: ${res.status} ${errorText}`);
            logEvent(`Error fetching payments for check ${checkGuid} (order ${orderGuid}): ${res.status} ${errorText}`);
            return [];
        }
        const data = await res.json();
        logEvent(`OK - Payments for Check ${checkGuid} (order ${orderGuid}) fetched successfully.`);
        return data;
    } catch (error) {
        console.error(`Error in getPaymentsForCheck for check ${checkGuid} (order ${orderGuid}):`, error);
        logEvent(`Exception in getPaymentsForCheck for ${checkGuid} (order ${orderGuid}): ${error.message}`);
        return [];
    }
}

// TODO: Review and implement other functions like getPayment (for a specific payment),
// getSelectionsForCheck, getServiceChargesForCheck, getAppliedDiscountsForCheck
// ensuring their API paths and required parameters (like orderGuid, checkGuid) are correct
// based on Toast API documentation.
// For example:
// export async function getSelectionsForCheck(accessToken, restaurantGuid, orderGuid, checkGuid, queryParams = {}) { ... }
// Path might be: /api/orders/v2/orders/${orderGuid}/checks/${checkGuid}/selections