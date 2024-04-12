const developer = {
    CLIENT_ID: '405525693953-nev7rod0qb4bp0f4jifhgaeonf7cr6m3.apps.googleusercontent.com',
    REDIRECT_URI: 'http://localhost:6868/home',
    RESPONSE_TYPE: 'code',
    SCOPE: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
    ACCESS_TYPE: 'offline',
    PROMPT: 'consent',
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