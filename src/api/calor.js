function responseHandler(response) {
    return response.json()
}

function getJson(url) {
    return fetch(url)
        .then(responseHandler);
}


export function discover(calorUrl) {
    const discoveryUrl = `${calorUrl}/discovery`;
    return getJson(discoveryUrl);
}

export function latestReading(calorUrl, thermometerName) {
    const thermUrl = `${calorUrl}/latest/${thermometerName}`;
    return getJson(thermUrl);
}

/**
 * Assumes start time and end time are Date objects
 * @param calorUrl the url of the calor server
 * @param thermometerName the name of the thermometer
 * @param startTime the date object denoting the start. Optional
 *  if undefined, will default to begining of unix time
 * @param endTime the date object denoting the end, Optional
 *  if undefined will default to latest reading available
 */
export function readingsBetween(calorUrl, thermometerName, startTime, endTime) {
    const urlString = `${calorUrl}/between/${thermometerName}`;
    const url = new URL(urlString);
    if (startTime) {
        const unixStart = Math.floor(startTime.getTime() / 1000);
        url.searchParams.set('start', unixStart.toString(10));
    }
    if (endTime) {
        const unixEnd = Math.ceil(endTime.getTime() / 1000);
        url.searchParams.set('end', unixEnd.toString(10));
    }
    return getJson(url);
}