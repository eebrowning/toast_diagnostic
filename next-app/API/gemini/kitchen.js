
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