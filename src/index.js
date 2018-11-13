const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = new Koa();

const KeyValueRouter = require('./controller/key-value.router');
app.use(bodyParser());
app.use(KeyValueRouter.routes(), KeyValueRouter.allowedMethods());

app.use((ctx) => {
  ctx.body = 'Hello KWEB';
});

app.listen(4000, () => {
  console.log('heurm server is listening to port 4000');
});
