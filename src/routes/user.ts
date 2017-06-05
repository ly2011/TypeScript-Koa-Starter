import * as Router from "koa-router";
import userContainer from "../controllers/user";

const router = new Router();

router.get("/", function(ctx, next) {
  ctx.body = "this a users response!";
  ctx.status = 200;
  next();
});

router.all("/list", userContainer.find);
router.all("/find_one", userContainer.findOne);
router.all("/add", userContainer.create);
router.all("/login", userContainer.login);

export default router;
