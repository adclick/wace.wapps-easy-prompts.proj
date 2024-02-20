export enum Size {
    xs = 'xs',
    sm = 'sm',
    md = 'md',
    lg = 'lg',
    xl = 'xl'
};

export enum Variant {
    filled = 'filled',
    subtle = 'subtle',
    transparent = 'transparent'
}

const KEY = 999999999;

export function encrypt(value: number) {
    const encryptedValue = value ^ KEY;

    return btoa(encryptedValue.toString());
}

export function decrypt(encryptedValue: string) {
    if (encryptedValue === null) return "";

    try {
        const decryptedValue = atob(encryptedValue);

        return (parseInt(decryptedValue, 10) ^ KEY).toString();
    } catch(e) {
        return "";
    }
}