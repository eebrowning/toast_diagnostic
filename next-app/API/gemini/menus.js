
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
