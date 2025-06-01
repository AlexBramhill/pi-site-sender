import { toQueryParamString } from "../helpers/to-query-params.js";
import type { PhotoQuery } from "../schemas/photo-query-schema.js";


export const get = async (photoPath: string, params: PhotoQuery): Promise<any> => {
    const query = toQueryParamString(params);

    // TODO: config out this hard coded port
    const response = await fetch(`http://photo:4000${photoPath}?${query}`, { method: 'GET' });

    if (!response.ok) {
        throw new Error(`Failed to fetch photo: ${response.statusText}`);
    }

    return response.arrayBuffer();
};
