class ChatEngine{
    constructor(chatBoxId, userEmail) {
        this.chatBoxId = $(`#${chatBoxId}`),
        this.userEmail = userEmail
        // io is a global var available after including cdn of socket.io
        this.socket = io.connect('http://:5000') 
        if (this.userEmail) {
            this.connectionHandler()
        }
    }
    connectionHandler() {
        let self = this
        // to build the connection
        this.socket.on('connect', function () {
            // console.log("Connection established using Sockets...")
        })
        // send request to join room
        self.socket.emit('join_room', {
            user_email: self.userEmail,
            chatRoom: 'Goosip'
        })
        // To notify the joining
        self.socket.on('user_joined', function (data) {
            // console.log('A user joined', data)
        })
        // Sending the message
        $('#send-message').click(function () {
            let msg = $('#chat-message-input').val()
            
            if (msg != '') {
                self.socket.emit('send_message', {
                    message: msg,
                    user_email: self.userEmail,
                    chatRoom:'Goosip'
                })
            }
        })
        self.socket.on('receive_message', function(data){
            // console.log('message received', data.message);


            let newMessage = $('<li>');

            let messageType = 'other-message';

            if (data.user_email == self.userEmail){
                messageType = 'self-message';
            }

            newMessage.append($('<span>', {
                'html': data.message
            }));

            // newMessage.append($('<sub>', {
            //     'html': data.user_email
            // }));

            newMessage.addClass(messageType);

            $('#chat-messages-list').append(newMessage);
        })

    }
}