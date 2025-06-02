export const toQueryParamString = (obj: Record<string, any>): string => {
    const params = new URLSearchParams();

    for (const key in obj) {
        const value = obj[key];
        if (Array.isArray(value)) {
            for (const v of value) {
                params.append(key, String(v));
            }
        } else if (value !== undefined && value !== null) {
            params.set(key, String(value));
        }
    }

    return params.toString();
}