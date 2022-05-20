export const like = (pattern: RegExp) => (value: string) => pattern.test(value);

export const longerThan = (length: number) => (value: string) => !!value && value.length > length;
export const notLongerThan = (length: number) => (value: string) => !!value && value.length < length;
export const notBlank = () => (value: string) => !!(value !== null && value !== undefined && String(value).trim().length);
export const alphaNum = () => (value: string) => like(/^[a-z0-9]+$/i)(value) || !notBlank()(value);
export const ascii = () => (value: string) => like(/^[\x20-\x7F]+$/i)(value) || !notBlank()(value);

export const is = (predicate: (v: string) => boolean, message: string) => (value: string) => {
    if(!predicate(value)) {
        return message
    }

    return ""
};

export const validate = (value: string, ...validators: {(v: string): string}[]) => {
    let result: string = "";
    let i = 0;
    while (!result && i < validators.length) {
        result = validators[i](value);
        i++;
    }
    return result
}