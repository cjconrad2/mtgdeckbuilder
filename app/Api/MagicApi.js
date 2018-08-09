import CardActions from '../actions/CardActions'
import request from 'superagent'

module.exports = {

  getCards: function ({setCode, type, subtype, color, rarity, cmc, name}) {
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
    if(color) {
      queryStringParts.push(`colors=${color}`)
    }
    if(rarity) {
      queryStringParts.push(`rarity=${encodeURIComponent(rarity.toLowerCase())}`)
    }
    if(cmc) {
      queryStringParts.push(`cmc=${cmc}`)
    }
    if(name) {
      queryStringParts.push(`name=${encodeURIComponent(name)}`)
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
        CardActions.receiveCards(response.body.cards);
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