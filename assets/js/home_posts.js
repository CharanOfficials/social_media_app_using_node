// method to subit the form data for new Post using AJAX   
{
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
                },
                error: function (error) {
                    console.log(error.responseText)
                }
            })
        })
    }

    // method to create a post in DOM
    let newPostDOM = function (post) {
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
    let deletePost = function(deleteLink) {
        $(deleteLink).click(function(e) {
            e.preventDefault();
            $.ajax({
                type: 'GET', // Use uppercase 'GET' for consistency
                url: $(this).prop('href'), // Use $(this) to refer to the clicked element
                success: function (data) {
                    $(`#post-${data.data.post_id}`).remove();
                },
                error: function(xhr, status, error) { // Use more standard parameter names
                    console.log(error); // Log the actual error message
                }
            });
        });
    };
    createPost()
}