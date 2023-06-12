const hardChallengesModel = require('../../../models/hardChallengesModel')
const userModel = require('../../../models/userModel')
const allHardChallenges = async (req, res) => {
    try {
        let challenges = await hardChallengesModel.find({})
        res.send(challenges)
    } catch (error) {
        console.log(error)
    }
};

// create easy challenge
const createHardChallenge = async (req, res) => {
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

const getHardChallenge = async (req, res) => {
    const { _id } = req?.user
    try {
        let user = await userModel.findOne({ _id })
        let challenges = await hardChallengesModel.findOne({ _id: { $nin: user?.hardCompletedChallenges } })
        challenges ?
            res.send(challenges)
            :
            res.send('all challenges completed.No more challenges for now.')
    } catch (error) {
        console.log(error)
    }
};
module.exports = {
    allHardChallenges,
    createHardChallenge,
    getHardChallenge
}