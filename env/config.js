const developer = {
    CLIENT_ID: '405525693953-nev7rod0qb4bp0f4jifhgaeonf7cr6m3.apps.googleusercontent.com',
    REDIRECT_URI: 'http://localhost:8686/api/auth/oauth/sign-in',
    RESPONSE_TYPE: 'code',
    scope: [
                    'https://www.googleapis.com/auth/userinfo.profile',
                    'https://www.googleapis.com/auth/userinfo.email'
                ].join(' '),
    ACCESS_TYPE: 'offline',
    PROMPT: 'consent',
    SERVICE: 'lso',
    O2V: 2,
    THEME: 'mn',
    DDM: 0,
    FLOWNAME: 'GeneralOAuthFlow',
    PORT: 6868
}
const production = {

}

const test = {
   

}

const configs = {
    DEV: developer,
    PRO: production,
    TEST: test
}

const getConfigObject = (env) => {
    return configs[env.toUpperCase()];
}

export default getConfigObject