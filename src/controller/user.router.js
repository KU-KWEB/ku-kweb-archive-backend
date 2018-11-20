const KoaRouter = require('koa-router');

const {UserDao} = require('../dao/user.dao.js');

module.exports = new KoaRouter()
    .post('/api/user/join', async (ctx) => {
      const {identity, email} = ctx.request.body;
      await UserDao.createUser(identity, '_credential', email);
      ctx.response.status = 204;
    });
