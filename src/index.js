const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = new Koa();

const KeyValueRouter = require('./controller/key-value.router');
const UserRouter = require('./controller/user.router');
app.use(bodyParser());
app.use(KeyValueRouter.routes());
app.use(UserRouter.routes());

app.use((ctx) => {
  ctx.body = 'Hello KWEB';
});

app.listen(4000, () => {
  console.log('KWEB server is listening to port 4000');
});
