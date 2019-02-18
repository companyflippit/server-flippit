const NodeRSA = require('node-rsa');
const fs = require('fs');
const path = require('path');

const cert = fs.readFileSync(path.resolve('app/domain/private.pem'));

const key = new NodeRSA(cert, { b: 256 });

const text = 'GET https://api.zonadeprueba.es/v1.0/comercios/wvJzfp5Sr4VqfuJd?ts=1527154321363';
const encrypted = key.sign(text, 'base64');
