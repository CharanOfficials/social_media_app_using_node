import express from "express";
const router = express.Router() // Setup a separate router
import postsAPi from '../../../controllers/api/v1/posts_api.js'
import passport from "passport";

router.get('/', postsAPi.index)
// keep false to avoid session cookie to get generated
router.delete('/:id',passport.authenticate('jwt', {session:false}), postsAPi.destroy)
export default router