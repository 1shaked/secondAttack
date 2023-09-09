import * as CryptoJS from 'crypto-js';


export function encrypt(data: string, key: string): string {
    const encrypted = CryptoJS.AES.encrypt(data, key);
    console.log(encrypted.toString(), key);
    return encrypted.toString();  // Returns the encrypted ciphertext
}

export function decryptCus(ciphertext: string, key: string): string {
    const bytes = CryptoJS.AES.decrypt(ciphertext, key);
    return bytes.toString(CryptoJS.enc.Utf8);  // Decrypts to original data
}