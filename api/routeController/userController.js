const bcrypt = require('bcrypt')
const genRes = require('../services/genre')
const userModel = require('../models/user')
const jwt = require('../services/jwtservice')

exports.userSingUp = async (req, res) => {
    try {

        const { name, email, password } = req.body;
        const saltRounds = 10

        const findUser = await userModel.findOne({ email: email })
        if (findUser) {
            return res.send(genRes.generateResponse(false, 'Email is Already SingedUp', 400, null))
        } else {
            bcrypt.genSalt(saltRounds, function (err, salt) {

                bcrypt.hash(password, salt, async function (err, hash) {
                    // Store hash in your password DB.
                    if (err) {
                        return res.send(genRes.generateResponse(false, 'User SignUp unsuccessfull', 400, null))
                    }
                    await userModel.create({ name: name, email: email, password: hash }).then((result) => {
                        return res.send(genRes.generateResponse(true, "User SignUp successfully ", 200,));
                    }).catch(err => {
                        return res.send(genRes.generateResponse(false, err.message, 403, null))

                    })

                });
            });
        }
    } catch (error) {
        return res.send(genRes.generateResponse(false, error.message, 403, null))
    }

}

exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body
       
        const findUser = await userModel.findOne({ email: email })
       
        if (findUser) {
            
            bcrypt.compare(password, findUser.password, function (err, response) {
                if (err) {
                    return res.send(genRes.generateResponse(false, 'Something went wrong', 400, null))

                }
                if (response) {
                   
                    const jwttoken = jwt.generateAccessToken({ userId: findUser._id, email: findUser.email });
                    // Send JWT
                    return res.send(genRes.generateResponse(true, 'Successfully Logged In', 200, { token: jwttoken }));

                } else {
                   
                    return res.send(genRes.generateResponse(false, 'passwords do not match', 400, null))

                }
            });

        } else {
            return res.send(genRes.generateResponse(false, 'email is not SignedUp', 400, null))
        }
    } catch (err) {
        return res.send(genRes.generateResponse(false, err.message, 403, null))
    }
}

exports.logout = (req, res) => {
    try {
        //replace jwt token the with empty token and  redirect to the login url in frontend
        res.send(genRes.generateResponse(true, 'Successfully Logged Out', 200, { token: "" }))

    } catch (error) {
        return res.send(genRes.generateResponse(false, error.message, 403, null))
    }
}