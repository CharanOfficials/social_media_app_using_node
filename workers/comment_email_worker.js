import queue from '../config/kue.js'
import comments_mailer from '../mailers/comments_mailer.js'

// Below worker needs to be called from the comment_controller
queue.process('emails', (job, done)=>{
    // console.log("Emails worker is processing the job.", job.data)
    comments_mailer.newComment(job.data)    
    done()
})

export default {
    queue
}