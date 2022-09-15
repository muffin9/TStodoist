import passport from '../config/passport.js';

export const googleLogin = () => {
    passport.authenticate('google', { scope: ['profile', 'email'] });
}

export const googleLoginCallback = () => {
    passport.authenticate('google')
}

export const googleLogout = (req, res) => {
    req.logout();
    res.redirect("/");
}