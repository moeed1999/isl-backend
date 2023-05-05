const easyChallengesModel = require('../../../models/easyChallengesModel')
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

module.exports = {
    allEasyChallenges,
    createEasyChallenge
}