import GoogleStrategy from "passport-google-oauth2";
import passport from "passport"
import { findUser, createUser } from '../controllers/userController.js';
import { createuuid } from "../util/uuid.js";

passport.use(
    new GoogleStrategy.Strategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_LOGIN_CALLBACK_URL,
        },
        async (request, accessToken, refreshToken, profile, done) => {
            const user = await findUser({
                provider: profile.provider,
                email: profile.email
            });

            if(!user) {
                const newUser = {
                    uuid: createuuid(),
                    nickname: profile.displayName,
                    email: profile.email,
                    avatarurl: profile.picture,
                    oauthProvider: profile.provider
                }
                await createUser(newUser);
                return done(null, newUser);
            }
            return done(null, user);
        })
)


// login이 최초로 성공했을 때만 호출되는 함수
passport.serializeUser((user, done) => {
    done(null, user);
});

// 사용자가 페이지를 방문할 때마다 호출되는 함수
passport.deserializeUser((user, done) => {
    done(null, user);
});

export default passport;