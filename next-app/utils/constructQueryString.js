export function constructQueryString(params) {
    if (!params || Object.keys(params).length === 0) {
        return '';
    }
    return '?' + Object.entries(params)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
}