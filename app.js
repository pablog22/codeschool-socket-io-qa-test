var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', function (client) {
  console.log("New client connected.");

  // listen for answers here
  client.on('answer', function (question, answer) {
    client.broadcast.emit('answer', question, answer);
  });

  // listen for questions here
  client.on('question', function (question) {
    console.log("New question: " + question);
    client.broadcast.emit('question', question);
    client.emit('question', question);

    //client.emit('testing', question);

    // if (!client.question_asked) {
    //   console.log("Question: wil be processed");
    //   client.question_asked = true;
    //   client.broadcast.emit('question', question);
    //   client.emit('question', question);
    // } else {
    //   console.log("No more questions for you.");
    // }
  });

  // Testing
  //client.emit('question', '1 2 3 probando!');

});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

server.listen(8080);