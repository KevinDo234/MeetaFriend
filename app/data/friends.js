// array of dummy survey data for people to initially match with
let friends = [{
        "name": "Jim",
        "photo": "https://img.buzzfeed.com/buzzfeed-static/static/2016-04/23/10/campaign_images/webdr02/what-percent-compatible-with-jim-halpert-from-the-2-24963-1461422235-11_dblbig.jpg",
        "scores": [5, 1, 4, 4, 5, 1, 2, 5, 4, 1]
    },

    {
        "name": "David",
        "photo": "https://specials-images.forbesimg.com/imageserve/59de682a4bbe6f37dda0566e/416x416.jpg?background=000000&cropX1=995&cropX2=2729&cropY1=78&cropY2=1813",
        "scores": [1, 3, 5, 4, 5, 1, 2, 5, 4, 1]
    },

    {
        "name": "Darlene",
        "photo": "http://www.usanetwork.com/sites/usanetwork/files/styles/629x720/public/2017/10/mrrobot_s3_cast_carly-chaikin.jpg?itok=gEYrS_7b",
        "scores": [2, 1, 4, 4, 5, 1, 2, 5, 4, 1]
    },

    {
        "name": "Andy",
        "photo": "https://blogs-images.forbes.com/jimclash/files/2016/03/dawn_wells-14-640.jpg",
        "scores": [5, 4, 3, 2, 1, 1, 2, 3, 4, 5]
    },

    {
        "name": "Albert",
        "photo": "http://1.bp.blogspot.com/_IfHKdZwDktA/TCBXYbGlJKI/AAAAAAAABgY/e8Z7YecgZic/s1600/Famous+photo+of+Scientist+Albert+Einstein.jpg",
        "scores": [3, 2, 1, 5, 4, 5, 3, 4, 4, 2]
    },

    {
        "name": "Lisa",
        "photo": "https://i.ytimg.com/vi/OwCAcNn09z4/maxresdefault.jpg",
        "scores": [5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
    }
]

// ---------------------------------------
// constructor is exported to api route
// ---------------------------------------
function friendConstructor(name, picture, survey) {
    //Holds json info in an object
    this.friendObj = {
        "name": name,
        "photo": picture,
        "scores": survey
    }

    //pushes the friendObj object friends array
    this.newfriend = function() {
        friends.push(this.friendObj);
        this.findMatch();
    }

    //variable to hold the match
    this.closestMatch;

    //used for api get function to display all friends in json
    this.showfriends = function() {
        return friends;
    }

    //loops to find the match
    this.findMatch = function() {
        let currentBestMatch;
        let currentBestMatchScore = -1;

        for (let i in friends) {
            // so you don't dont match with yourself (that would be embarassing)
            if (friends[i] != this.friendObj) {
                var newFriendBestMatch = calcFriendDifference(friends[i].scores, this.friendObj.scores);

                if (currentBestMatchScore >= 0) {
                    if (newFriendBestMatch < currentBestMatchScore) {
                        currentBestMatch = friends[i];
                        currentBestMatchScore = newFriendBestMatch;
                    }
                }
                //drops first person in array to have baseline to compare
                else {
                    currentBestMatch = friends[i];
                    currentBestMatchScore = newFriendBestMatch;
                }
            }
        }
        this.closestMatch = currentBestMatch;
    }
}

module.exports = friendConstructor;

// calcuation to do the matching of two arrays of scores
let calcFriendDifference = function(arr1, arr2) {
    totalDifference = 0;
    for (let i in arr1) {
        totalDifference += Math.abs(arr1[i] - arr2[i]);
    }
    return totalDifference;
}