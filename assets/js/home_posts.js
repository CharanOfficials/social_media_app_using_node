// method to subit the form data for new Post using AJAX
{
    // Attach delete functionality to existing delete buttons
    $(document).ready(function () {
    $('.delete-post-button').each(function () {
        deletePost($(this));
    });
    });
    let createPost = function () {
        let newPostForm = $('#new-post-form')
        newPostForm.submit(function (e) {
            e.preventDefault()
            $.ajax({
                type: 'POST',
                url: '/posts/create',
                data: newPostForm.serialize(), //  converts the data in JSON
                success: function (data) {
                    console.log(data.data)
                    let newPost = newPostDOM(data.data.post)
                    $(`#post-list-container>ul`).prepend(newPost)
                    deletePost($(' .delete-post-button', newPost));
                    showNotification("Post published.", 'success')
                },
                error: function (error) {
                    showNotification("Unable to publish.", 'error')
                    console.log(error.responseText)
                }
            })
        })
    }

    // method to create a post in DOM
    let newPostDOM = function (post) {
        console.log(post)
        return $(`<li id="post-${post._id}">
        <p>

                <small>
                    <a class="delete-post-button" href="/posts/destroy/${post._id}">Delete</a>
                </small>

                    ${post.content}
                        <small>
                            ${post.user.name}
                        </small>
        </p>
        <div class="post-comments">

                <form action="/comments/create" method="POST">
                    <input type="text" name="content" placeholder="type here to add comment..." required>
                    <input type="hidden" name="postid" value="${post._id}">
                    <input type="submit" value="Add Comment">
                </form>

        </div>
        <div class="post-comments-list">
            <ul class="post-comment-${post._id}">

            </ul>
        </div>
    </li>`)
    
    }

    // method to delete a post from DB
    let deletePost = function (deleteLink) {
        $(deleteLink).click(function(e) {
            e.preventDefault();
            console.log("Clicked")
            $.ajax({
                type: 'GET', // Use uppercase 'GET' for consistency
                url: $(this).prop('href'), // Use $(this) to refer to the clicked element
                success: function (data) {
                    $(`#post-${data.data.post_id}`).remove();
                    showNotification("Post and associated comments deleted.", 'success')
                },
                error: function (xhr, status, error) { // Use more standard parameter names
                    showNotification("You can't delete this post.", 'error')
                    console.log(error); // Log the actual error message
                }
            });
        });
    };
    
    function showNotification(text, type) {
    new Noty({
        theme: 'relax',
        text: text,
        type: type,
        layout: 'topRight',
        timeout: 1500
    }).show();
    }
        // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = function(){
        $('#post-list-container>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]
            new PostComments(postId);
        });
    }
    createPost()
    convertPostsToAjax()
}
