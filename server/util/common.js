export const isAuthenticated = (req, res, next) => {
    if(req.user) {
        return next();
    } else {
        return res.sendStatus(504);
    }
}