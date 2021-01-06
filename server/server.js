const io = require('socket.io')(5000, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})

console.log('Dev server started on http://localhost:5000/')

io.on('connection', socket => {
  // creating the room number based on user's ID
  const id = socket.handshake.query.id
  socket.join(id)

  socket.on('send-message', ({ recipients, text }) => {
    recipients.forEach(recipient => {
      // creating new variable with all recipients in the chat
      // omitting the sender of the message
      const newRecipients = recipients.filter(r => r !== recipient)
      newRecipients.push(id)

      // broadcasting the message with correct recipients and sender
      socket.broadcast.to(recipient).emit('receive-message', {
        recipients: newRecipients, sender: id, text
      })
    })
  })
})

