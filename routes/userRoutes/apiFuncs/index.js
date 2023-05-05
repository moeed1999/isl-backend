const userModel = require('../../../models/userModel')
const easyChallengesModel = require('../../../models/easyChallengesModel')
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

const addChallengeInUser = async (req,res)=> {
    const {userId,challengeId} = req?.params
    try {
        // check if challenge is an easy or hard one
        let easy = await easyChallengesModel.findOne({_id : challengeId})

        let request = 
        easy ? 
        await userModel.updateOne(
            {_id:userId},
            {
                $addToSet : {easyCompletedChallenges : challengeId}
            }
        ) 
        :
        await userModel.updateOne(
            {_id:userId},
            {
                $addToSet : {hardCompletedChallenges : challengeId}
            }
        ) 
        res.send(request);
        } catch (error) {
            res.send(error.message)
            console.log(error)
        }
}

module.exports = {
    userLogin,
    userSignUp,
    addChallengeInUser
}