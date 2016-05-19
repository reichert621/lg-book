import fetch from 'isomorphic-fetch';

const VERIFY_TOKEN = process.env.VERIFY_TOKEN
const PAGE_TOKEN = process.env.PAGE_TOKEN
const MESSAGES_PATH = 'https://graph.facebook.com/v2.6/me/messages'

export function verify (req, res) {
  console.log('Request query:', req.query)
  if (req.query['hub.verify_token'] === VERIFY_TOKEN) {
    res.send(req.query['hub.challenge']);
    return;
  }

  res.send('oops!');
}

export function listen (req, res) {
  const events = req.body.entry[0].messaging

  console.log('EVENTS!', events)

  let promises = events
    .filter(e => {
      return (e.sender && e.sender.id) && (e.message && e.message.text)
    })
    .map(e => {
      return textMessage({
        id: e.sender.id,
        text: e.message.text
      })
    })

  Promise.all(promises)
    .then(() => res.sendStatus(200))
    .catch(err => {
      console.log('ERROR!', err);
      res.sendStatus(500);
    })
}

function textMessage(id, text) {
  const message = {
    recipient: { id },
    message: { text }
  }

  const json = JSON.stringify(message);

  console.log('Attempting to send message:', message)
  console.log('To path: ', `${MESSAGES_PATH}?access_token=${PAGE_TOKEN}`)

  return fetch(`${MESSAGES_PATH}?access_token=${PAGE_TOKEN}`, {
    method: 'POST',
    headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json',
    },
    body: json
  });

