// import {Server} from 'socket.io'
import {Server} from 'socket.io'
const chatSockets = function (socketServer) {    

  const io = new Server(socketServer, {
    cors: {
      origin:"http://127.0.0.1:8000"
    }
  })
    io.on('connection', (socket) => {
    // console.log('new connection received', socket.id);

    socket.on('disconnect', () => {
      // console.log('socket disconnected!');
    });
    socket.on('join_room', function (data) {
        // console.log('joining request receved.', data)
        socket.join(data.chatRoom)
        io.in(data.chatRoom).emit('user_joined',data)
    })
    socket.on('send_message', function (data) {
      io.in(data.chatRoom).emit('receive_message', data)
    })
    });

}
export default chatSockets