/**
 * Given an input string, if no schema etc is present,
 * [detected by seeing if :// is in the string]
 * prepends http:// to the front
 * @param url
 */
export function canonicalize(url) {
    if (!url.includes("://")) {
        return `http://${url}`;
    }
    return url;
}