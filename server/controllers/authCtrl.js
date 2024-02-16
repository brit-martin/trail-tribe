import { User } from '../database/model.js'

export default {
    signUp: async (req, res) => {
        console.log('signup router')
        console.log(req.body)
        const { fname, lname, email, password } = req.body
        if (!fname || !lname || !email || !password ) {
            res.send("All fields are required to sign up");
            return;
        }
        const alreadyUser = await User.findOne({where: {email: email }})
        console.log(alreadyUser)
        if (!alreadyUser){
            let newUser = await User.create({
                fname: fname,
                lname: lname,
                email: email,
                password: password,
            });
         console.log(newUser)
            req.session.userId = newUser.id;
            res.send({
                message: "Sign up successful",
                newUser: newUser
            })
            
        } else {
            
            res.send("User already Exists")
        }
    },


    login: async (req, res) => {
        console.log('login router')
    },
    logout: async (req, res) => {
        console.log('logout router')
    },
    editUserInfo: async (req, res) => {
        console.log('user edit router')
    }
}