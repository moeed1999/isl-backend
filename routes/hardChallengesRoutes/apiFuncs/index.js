const hardChallengesModel = require('../../../models/hardChallengesModel')
const allHardChallenges = async (req, res) => {
    try {
        let challenges = await hardChallengesModel.find({})
        res.send(challenges)
    } catch (error) {
        console.log(error)
    }
};

// create easy challenge
const createHardChallenge = async (req,res) => {
    console.log(req.body,'ooo')
        try {
            let request = new hardChallengesModel(req?.body);
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
    allHardChallenges,
    createHardChallenge
}