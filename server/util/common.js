export const isAuthenticated = (req, res, next) => {
    if(process.env.NODE_ENV === 'development') {
        // req user local setting
        req.user = {
            email: process.env.LOCAL_EMAIL,
            nickName: process.env.LOCAL_NICKNAME,
            oauthProvider: process.env.LOCAL_OAUTH_PROVIDER,
            avatarurl: process.env.LOCAL_AVATAR_URL
        }
        return next();
    }
    if(req.user) {
        return next();
    } else {
        return res.redirect("/login");
    }

}