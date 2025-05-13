
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

