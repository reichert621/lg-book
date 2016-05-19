const VERIFY_TOKEN = process.env.VERIFY_TOKEN

export function verify (req, res) {
  console.log('Request query:', req.query)
  if (req.query['hub.verify_token'] === VERIFY_TOKEN) {
    res.send(req.query['hub.challenge']);
    return;
  }

  res.send('oops!');
}

export function listen (req, res) {
  var messaging_events = req.body.entry[0].messaging

  for (var i = 0; i < messaging_events.length; i++) {
    var event = req.body.entry[0].messaging[i]
    var sender = event.sender.id

    console.log(event)
    if (event.message && event.message.text) {
      var text = event.message.text

      console.log(text)
    }
  }

  res.sendStatus(200)
}
