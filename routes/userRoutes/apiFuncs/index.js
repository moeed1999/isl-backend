const userModel = require('../../../models/userModel')
const userLogin = async (req, res) => {
    const { userName, password } = req?.query
    try {

        let userNameExists = await userModel.findOne({ userName })

        //   if no username matches
        if (!userNameExists) {
            return res.json({
                success: 'false',
                reason: "This user name is not registered to any account",
                message: "you could not be logged in"
            })
        }

        let user = await userModel.findOne({
            userName,
            password
        })
        .populate('easyCompletedChallenges')
        .populate('hardCompletedChallenges')

        // if there is no matched account
        if (!user) {
            return res.json({
                success: 'false',
                reason: "incorrect password",
                message: "you could not be logged in"
            })
        }
        res.send(user)
    } catch (error) {
        console.log(error)
    }
};

const userSignUp = async (req, res) => {
    try {
        let request = new userModel(req?.body);
        let result = await request.save();
        res.send(result);
    } catch (e) {
        res.json({
            error: e.code,
            message: e.message
        });
        console.log(e)
    }
};

module.exports = {
    userLogin,
    userSignUp
}