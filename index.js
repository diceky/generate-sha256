const crypto = require('crypto');
const express = require('express')
const app = express()

app.use(express.json());

const port = process.env.PORT || 3000;

app.get('/api/sha256', (req, res) => {
    const token = req.query.token;
    const secret = req.query.secret;
    const t = Date.now();
    const nonce = "";
    const data = token + t + nonce;
    const signTerm = crypto.createHmac('sha256', secret)
        .update(Buffer.from(data, 'utf-8'))
        .digest();
    const sign = signTerm.toString("base64");
    const response = {
        "sign": sign,
        "t": t,
    }
    res.send(response);
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})