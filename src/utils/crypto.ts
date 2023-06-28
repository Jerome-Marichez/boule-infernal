import * as CryptoJS from 'crypto-js';

export function encryptData(text: string): string {
	const secretPass = process.env.REACT_APP_CRYPTO_KEY ?? "";
	return CryptoJS.AES.encrypt(text, secretPass).toString();
}

export function decryptData(text: string): string | false {
	try {
		const secretPass = process.env.REACT_APP_CRYPTO_KEY ?? "";
		const bytes = CryptoJS.AES.decrypt(text, secretPass);
		const data = bytes.toString(CryptoJS.enc.Utf8);
		return data;
	} catch (error) {
		return false;
	}
};
