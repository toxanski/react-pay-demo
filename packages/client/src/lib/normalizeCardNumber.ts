export function normalizeCardNumber(value: string): string {
    return (
        value
            .replace(/\s/g, '')
            .match(/.{1,4}/g)
            ?.join(' ')
            .substring(0, 19) || ''
    );
}
