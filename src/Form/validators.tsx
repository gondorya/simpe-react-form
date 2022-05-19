export const is = (predicate: any, message: string) => (value?: string) => {
    if(!predicate(value)) {
        return message
    }
};

export const notBlank = (value: string) =>
    !!(value !== null && value !== undefined && String(value).trim().length);

export const validate = (value: string, ...validators: {(v?: string): string | undefined}[]) => {
    let result: string | undefined = "";
    let i = 0;
    while (result === "" && i < validators.length) {
        result = validators[i](value);
        i++;
        break
    }
    return result
}