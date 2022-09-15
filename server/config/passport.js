import GoogleStrategy from "passport-google-oauth2";
import passport from "passport"

passport.use(
    new GoogleStrategy.Strategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/google/callback',
        },
        async (request, accessToken, refreshToken, profile, done) => {
            // find User id: profile.id
            // !user => create: email, username 
            // console.log(profile);
            const user = {
                id: profile.sub,
                username: 'muffin',
                googleId: profile.id,
            }
            return done(null, user);
        }
    )
)


// login이 최초로 성공했을 때만 호출되는 함수
// done(null, user.id)로 세션을 초기화 한다.
passport.serializeUser((user, done) => {
    done(null, user);
});

// 사용자가 페이지를 방문할 때마다 호출되는 함수
// done(null, id)로 사용자의 정보를 각 request의 user 변수에 넣어준다.
passport.deserializeUser((user, done) => {
    // find User
    // select user findby id
    done(null, user);
});

export default passport;