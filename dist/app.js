"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//------------------------------------------------------------------------------
// Import all packages
//------------------------------------------------------------------------------
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
const sesTransport = require("nodemailer-ses-transport");
//------------------------------------------------------------------------------
// New Express server config
//------------------------------------------------------------------------------
class App {
    // Create a new express server
    constructor() {
        this.express = express();
        this.cors = cors();
        this.bodyParser = bodyParser.json();
        this.mountRoutes();
    }
    // Create a new routes
    mountRoutes() {
        const router = express.Router();
        // Contact form
        router.post('/contact', function (req, res) {
            // Options for mail  
            let mailOpts, smtpTrans;
            smtpTrans = nodemailer.createTransport(sesTransport({
                accessKeyId: 'ENTER YOUR AWS ACCESS KEY ID',
                secretAccessKey: 'ENTER YOUR AWS SECRET ACCESS KEY',
                region: 'ENTER YOUR AWS REGION'
            }));
            mailOpts = {
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
            smtpTrans.sendMail(mailOpts, function (error, response) {
                //Email not sent
                if (error) {
                    res.json({ code: 'error', msg: 'Error occured, message not sent. ' + error });
                }
                else {
                    res.json({ code: 'success', msg: 'Message sent, thank you!' });
                }
            });
        });
        // Default route
        router.get('/', (req, res) => {
            res.json({
                message: 'Serviceman!'
            });
            //res.send('Serviceman!')
        });
        this.express.use('/', router);
    }
}
//------------------------------------------------------------------------------
// Export class with Express config
//------------------------------------------------------------------------------
exports.default = new App().express;
//# sourceMappingURL=app.js.map