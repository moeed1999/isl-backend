const easyChallengesModel = require('../../../models/easyChallengesModel')
const userModel = require('../../../models/userModel')
const allEasyChallenges = async (req, res) => {
    try {
        let challenges = await easyChallengesModel.find({})
        res.send(challenges)
    } catch (error) {
        res?.status(500).send("Internal Server Error");
        console.log(error)
    }
};

// create easy challenge
const createEasyChallenge = async (req,res) => {
        try {
            let request = new easyChallengesModel(req?.body);
            let result = await request.save();
            res.send(result);
        } catch (e) {
            res.json({
                error: e.code,
                message: e.message
            });
            console.log(e)
        }
    }

// get one easy challenge
const getEasyChallenge = async (req, res) => {
    const {date} = req?.query
    try {
        let challenges = await easyChallengesModel.findOne({date})
        challenges ?
        res.send(challenges)
        :
        res.send('No challenge for now.')
    } catch (error) {
        res?.status(500).send("Internal Server Error");
        console.log(error)
    }
};

// checking if challenge is completed or not?
const isEasyChallengeCompleted = async (req,res) => {
    const {_id} = req?.user
    const {id} = req?.params
    try {
        let user = await userModel.findOne({ _id })
        if(user && user?.easyCompletedChallenges?.includes(id)){
            res?.send(true)
        }
        else{
            res?.send(false)
        }
    } catch (error) {
        res?.status(500).send("Internal Server Error");
        console.log(error)
    }
}

module.exports = {
    allEasyChallenges,
    createEasyChallenge,
    getEasyChallenge,
    isEasyChallengeCompleted
}