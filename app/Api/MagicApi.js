import CardActions from '../actions/CardActions'
import SetActions from '../actions/SetActions'
import request from 'superagent'

module.exports = {

    getCards: function(setCode) {
       console.log('in getCard in Api')
     request.get(`https://api.magicthegathering.io/v1/cards?set=${setCode}`)
       .set('Accept', 'application/json')
       .end(function(err, response) {
         if (err) return console.error(err);
           console.log('hi there', response);
           console.log(CardActions);
         CardActions.receiveCards(response.body);
       });
    },
    getSets: function() {
        console.log('in getSets in Api')
        request.get('https://api.magicthegathering.io/v1/sets')
            .set('Accept', 'application/json')
            .end(function(err, response) {
                if (err) return console.error(err);
                console.log(response)
                SetActions.receiveSets(response.body)
            });
    }
  };