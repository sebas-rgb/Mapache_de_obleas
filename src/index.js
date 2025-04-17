import express from "express";
import { PORT } from "./config.js";
import userRoutes from './routes/users.routes.js';
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(userRoutes);
app.use(express.urlencoded({ extended: false }));

// Cambia esto para apuntar a tu carpeta real
app.use(express.static(process.cwd() + "/src/Front"));

// Ruta para servir index.html
app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/src/Front/index.html");
});

app.listen(PORT);
console.log("Server on port", PORT);
