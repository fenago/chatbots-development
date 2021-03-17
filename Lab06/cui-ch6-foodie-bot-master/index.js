var restify = require('restify');
var builder = require('botbuilder');

// Lets setup the Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});


// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});


// Listen for messages from users 
server.post('/foodiebot', connector.listen());


// // Echo their message back.. just parrotting!
// var bot = new builder.UniversalBot(connector, function (session) {
//     session.send("You said: %s", session.message.text);
// }); 

// var bot = new builder.UniversalBot(connector, [
//     function (session) {
//         builder.Prompts.number(session, 'Booking a table!  For how many people?');
//     },
//     function (session, results) {
//         session.endDialog('Ok. Looking for a table for ' +  
//                           results.response + ' people.');
//     }
// ]);


// var bot = new builder.UniversalBot(connector, [
//     function (session) {
//         builder.Prompts.choice(session, 'Booking a table! Any specific cuisine?', ['Indian', 'Chinese', 'Italian']);
//     },
//     function (session, results) {
//         session.endDialog('Ok. Looking for a ' + 
//         results.response.entity + ' restaurant.');
//     }
// ]);

// var bot = new builder.UniversalBot(connector, [
//     function (session) {
//         var msg = new builder.Message(session);
//         msg.attachmentLayout(builder.AttachmentLayout.carousel)
//         msg.attachments([
//             new builder.HeroCard(session)
//                 .title("Chennai Kitchen")
//                 .subtitle("Authentic South Indian Restaurant")
//                 .text("Great tasting dosas. 5 star reviews.")
//                 .images([builder.CardImage.create(session, 
//                        'https://images.pexels.com/photos/221143/pexels-photo-221143.jpeg?w=940&h=650&auto=compress&cs=tinysrgb')])
//                 .buttons([
//                     builder.CardAction.imBack(session, 
//                     "book_table:chennai_kitchen", "Book a table")
//                 ]),
//             new builder.HeroCard(session)
//                 .title("Mumbai Tandoor")
//                 .subtitle("Best Indian Restaurant in town")
//                 .text("Amazing reviews!")
//                 .images([builder.CardImage.create(session, 
//                         `https://images.pexels.com/photos/45844/spices-white-pepper-nutmeg-45844.jpeg?w=940&h=650&auto=compress&cs=tinysrgb`)])
//                 .buttons([
//                     builder.CardAction.imBack(session, 
//                     "book_table:mumbai_tandoor", "Book a table")
//                 ])
//         ]);
//         session.send(msg)

//     }
// ]); 


// var bot = new builder.UniversalBot(connector, [
//     function (session) {
//         var msg = new builder.Message(session);
//         msg.attachmentLayout(builder.AttachmentLayout.carousel)
//         msg.attachments([
//             new builder.AudioCard(session)
//                 .title('Delicious Chicken Tikka')
//                 .subtitle('Must have at Mumbai Tandoor')
//                 .text('User')
//                 .image(builder.CardImage.create(session,
//                     'https://commons.wikimedia.org/wiki/File:Chicken_Tikka_(1).jpg'))
//                 .media([
//                     { url: 'http://fakeaudiourl.com/reviews1.wav' }
//                 ])
//                 .buttons([
//                     builder.CardAction.imBack(session, "order:chicken_tikka", "Order Chicken Tikka")
//                 ])
//         ]);
//         session.send(msg)

//     }
// ]);


// var bot = new builder.UniversalBot(connector, [
//     function (session) {
//         var msg = new builder.Message(session);
//         msg.attachmentLayout(builder.AttachmentLayout.carousel)
//         msg.attachments([
//             new builder.ReceiptCard(session)
//                 .title('James White')
//                 .facts([
//                     builder.Fact.create(session, '12345', 'Order Number'),
//                     builder.Fact.create(session, 'VISA 2392-****',
//                         'Payment Method')
//                 ])
//                 .items([
//                     builder.ReceiptItem.create(session, '£ 6.50', 'Chicken Tikka')
//                         .quantity(1),
//                     builder.ReceiptItem.create(session, '£ 5.00', 'Garlic Naan')
//                         .quantity(2)
//                 ])
//                 .tax('£ 1.15')
//                 .total('£ 12.65')
//                 .buttons([
//                     builder.CardAction.imBack(session, 'sendemail',
//                         'Send by email')
//                 ])

//         ]);
//         session.send(msg)

//     }
// ]);


// var bot = new builder.UniversalBot(connector, [
//     function (session) {
//         var msg = new builder.Message(session);
//         msg.attachmentLayout(builder.AttachmentLayout.carousel)
//         msg.attachments([
//             new builder.SigninCard(session)
//         .text('Mumbai Tandoor Login')
//         .button('Login', 'https://mumbaitandoor.com/login')
//         ]);
//         session.send(msg)

//     }
// ]);


// // Bot Dialogs
// var bot = new builder.UniversalBot(connector, [
//     function (session) {
//         session.send('Welcome to New India restaurant!');
//         builder.Prompts.time(session, 'Table reservations.  What time?');
//     },
//     function (session, results) {
//         session.dialogData.timeOfReservation = 
//         builder.EntityRecognizer.resolveTime([results.response]);
//         builder.Prompts.number(session, "And how many people?");
//     },
//     function (session, results) {
//         session.dialogData.numberOfPeople = results.response;
//         builder.Prompts.text(session, "And your name?");
//     },
//     function (session, results) {
//         session.dialogData.nameOnReservation = results.response;
//         session.send('Great! Your reservation is booked!');
//     }
// ]);



//Main dialogue
var bot = new builder.UniversalBot(connector, [
    function (session) {
        session.send("Welcome to New India restaurant.");
        session.beginDialog('askForOrder');
    },
    function (session) {
        session.beginDialog('askForPayment');
    },
    function (session) {
        session.send('Thanks for your order!');
        session.send(`Order summary: 
        ${session.conversationData.order}<br/>` +
            `Payment card number: 
        ${session.conversationData.cardNumber}<br/>`);
        session.endDialog();
    }
]);


// Ask for Order
bot.dialog('askForOrder', [
    function (session) {
        builder.Prompts.text(session, 'Whats your order?');
    },
    function (session, results) {
        session.conversationData.order = results.response;
        session.endDialog();
    }
]);

// Ask for payment
bot.dialog('askForPayment', [
    function (session) {
        builder.Prompts.text(session, 'Whats the card number?');
    },
    function (session, results) {
        session.conversationData.cardNumber = results.response;
        builder.Prompts.text(session, 'Whats the CVV number?');
    },
    function (session, results) {
        session.conversationData.cardCVVNumber = results.response;
        session.send('Thanks for the payment!');
        session.endDialog();
    }
])



bot.recognizer({
    recognize: function (context, done) {
        var intent = { score: 0.0 };
        if (context.message.text) {
            switch (context.message.text.toLowerCase()) {
                case 'help':
                    intent = { score: 1.0, intent: 'get-help' };
                    break;
                case 'goodbye':
                    intent = { score: 1.0, intent: 'say-goodbye' };
                    break;
            }
        }
        done(null, intent);
    }
});


bot.dialog('help', [
    function (session) {
        session.send('I can help you look for a restaurant or order a takeaway!');
        session.endDialog();
    }
]).triggerAction({
    matches: 'get-help'
});

bot.dialog('goodbye', [
    function (session) {
        session.send('Goodbye now!');
        session.endConversation();
    }
]).triggerAction({
    matches: 'say-goodbye'
});
