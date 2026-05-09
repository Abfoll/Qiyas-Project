import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { userList } from "../utils/userList.js";

//step 2 make serialize
passport.serializeUser((user, done) => {
    console.log("Serializing user:", user);
    done(null, user.id);
});

//step 3 make deserialize
passport.deserializeUser((id, done) => {
    console.log("Deserializing user with id:", id);
    const user = userList.find(u => u.id === id);
    if (user) {
        console.log("User found during deserialization:", user);
    }
    done(null, user);
});

//step-one
export default passport.use(
    new LocalStrategy((username, password, done) => {
        console.log(`Username: ${username}, Password: ${password}`);
        
        try {
            // Find user by username
            const user = userList.find(u => u.username === username);
            
            // Check if user exists
            if (!user) {
                console.log(`User ${username} not found`);
                return done(null, false, { message: "Incorrect username" });
            }
            
            // Check if password matches
            // Note: In production, use bcrypt.compare() for hashed passwords
            if (user.password !== password) {
                console.log(`Invalid password for ${username}`);
                return done(null, false, { message: "Incorrect password" });
            }
            
            // Success - return user object
            console.log(`User ${username} authenticated successfully`);
            return done(null, user);
            
        } catch (error) {
            console.error("Authentication error:", error);
            return done(error);
        }
    })
);
