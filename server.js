require('dotenv').config();

const express = require('express');
const app = express();

const PORT = process.env.SERVICE_PORT;

function main() {
    app.use(express.json());
    app.use('/', express.static(__dirname + '/build'));

    app.get('*', (req, res, next) => {
        if (req.path.split('/')[1] === 'static') return next();

        res.sendFile(`${__dirname}/build/index.html`);
    });

    app.listen(PORT, () => {
        console.log(`run node server port: ${PORT}`);
    });
}
main();
