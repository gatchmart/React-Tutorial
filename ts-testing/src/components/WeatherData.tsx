// To parse this data:
//
//   import { Convert, WeatherData } from "./file";
//
//   const weatherData = Convert.toWeatherData(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface WeatherData {
    request: Request;
    location: Location;
    current: Current;
}

export interface Current {
    observation_time: string;
    temperature: number;
    weather_code: number;
    weather_icons: string[];
    weather_descriptions: string[];
    wind_speed: number;
    wind_degree: number;
    wind_dir: string;
    pressure: number;
    precip: number;
    humidity: number;
    cloudcover: number;
    feelslike: number;
    uv_index: number;
    visibility: number;
    is_day: string;
}

export interface Location {
    name: string;
    country: string;
    region: string;
    lat: string;
    lon: string;
    timezone_id: string;
    localtime: string;
    localtime_epoch: number;
    utc_offset: string;
}

export interface Request {
    type: string;
    query: string;
    language: string;
    unit: string;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toWeatherData(json: string): WeatherData {
        return cast(JSON.parse(json), r("WeatherData"));
    }

    public static weatherDataToJson(value: WeatherData): string {
        return JSON.stringify(uncast(value, r("WeatherData")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any = ''): never {
    if (key) {
        throw Error(`Invalid value for key "${key}". Expected type ${JSON.stringify(typ)} but got ${JSON.stringify(val)}`);
    }
    throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`,);
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) { }
        }
        return invalidValue(typs, val);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases, val);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue("array", val);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue("Date", val);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue("object", val);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, prop.key);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val);
    }
    if (typ === false) return invalidValue(typ, val);
    while (typeof typ === "object" && typ.ref !== undefined) {
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems") ? transformArray(typ.arrayItems, val)
                : typ.hasOwnProperty("props") ? transformObject(getProps(typ), typ.additional, val)
                    : invalidValue(typ, val);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "WeatherData": o([
        { json: "request", js: "request", typ: r("Request") },
        { json: "location", js: "location", typ: r("Location") },
        { json: "current", js: "current", typ: r("Current") },
    ], false),
    "Current": o([
        { json: "observation_time", js: "observation_time", typ: "" },
        { json: "temperature", js: "temperature", typ: 0 },
        { json: "weather_code", js: "weather_code", typ: 0 },
        { json: "weather_icons", js: "weather_icons", typ: a("") },
        { json: "weather_descriptions", js: "weather_descriptions", typ: a("") },
        { json: "wind_speed", js: "wind_speed", typ: 0 },
        { json: "wind_degree", js: "wind_degree", typ: 0 },
        { json: "wind_dir", js: "wind_dir", typ: "" },
        { json: "pressure", js: "pressure", typ: 0 },
        { json: "precip", js: "precip", typ: 0 },
        { json: "humidity", js: "humidity", typ: 0 },
        { json: "cloudcover", js: "cloudcover", typ: 0 },
        { json: "feelslike", js: "feelslike", typ: 0 },
        { json: "uv_index", js: "uv_index", typ: 0 },
        { json: "visibility", js: "visibility", typ: 0 },
        { json: "is_day", js: "is_day", typ: "" },
    ], false),
    "Location": o([
        { json: "name", js: "name", typ: "" },
        { json: "country", js: "country", typ: "" },
        { json: "region", js: "region", typ: "" },
        { json: "lat", js: "lat", typ: "" },
        { json: "lon", js: "lon", typ: "" },
        { json: "timezone_id", js: "timezone_id", typ: "" },
        { json: "localtime", js: "localtime", typ: "" },
        { json: "localtime_epoch", js: "localtime_epoch", typ: 0 },
        { json: "utc_offset", js: "utc_offset", typ: "" },
    ], false),
    "Request": o([
        { json: "type", js: "type", typ: "" },
        { json: "query", js: "query", typ: "" },
        { json: "language", js: "language", typ: "" },
        { json: "unit", js: "unit", typ: "" },
    ], false),
};
