import CryptoJS from "react-native-crypto-js";


const JWT_SECRET = '+KbPdSgVkYp3s6v9y$B&E)H@McQfThWm';

export const jwtDecode = (txt) => {
    const cipher = CryptoJS.AES.decrypt(txt, CryptoJS.enc.Utf8.parse(JWT_SECRET), {
        iv: CryptoJS.enc.Utf8.parse(''),
        mode: CryptoJS.mode.CBC
    })
    const decryptedStr = CryptoJS.enc.Utf8.stringify(cipher)
    return decryptedStr.toString()
}

export const jwtEncode = (txt) => {
    const cipher = CryptoJS.AES.encrypt(txt, CryptoJS.enc.Utf8.parse(JWT_SECRET), {
        iv: CryptoJS.enc.Utf8.parse(''),
        mode: CryptoJS.mode.CBC
    })
    return cipher.toString()
}
