export function normalizeCardDate(value: string): string {
    return (
        value
            .replace(/\//g, '')
            .match(/.{1,2}/g)
            ?.join('/')
            .substring(0, 5) || ''
    );
}