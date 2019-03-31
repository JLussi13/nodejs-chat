var socket = io();

function scrollToBottom() {
    // Selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');
    // Heights
    var clientHeight = messages.prop("clientHeight");
    var scrollTop = messages.prop("scrollTop");
    var scrollHeight = messages.prop("scrollHeight");
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function() {
    var params = jQuery.deparam(window.location.search)

    socket.emit('join', params, function (e) {
        if (e) {
            alert(e);
            window.location.href = "/";
        } else {

        }
    });
})

socket.on('disconnect', function() {
    console.log("Disconected from server");
})

socket.on('updateUserList', function(users) {
    var ol = jQuery("<ol></ol>");
    users.forEach(function (users) {
        ol.append(jQuery("<li></li>").text(users));
    });
    jQuery("#users").html(ol);
});

socket.on('newMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
    scrollToBottom();
})

socket.on('newLocationMessage', function(locMessage) {
    var formattedTime = moment(locMessage.createdAt).format('h:mm a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        url: locMessage.url,
        from: locMessage.from,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
    scrollToBottom();
})

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    var messageTextBox = jQuery('[name=message]');

    socket.emit('createMessage', {
        text: messageTextBox.val()
    }, function () {
        messageTextBox.val('')
    });
});

var locationButton = jQuery('#send-loc');
locationButton.on('click', function () {
    if(!navigator.geolocation) {
        return alert('Geolocation not supported on this browser.')
    }

    locationButton.attr('disabled', true).text('Sending Location...');

    navigator.geolocation.getCurrentPosition(function (pos) {
        socket.emit('createLocationMessage', {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
        }, function () {
            locationButton.attr('disabled', false).text("Send Locations");
        })
    }, function () {
        alert ("Unable to fetch location.")
    })
})