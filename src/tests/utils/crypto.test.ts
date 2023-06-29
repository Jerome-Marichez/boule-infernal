
import { encryptData, decryptData } from "../../utils/crypto";

describe("Crypto Utils should work as expected", () => {

	test("A text can be encrypted", () => {
		const test = "mypassword";

		const encrypt = encryptData(test);
		let canBeCrypt: boolean = false;
		if (encrypt !== test) canBeCrypt = true;
		expect(canBeCrypt).toBeTruthy();
	})

	test("A text can be decrypted", () => {
		const test = "mypassword2";

		const decrypt = decryptData(encryptData(test));
		expect(decrypt).toEqual(test);
	})
})