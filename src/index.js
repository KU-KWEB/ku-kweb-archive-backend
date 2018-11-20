const Koa = require('koa');
const session = require('koa-session');
const bodyParser = require('koa-bodyparser');
const uuidv1 = require('uuid/v1');
const app = new Koa();

const KV_SESSION_SERVER_SECRET = 'KV_SESSION_SERVER_SECRET';

const {MysqlPool} = require('./core/mysql.config');
const {UserScheme} = require('./scheme/user.scheme');
const {KeyValueStrageScheme} = require('./scheme/key-value-storage.scheme');

const {KeyValueDao} = require('./dao/key-value.dao');

async function syncDatabase() {
  console.log('[KWEB] Start initialize Database');
  await UserScheme.initialize(MysqlPool);
  await KeyValueStrageScheme.initialize(MysqlPool);
}

async function setupSessionSecret() {
  let value = await KeyValueDao.getValue(KV_SESSION_SERVER_SECRET);
  if (!value) {
    console.log(`[KWEB] Session key not set. Populating...`);
    value = uuidv1();
    await KeyValueDao.setValue(KV_SESSION_SERVER_SECRET, value);
  }
  app.keys = [value];
}

async function init() {
  console.log('[KWEB] Init');
  await syncDatabase();
  await setupSessionSecret();
  app.listen(4000, () => {
    console.log('[KWEB] server is listening to port 4000');
  });
}

const {KeyValueRouter} = require('./controller/key-value.router');
const {UserRouter} = require('./controller/user.router');
const {TestRouter} = require('./controller/test.router');

app.use(session({rolling: true}, app));
app.use(bodyParser());

app.use(KeyValueRouter.routes());
app.use(TestRouter.routes());
app.use(UserRouter.routes());

app.use((ctx) => {
  // ignore favicon
  if (ctx.path === '/favicon.ico') return;

  let n = ctx.session.views || 0;
  ctx.session.views = ++n;
  ctx.body = 'Hello KWEB';
  ctx.body += n + ' views';
});

init();
