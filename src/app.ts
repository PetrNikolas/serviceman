//------------------------------------------------------------------------------
// Import all packages
//------------------------------------------------------------------------------
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as logger from 'morgan';
import * as cors from 'cors';
import * as nodemailer from 'nodemailer';
const ses = require('nodemailer-ses-transport');


//------------------------------------------------------------------------------
// New Express server config
//------------------------------------------------------------------------------
class App {
  public express: express.Application;
  public bodyParser: any;
  public cors: any;
  public nodemailer: any;
  public ses: any;

  // Create a new express server
  constructor () {
    this.express = express();
    this.middleware();
    this.cors = cors();
    this.bodyParser = bodyParser.json();
    this.routes();
  }

  // Configure Express middleware
  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  // Create a new routes
  private routes (): void {
    const router = express.Router();
    // Contact form
    router.post('/contact', (req, res) => {
        // Options for mail
        const transporter = nodemailer.createTransport(ses({
            accessKeyId: 'YOUR_AMAZON_KEY',
            secretAccessKey: 'YOUR_AMAZON_SECRET_KEY',
            region: 'YOUR_AMAZON_REGION'
        }));
        const mailOpts = {
            from: 'ENTER EMAIL ADRESS',
            to: 'ENTER YOUR EMAIL ADRESS',
            subject: 'Website contact form',
            html: '<html><head></head><body><div><p>This is email from frontend app.</p><br/>' +
                'name:  ' + req.body.name + '<br/> ' +
                'email:  ' + req.body.email + '<br/> ' +
                'company:  ' + req.body.company + '<br/> ' +
                'message:  ' + req.body.message + '<br/> ' +
            '</div></body></html>'
        };
        // Sending mails
        transporter.sendMail(mailOpts, (error, response) => {
            //Email not sent
            if (error) {
                res.json({ code: 'error', msg: 'Error occured, message not sent. ' + error});
            }
            //Yay!! Email sent
            else {
                res.json({ code: 'success', msg: 'Message sent, thank you!'});
            }
        });
    });

    // Default route
    router.get('/', (req, res) => {
      res.send('Serviceman API!');
    });
    this.express.use('/', router);
  }
}


//------------------------------------------------------------------------------
// Export class with Express config
//------------------------------------------------------------------------------
export default new App().express;