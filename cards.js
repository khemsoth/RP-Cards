const inquirer = require('inquirer');

var deck = [];
var card = {
  suit: '',
  value: ''
}
var suits = ['spades', 'clubs', 'hearts', 'diamonds'];
var values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']

function start() {
  createDeck();
inquirer
  .prompt([
    {
    type: 'rawlist', 
    name: 'choice', 
    message: 'What would you like to do?',
    choices: 
      [
        'Shuffle and draw one card', 
        'Shuffle and deal all cards'
      ]
    }
  ]).then(function(ans) {
    if(ans.choice==='Shuffle and draw one card') {
      drawCard();
    }
    else if(ans.choice==='Shuffle and deal all cards') {
      inquirer
        .prompt([
          {
            type: 'number', 
            name: 'players', 
            message: 'How many players are there?'
          }
        ]).then(function(ans) {
          var playerHand = [];
          shuffle(); 
          for(var i = 0; i < (52 / ans.players); i++) {
            var card = deck.shift();
            playerHand.push(card);
          }
          console.log('Your hand: ' + JSON.stringify(playerHand))
          start();
        })
    }
  })
};


function createDeck() {
  for(var i = 0; i < suits.length; i++) {
    for(var j = 0; j < values.length; j++) {
      card = {
        suit: suits[i],
        value: values[j]
      };
      deck.push(card);
    };
  };
};

function shuffle() {
  deck.sort(function() { 
    return 0.5 - Math.random()
  });
}

function drawCard() {
  shuffle();
  console.log('Your card is the ' + JSON.parse(JSON.stringify(deck[0].value)) + ' of ' + JSON.parse(JSON.stringify(deck[0].suit)) + '.')
  start();
};

start();