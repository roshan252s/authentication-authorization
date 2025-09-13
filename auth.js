const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const Student = require('./models/student')




passport.use(new LocalStrategy(async (USERNAME, PASSWORD, done) => {
    try {
        const user = await Student.findOne({ username: USERNAME })
        if (!user) {
            return done(null, false, { message: 'Incorrect username' })
        }
        const isMatch = await user.comparePassword(PASSWORD)

        if (!isMatch) {
            return done(null, false, { message: 'Incorrect password' })
        }
        done(null, user)

    } catch (error) {
        done(error)
    }
}))


module.exports = passport