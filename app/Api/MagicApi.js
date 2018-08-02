import CardActions from '../actions/CardActions'
import request from 'superagent'

module.exports = {

    getCards: function(setCode) {
     request.get(`https://api.magicthegathering.io/v1/cards?set=${setCode}&pageSize=500`)
       .set('Accept', 'application/json')
       .end(function(err, response) {
         if (err) return console.error(err);
         CardActions.receiveCards(response.body);
       });
    },
    getSets: function() {
        request.get('https://api.magicthegathering.io/v1/sets')
            .set('Accept', 'application/json')
            .end(function(err, response) {
                if (err) return console.error(err);
                CardActions.receiveCardSets(response.body)
            });
    }
  };