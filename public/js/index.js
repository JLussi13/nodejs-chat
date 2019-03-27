var socket = io();

socket.on('connect', function() {
    console.log("Connected to server");
    socket.emit("createMessage", {
        from: "folo420",
        text: "Sheeeeeeeeeeeeit",
    });
})

socket.on('disconnect', function() {
    console.log("Disconected from server");
})

socket.on('newMessage', function(message) {
    console.log(message);
})