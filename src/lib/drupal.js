import { DrupalJsonApiParams } from 'drupal-jsonapi-params';

const DRUPAL_URL = 'http://192.168.0.163';

async function fetchFromDrupal(endpoint) {
    const res = await fetch(`${DRUPAL_URL}${endpoint}`);

    if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.statusText}`);
    }

    return res.json();
}

export async function getPageByTitle(title) {
    const apiParams = new DrupalJsonApiParams();
    apiParams.addFilter('title', title);

    const path = `/jsonapi/node/page?${apiParams.getQueryString()}`;
    const data = await fetchFromDrupal(path);
    return data.data[0];
}

export async function getInterestingLinks() {
    const apiParams = new DrupalJsonApiParams();

    apiParams
        .addFilter('status', '1')
        .addSort('created', 'DESC');

    const path = `/jsonapi/node/interesting_links?${apiParams.getQueryString()}`;

    return fetchFromDrupal(path);
}
