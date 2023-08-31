import Friendship from '../models/friendships.js'
import User from '../models/user.js'

const toggleFriend = async function (req, res) {
    try {
        let friendship
        let fromUser = await User.findById(req.query.fromid)
        let toUser = await User.findById(req.query.toid)
        let removed

        if (fromUser && toUser) {
            friendship = await Friendship.findOne({
                $or: [
                    { from_user: fromUser },
                    { to_user: fromUser }
                ]
                });
        }
        // if a friend already exists then delete it from the arrays and model
        if (fromUser && toUser && friendship) {
            let removedfriend = await Friendship.findByIdAndDelete(friendship)
            fromUser.friendships.pull(removedfriend)
            fromUser.save()
            toUser.friendships.pull(removedfriend)
            toUser.save()
            console.log("Removed")
            removed = 'removed'
        } else if(fromUser && toUser && friendship === null) {
            let friend = await Friendship.create({
                from_user: fromUser,
                to_user: toUser
            })
            fromUser.friendships.push(friend._id)
            fromUser.save()
            toUser.friendships.push(friend._id)
            toUser.save()
            removed = 'added'
        }   
        // return like creation or deletion status
        return res.status(200).json({
            message: "Request successful!",
            data: {
                status:removed
            }
        })

    } catch (err) {
        return res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}
export default {
    toggleFriend
}