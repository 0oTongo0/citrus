const TokenKey = 'X-Token'
export function getToken() {
    return localStorage.getItem(TokenKey)
}

export function setToken(token) {
    return Cookies.setItem(TokenKey, token)
}

export function removeToken() {
    return Cookies.removeItem(TokenKey)
}