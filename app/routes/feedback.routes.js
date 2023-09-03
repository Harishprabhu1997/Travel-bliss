module.exports = (app) => {
  const dbDataFunction = require("../controllers/feedback.controller");
  let router = require("express").Router();
  router.get("/", dbDataFunction.get);
  router.get("/:id", dbDataFunction.getById);
  router.delete("/:id", dbDataFunction.removedata);
  // router.put("/:id", dbDataFunction.updatedata);
  router.post("/", dbDataFunction.adddata);
  app.use("/api/feedback", router);
};
