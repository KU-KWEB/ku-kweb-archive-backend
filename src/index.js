const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const {MysqlPool} = require('./core/mysql.config');
const {UserScheme} = require('./scheme/user.scheme');
const {TestTable} = require('./scheme/test.scheme');

async function syncDatabase() {
  console.log('[KWEB] Start initialize Database');
  await UserScheme.initialize(MysqlPool);
  await TestTable.initialize(MysqlPool);
}

async function init() {
  console.log('[KWEB] Init');
  await syncDatabase();
  app.listen(4000, () => {
    console.log('[KWEB] server is listening to port 4000');
  });
}

const KeyValueRouter = require('./controller/key-value.router');
app.use(bodyParser());
app.use(KeyValueRouter.routes());

app.use((ctx) => {
  ctx.body = 'Hello KWEB';
});

init();
