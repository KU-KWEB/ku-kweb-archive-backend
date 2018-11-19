const KoaRouter = require('koa-router');

module.exports.TestRouter = new KoaRouter()
    .get('/test/session', (ctx) => {
      ctx.redirect('/test/session/status');
    })
    .get('/test/session/status', (ctx) => {
      ctx.body = JSON.stringify(ctx.session, null, 2);
    })
    .get('/test/session/login', (ctx) => {
      ctx.session.login = true;
      ctx.redirect('/test/session/status');
    })
    .get('/test/session/logout', (ctx) => {
      ctx.session.login = false;
      ctx.redirect('/test/session/status');
    });
