'use strict';

module.exports = function(Storeorder) {
  Storeorder.afterRemote('find', function(ctx, model, next) {
    if (!!ctx.args.filter && ctx.args.filter.requireTotalCount) {
      Storeorder.count().then(function(totalCount) {
        ctx.result = {
          totalCount: totalCount,
          data: model,
        };
        next();
      });
    } else {
      ctx.result = {
        data: model,
      };
      next();
    }
  });
  Storeorder.observe('access', function(ctx, next) {
    if (ctx.query.take) {
      ctx.query.limit = ctx.query.take;
    }
    if (ctx.query.sort) {
      ctx.query.order = ctx.query.sort;
    }
    next();
  });
};
