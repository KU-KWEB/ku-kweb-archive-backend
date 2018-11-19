const Koa = require('koa');
const session = require('koa-session');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
app.keys = ['some secret hurr'];

const KeyValueRouter = require('./controller/key-value.router');
const {TestRouter} = require('./controller/test.router');

app.use(session({rolling: true}, app));
app.use(bodyParser());

app.use(KeyValueRouter.routes());
app.use(TestRouter.routes());

app.use((ctx) => {
  // ignore favicon
  if (ctx.path === '/favicon.ico') return;

  let n = ctx.session.views || 0;
  ctx.session.views = ++n;
  ctx.body = 'Hello KWEB';
  ctx.body += n + ' views';
});

app.listen(4000, () => {
  console.log('KWEB server is listening to port 4000');
});
