const friendFinder = require("../data/friends.js")
let friend = new friendFinder()

module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        res.json(friend.showfriends())
    })

    app.post("/api/friends", function(req, res) {
        //console.log(req.body)
        let newRequest = req.body

        let newfriend = new friendFinder(newRequest.name, newRequest.picture, newRequest.survey)

        newfriend.newfriend()

        //console.log(newfriend.closestMatch)
        res.send(newfriend.closestMatch)

    })


}