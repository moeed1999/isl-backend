const userModel = require('../../../models/userModel')
const easyChallengesModel = require('../../../models/easyChallengesModel')
const hardChallengesModel = require('../../../models/hardChallengesModel')
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

        let user = await userModel.findOne({
            userName
        })
        .populate('easyCompletedChallenges')
        .populate('hardCompletedChallenges')

        res.send(user)
    } catch (error) {
        console.log(error)
    }
};

const userSignUp = async (req, res) => {
    try {
        let password = userModel.encryptPassword(req?.body?.password)
        let request = new userModel({...req?.body,password});
        let result = await request.save();
        res.send(result);
    } catch (e) {
        res.json({
            error: e.code,
            message: e.message
        });
        console.log(e,'signup error')
    }
};

const addChallengeInUser = async (req,res)=> {
    const {userId,challengeId} = req?.params
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
            res.send('no challenge with this id exists')
        }

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