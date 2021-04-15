const mongoose = require('mongoose');

const matchSchema = mongoose.Schema({
    teamOne: {
        type: String,
        required: true,
    },
    teamTwo: {
        type: String,
        required: true,
    },
    matchTime: {
        type: String,
        required: true,
    },
    vote:[{
        type : mongoose.Schema.Types.ObjectId , 
        ref : 'User'
    }]
    

},
{
// means createdAt and updatedAt
    timestamps: true 
});



const Match = mongoose.model("Match", matchSchema);
module.exports = Match;