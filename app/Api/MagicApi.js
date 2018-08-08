import CardActions from '../actions/CardActions'
import request from 'superagent'

module.exports = {

  getCards: function ({setCode, type, subtype}) {
    var requestUrl = 'https://api.magicthegathering.io/v1/cards'
    var queryStringParts = [];
    if(setCode) {
      queryStringParts.push(`set=${setCode}`)
    }
    if(type) {
      queryStringParts.push(`type=${type}`)
    }
    if(subtype) {
      queryStringParts.push(`subtypes=${subtype}`)
    }
    if(queryStringParts.length > 0)
    {
      requestUrl = requestUrl.concat(`?${queryStringParts.join('&')}`)
    }
    console.log(requestUrl)
    request.get(requestUrl)
      .set('Accept', 'application/json')
      .end(function (err, response) {
        if (err) return console.error(err);
        console.log('cards', response.body.cards)
        CardActions.receiveCards(response.body);
      });
  },
  getSets: function () {
    request.get('https://api.magicthegathering.io/v1/sets')
      .set('Accept', 'application/json')
      .end(function (err, response) {
        if (err) return console.error(err);
        CardActions.receiveCardSets(response.body)
      });
  },
  getTypes: function () {
    request.get('https://api.magicthegathering.io/v1/types')
      .set('Accept', 'application/json')
      .end(function (err, response) {
        if (err) return console.error(err);
        CardActions.receiveTypes(response.body);
      });
  },
  getSubtypes: function () {
    request.get('https://api.magicthegathering.io/v1/subtypes')
      .set('Accept', 'application/json')
      .end(function (err, response) {
        if (err) return console.error(err);
        CardActions.receiveSubtypes(response.body);
      });
  }
};