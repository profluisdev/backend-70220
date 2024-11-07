import express from "express";
import { connectDB } from "./config/mongoDB.config.js";
import router from "./router/index.router.js";
import session from "express-session";

const app = express();
connectDB()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
      secret: "secret",
      resave: true, // Mantiene la session activa, si esto est el false la session se cierra
      saveUninitialized: true, // Guarde la session
    })
  );

app.use("/api", router);

app.listen(8080, () => {
    console.log("Server on port 8080");
})