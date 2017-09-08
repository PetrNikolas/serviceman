//------------------------------------------------------------------------------
// Node.js server
//------------------------------------------------------------------------------


//------------------------------------------------------------------------------
// Init all packages
//------------------------------------------------------------------------------
const express = require('express'), 
    bodyParser = require('body-parser'),
    cors = require('cors'),
    nodemailer = require('nodemailer'),
    sesTransport = require('nodemailer-ses-transport');


//------------------------------------------------------------------------------
// Create a new express server
//------------------------------------------------------------------------------
const app = express();


//------------------------------------------------------------------------------
// Enable Cors, bodyParser, etc.
//------------------------------------------------------------------------------
app.use(cors());
app.use(bodyParser.json());


//------------------------------------------------------------------------------
// Mails service
//------------------------------------------------------------------------------
// Contact form
app.post('/contact', function (req, res) {

  // Options for mail  
  var mailOpts, smtpTrans;

  smtpTrans = nodemailer.createTransport(sesTransport({
      accessKeyId: 'ENTER YOUR AWS ACCESS KEY ID',
      secretAccessKey: 'ENTER YOUR AWS SECRET ACCESS KEY',
      region: 'ENTER YOUR AWS REGION'
  }));

  mailOpts = {
      from: 'ENTER EMAIL ADRESS',
      to: 'ENTER YOUR EMAIL ADRESS',
      subject: 'Website contact form',
      html: '<html><head></head><body><div><p>This is email from frontend app.</p><br/>'+
        'name:  ' + req.body.name+ '<br/> '+
        'email:  ' + req.body.email+ '<br/> '+
        'company:  '+ req.body.company +'<br/> '+
        'message:  '+ req.body.message +'<br/> '+
      '</div></body></html>'
  };

  // Sending mails
  smtpTrans.sendMail(mailOpts, function (error, response) {
      //Email not sent
      if (error) {
          res.json({ code: 'error', msg: 'Error occured, message not sent. '+error});
      }
      //Yay!! Email sent
      else {
          res.json({ code: 'success', msg: 'Message sent, thank you!'});
      }
  });
});


//------------------------------------------------------------------------------
// Routes
//------------------------------------------------------------------------------
app.get('/', function (req, res) {
  res.send('Serviceman!')
})


//------------------------------------------------------------------------------
// Start server
//------------------------------------------------------------------------------
const port = process.env.PORT || 2000;

app.listen(port, function() {
    console.log('Server running at https://127.0.0.1:' + port + '/');
});
