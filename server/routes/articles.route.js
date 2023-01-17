const express = require("express");
const router = express.Router();
const articlesController = require("../controllers/articles.controller");

// MIDLEWARE
const auth = require("../middleware/auth");

// ROUTES
router.post(
  "/",
  auth("createAny", "articles"),
  articlesController.createArticle
);

router
  .route("/article/:id")
  .get(auth("readAny", "articles"), articlesController.getArticleById)
  .patch(auth("updateAny", "articles"), articlesController.updateArticleById)
  .delete(auth("deleteAny", "articles"), articlesController.deleteArticleById);

router.route("/users/article/:id").get(articlesController.getUsersArticleById);

router
  .route("/all")
  .get(articlesController.getAllArticles)
  .post(articlesController.getMoreArticles);

router.post(
  "/admin/paginate",
  auth("readAny", "articles"),
  articlesController.adminPaginate
);

module.exports = router;
