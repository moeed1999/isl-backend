const easyChallengesModel = require('../../../models/easyChallengesModel')
const userModel = require('../../../models/userModel')
const allEasyChallenges = async (req, res) => {
    try {
        let challenges = await easyChallengesModel.find({})
        res.send(challenges)
    } catch (error) {
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
    const {_id} = req?.user
    try {
        let user =  await userModel.findOne({_id})
        let challenges = await easyChallengesModel.findOne({_id:{$nin : user?.easyCompletedChallenges}})
        challenges ?
        res.send(challenges)
        :
        res.send('all challenges completed.No more challenges for now.')
    } catch (error) {
        console.log(error)
    }
};

module.exports = {
    allEasyChallenges,
    createEasyChallenge,
    getEasyChallenge
}