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