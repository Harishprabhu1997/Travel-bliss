module.exports = (app) => {
    const dbDataFunction = require("../controllers/authController.js");
  
    let router = require("express").Router();
  
    router.post("/register", dbDataFunction.registerUser);
    router.post("/login", dbDataFunction.loginUser);
    router.post("/logout", dbDataFunction.logoutUser);
    router.get("/profile", dbDataFunction.profileGet);
    app.use("/api/auth", router);
  
    
  };