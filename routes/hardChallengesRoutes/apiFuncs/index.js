const hardChallengesModel = require('../../../models/hardChallengesModel')
const userModel = require('../../../models/userModel')
const allHardChallenges = async (req, res) => {
    try {
        let challenges = await hardChallengesModel.find({})
        res.send(challenges)
    } catch (error) {
        res?.status(500).send("Internal Server Error");
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
    const {date} = req?.query
    try {
        let challenges = await hardChallengesModel.findOne({date})
        challenges ?
        res.send(challenges)
        :
        res.send('No challenge for now.')
    } catch (error) {
        res?.status(500).send("Internal Server Error");
        console.log(error)
    }
};

const isHardChallengeCompleted = async (req, res) => {
    const {_id} = req?.user
    const {id} = req?.params
    try {
        let user = await userModel.findOne({ _id })
        if(user && user?.hardCompletedChallenges?.includes(id)){
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
    allHardChallenges,
    createHardChallenge,
    getHardChallenge,
    isHardChallengeCompleted
}