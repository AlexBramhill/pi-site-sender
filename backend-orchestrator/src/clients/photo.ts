import { toQueryParamString } from "../helpers/to-query-params.js";
import { PhotoQuery } from "../schemas/photo-query-schema.js";


export const get = async (photoPath: string, params: PhotoQuery): Promise<any> => {
    const query = toQueryParamString(params);

    const response = await fetch(`http://photo:4000${photoPath}?${query}`, { method: 'GET' });

    if (!response.ok) {
        throw new Error(`Failed to fetch photo: ${response.statusText}`);
    }

    const data = await response.arrayBuffer();
    return data;
};
