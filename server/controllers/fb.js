const VERIFY_TOKEN = process.env.VERIFY_TOKEN

export function verify (req, res) {
  console.log('Request query:', req.query)
  if (req.query['hub.verify_token'] === VERIFY_TOKEN) {
    res.send(req.query['hub.challenge']);
    return;
  }

  res.send('oops!');
}
