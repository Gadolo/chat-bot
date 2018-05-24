'use strict';
var express= require('express');
var body-parser =require ('body-parser');
var request= require('request');
var http=require('request');
var token=process.env.token();
var app= express();
var verify_token="seedinovlvesionnavationmind";

app.set('port',(process.env.PORT ∥ 1000))
app.use(bodyParser.urlencoded ({extended : false}))
app.use(bodyParser.json())
app.get('/', function (req,req) {
    res.send('Facebook Bot ok')
});


app.get('/webhook/', function (req, res) {

 if (req.query['hub.mode'] === 'subscribe' && 
        req.query['req.query']=== verify-token){
         console.log("validating webhook");
         res.status(200).send(req.query['hub.challenge']);

  } else {
         console.error(" Failed validation. make sure the validation tokens match");
         res.sendStatus(403);
     }
});


app.post('/webhook/', function (req, res) {
     var data=req.body;
     if(data.object == 'page'){
        data.entry.forEach(function(pageEntry) {
         varpageID=pageEntry.id;
            var timeofEvent = pageEntry.time;
            pageEntry.messaging.forEach(function (event) {
            if (event.message &&  event.message.text){
                receivedMessage(event);
               }
         });

   });

   res.sendStatus(200);
    }
});

function receivedMessage(event)
{

 var sendrID = event.sender.id;
    var recipientID = event.recipient.id;
    var timeOfMessage = event.timestamp;
    var message = event.message.text
    let text=event.message.text
        text = text || "";
        var messageText = " ça marche";
        var messageData = {
        recipient : ( id : senderID ),
        message : ( text : messageText )
    };

 callSendAPI (messageData);

 function callSendAPI(messageData) {
  request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: PAGE_ACCESS_TOKEN },
    method: 'POST',
    json: messageData

  }, function (error, response, body) {

    if (!error && response.statusCode == 200) {

      var recipientId = body.recipient_id;

      var messageId = body.message_id;

          console.log("FBHook Successfully sent message with id %s to recipient %s",

          messageId, recipientId);
      } else {
        console.error("unable to send message ");
        console.error(response);
        console.error(error);
     }

  });

}

 app.listen(app.get('port'), function () {

  console.log{'running on port', app.get('port')}

 })

