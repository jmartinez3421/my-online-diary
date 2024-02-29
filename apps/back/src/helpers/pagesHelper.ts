import CryptoJS from 'crypto-js';

export const cryptMessage = (message: string): string => {
    return CryptoJS.AES.encrypt(message, process.env.CRYPTO_KEY!).toString();
}

export const decryptMessage = (message: string): string => {
    const bytes = CryptoJS.AES.decrypt(message, process.env.CRYPTO_KEY!);
    return bytes.toString(CryptoJS.enc.Utf8);
}

export const isSameDay = (firstDate: Date, secondDate: Date) => {
    return firstDate.getFullYear() === secondDate.getFullYear() &&
        firstDate.getMonth() === secondDate.getMonth() &&
        firstDate.getDate() === secondDate.getDate();
}
