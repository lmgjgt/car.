export const chatHandler = (io) => {
  io.on('connection', (socket) => {
    socket.on('joinRequestRoom', (room) => {
      socket.join(room);
    });

    socket.on('sendMessage', ({ room, message, sender }) => {
      io.to(room).emit('receiveMessage', { message, sender, time: Date.now() });
    });
  });
};
