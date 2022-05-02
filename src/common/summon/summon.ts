// expected usage of the api
// summon.get.json<T of Json>(fetch_url)
// see the same pattern in the 7, 8, 9 make me realize i could use a common function to creat the object

import { extendedFetch, ExtendedInit } from "./extendedFetch";
import { feftchStream } from "./fetchStream";
import { take, toArray } from "rxjs/operators";
import { cehckNetworkErrors, debounceAsync, ignoreCanceled, mergeHeaders } from "./utils";

const ACCEPT_JSON = { Accept: "application/json" };
const ACCEPT_TEXT = { Accept: "text/plain" };
const ACCEPT_ANY = { Accept: "*/*" };

export interface SummonInit extends ExtendedInit {
    /** define a limit for a stream */
    limit?: number | false | undefined;
    /** each request in a given sequence will cancel the previous request in that sequence */
    sequence?: any;
}

export interface SummonFullInit extends SummonInit {
    url: string;
}

const initWithBody = (method: "POST" | "PUT" | "PATCH", defaults?: SummonInit) => (url: string, jsonBody: any, config?: SummonFullInit) => {
    return {
        ...defaults,
        method,
        url,
        jsonBody,
        ...config,
        header: mergeHeaders(config?.headers, defaults?.headers),
    };
};

const initWithoutBody = (method: "GET" | "DELETE", defaults?: SummonInit) => (url: string, config?: SummonFullInit) => {
    return {
        ...defaults,
        method,
        url,
        ...config,
        header: mergeHeaders(config?.headers, defaults?.headers),
    };
};
const responseIsNot = "Response is not";

const createSubMethods = <T extends (...args) => SummonFullInit>(initConstructor: T, sequenceMap: Map<any, AbortController>) => {

    const fetchJustFunction = (defaultHeaders: any, parseResponse: (response: Response) => any, args) => {

    }
    const fetcher = (defaultHeaders: any, parseResponse: (response: Response) => any) => (...args: Parameters<T>) => {
        const init = initConstructor(...args);
        init.headers = mergeHeaders(init.headers, defaultHeaders);

        const seqenceKey = init.sequence;
        let controller;
        if (seqenceKey) {
            // abort running request, creae new AbortController and inject into new request params
            if (sequenceMap.has(seqenceKey)) {
                sequenceMap.get(seqenceKey).abort();
            }
            controller = new AbortController();
            sequenceMap.set(seqenceKey, controller);
            init.signal = controller.signal;
        }

        let promise = extendedFetch(init).then(cehckNetworkErrors).then(parseResponse);
        if (seqenceKey) {
            // prevent canceled requests from rejecting
            promise = promise.catch(ignoreCanceled);
            // clear items fromm map to prevent memory link
            promise.finally(() => {
                if (sequenceMap.get(seqenceKey) === controller) sequenceMap.delete(seqenceKey);
            });
        }

        return promise;
    };

    return {
        something: 
        json: fetcher(ACCEPT_JSON, (res) =>
            res
                .json()
                .catch(() => {
                    throw TypeError(responseIsNot + " an object");
                })
                .then((json) => {
                    if (!json || typeof json !== "object") throw TypeError(responseIsNot + " an object");
                    return json;
                })
        ) as <U>(...args: Parameters<T>) => Promise<U>,
    };
};

/** create an instance of summon with defaults */
export const createSummonInstance = (defaults?: SummonInit) => {
    const sequenceMap = new Map<any, AbortController>();
    return {
        get: createSubMethods(initWithoutBody("GET", defaults), sequenceMap),
        delete: createSubMethods(initWithoutBody("DELETE", defaults), sequenceMap),
        post: createSubMethods(initWithBody("POST", defaults), sequenceMap),
        put: createSubMethods(initWithBody("PUT", defaults), sequenceMap),
        patch: createSubMethods(initWithBody("PATCH", defaults), sequenceMap),
    };
};

export const summon = createSummonInstance({ timeout: 3000 });
