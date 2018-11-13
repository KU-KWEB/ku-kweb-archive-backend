const KoaRouter = require('koa-router');

const {KeyValueDao} = require('../dao/key-value.dao');

module.exports = new KoaRouter()
    .get('/keys', async (ctx) => {
      const keys = await KeyValueDao.getAllKeys();
      ctx.body = JSON.stringify(keys.map((x) => x['key']), null, 2);
    })
    .get('/key/:key', async (ctx) => {
      ctx.body = await KeyValueDao.getValue(ctx.params['key']);
    })
    .post('/key', async (ctx) => {
      await KeyValueDao.setValue(
          ctx.request.body.key,
          ctx.request.body.value,
      );
      ctx.response.status = 204;
    });
