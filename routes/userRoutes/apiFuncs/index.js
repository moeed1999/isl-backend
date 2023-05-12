const userModel = require('../../../models/userModel')
const easyChallengesModel = require('../../../models/easyChallengesModel')
const hardChallengesModel = require('../../../models/hardChallengesModel')
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../../.env' });
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

        // if password does not matches
        let isPasswordMatch = userModel.comparePassword(password, userNameExists.password);

        if (!isPasswordMatch)
        return res.status(500).json({
            success: false,
            reason: "Password does not match",
            message: "You could not be logged in",
        });

        //creating token
        const token = jwt.sign({userName}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '7d' // Token expires in 1 month
          });

        res.send({
            userName: userNameExists.userName,
            token,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
};

const userSignUp = async (req, res) => {
    try {

        //encrypting password
        let password = userModel.encryptPassword(req?.body?.password)

        //creating token
        const token = jwt.sign({...req?.body,password}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '7d' // Token expires in 1 month
          });

        //creating data to save
        let request = new userModel({...req?.body,password});

        //saving data
        let user = await request.save();

        //sending data
        res.send({
            userName:user.userName,
            token,
            success:true
            });

    } catch (e) {
        res.json({
            error: e.code,
            message: e.message
        });
        console.log(e,'signup error')
    }
};

const addChallengeInUser = async (req,res)=> {
    const {challengeId} = req?.params
    const {_id:userId} = req?.user
    try {
        // checking if challenge is an easy or hard one
        let easy = await easyChallengesModel.findOne({_id : challengeId})
        let hard = await hardChallengesModel.findOne({_id : challengeId})

        if(easy){
            // checking if id already exists
            const userChallenges = await userModel.findOne({_id :userId},{easyCompletedChallenges:1})
            const isIdUnique =  userChallenges?.
                               easyCompletedChallenges?.
                               some((elem)=>{
                                return JSON.stringify(elem) == JSON.stringify(challengeId)
                            })
            
            if(!isIdUnique){
            let request = await userModel.updateOne(
                {_id:userId},
                {
                    $push : {easyCompletedChallenges : challengeId}
                }
            ) 
            res.send(request)
            }
            else {res.send('id already exists')}
        }
        
        else if(hard){
            // checking if id already exists
            const userChallenges = await userModel.findOne({_id :userId},{hardCompletedChallenges:1})
            const isIdUnique = userChallenges?.
                               hardCompletedChallenges?.
                               some((elem)=>{
                                return JSON.stringify(elem) == JSON.stringify(challengeId)
                               })
                               
            if(!isIdUnique){
                let request = await userModel.updateOne(
                    {_id:userId},
                    {
                        $push : {hardCompletedChallenges : challengeId}
                    }
                )
                res.send(request)
            }
            else{res.send('id already exists')}
        }
       
        else {
            res.send('please enter a valid id')
        }

        } catch (error) {
            res.send(error.message)
            console.log(error)
        }
}

const userEasyChallenges = async (req, res) => {
    const { _id: userId } = req?.user

    const challenges = await userModel.findOne({ _id: userId }, { _id: 0, easyCompletedChallenges: 1 }).populate('easyCompletedChallenges')
    
    res.send(challenges)

}

const userHardChallenges = async (req, res) => {
    const { _id: userId } = req?.user

    const challenges = await userModel.findOne({ _id: userId }, { _id: 0, hardCompletedChallenges: 1 }).populate('hardCompletedChallenges')
    
    res.send(challenges)

}

module.exports = {
    userLogin,
    userSignUp,
    addChallengeInUser,
    userEasyChallenges,
    userHardChallenges
}