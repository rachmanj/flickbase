const httpStatus = require("http-status");
const { authService, emailService } = require("../services");

const authController = {
  async register(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await authService.createUser(email, password);
      const token = await authService.genAuthToken(user);

      // send verification email
      // await emailService.registerEmail(email, user);

      res.cookie("x-access-token", token).status(httpStatus.CREATED).send({
        user,
        token,
      });
    } catch (error) {
      next(error);
    }
  },

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await authService.loginUser(email, password);
      const token = await authService.genAuthToken(user);

      // set cookie
      res.cookie("x-access-token", token).send({ user, token });
    } catch (error) {
      next(error);
    }
  },

  async isAuth(req, res, next) {
    res.json(req.user);
  },

  async testRole(req, res, next) {
    res.json({ ok: "yes" });
  },
};

module.exports = authController;
