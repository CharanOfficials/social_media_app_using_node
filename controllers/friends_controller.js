import Friendship from '../models/friendships.js'
import User from '../models/user.js'

const toggleFriend = async function (req, res) {
    try {
        let friendship
        let fromUser = await User.findById(req.query.fromid)
        let toUser = await User.findById(req.query.toid)
        let removed
        
        if (fromUser && toUser) {
            let friendshipFrom = await Friendship.find({
                from_user: fromUser,
                to_user: toUser
            })
            friendship = friendshipFrom
            let friendshipTo = await Friendship.find({
                from_user: toUser,
                to_user: fromUser
            })
            if(friendshipTo.length !== 0){friendship = friendshipTo}
            if (friendshipFrom.length !== 0 || friendshipTo.length !== 0) {
                let removedfriend = await Friendship.findByIdAndDelete(friendship)
                fromUser.friendships.pull(removedfriend)
                await fromUser.save()
                toUser.friendships.pull(removedfriend)
                await toUser.save()
                removed = 'Add'
            }
            else {
                let friend = await Friendship.create({
                    from_user: fromUser,
                    to_user: toUser
                })
                fromUser.friendships.push(friend._id)
                await fromUser.save()
                toUser.friendships.push(friend._id)
                await toUser.save()
                removed = 'Remove'
                }
            }
        // return like creation or deletion status
        return res.status(200).json({
            message: "Request successful!",
            data: {
                status:removed
            }
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}
export default {
    toggleFriend
}