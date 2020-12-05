// simple webserver that reacts on signals (SIGTERM, SIGINT)

const express = require('express');
const app = express();

const getDate = () => new Date().toLocaleTimeString();

// quit on ctrl-c when running docker in terminal
process.on('SIGINT', function onSigint () {
	console.info(`\n${getDate()} - Got SIGINT (aka ctrl-c in docker). Graceful shutdown `);
  shutdown();
});

// quit properly on docker stop
process.on('SIGTERM', function onSigterm () {
  console.info(`\n${getDate()} - Got SIGTERM (docker container stop). Graceful shutdown `);
  shutdown();
})

// shut down server
function shutdown() {
  server.close(function onServerClosed (err) {
    if (err) {
      console.error(err);
      process.exitCode = 1;
		}
		process.exit();
  })
}

app.use((req, res, next) => {
    console.log(`${getDate()} - Request for '${req.path}' received`);
    next();
});

app.get('/', (req, res) => res.send('Hello world!'));
const server = app.listen(3000, ()=> console.log(`${getDate()} - App listening on port 3000`));