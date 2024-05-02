const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const config = require("./config");

const menu = require("./routes/menu");
const commandeRoutes = require("./routes/commande");
const authenRoutes = require("./routes/authen");

const authen = require("./authentification");
const oracledb = require("oracledb");

const app = express();
const { port, user_ora, password_ora, string_ora } = config;

app.use(bodyParser.json({ limit: "10mb" })); //Limitation de la taille des données JSON

app.use((req, res, next) => {
  console.log(`Accessing ${req.path}`);
  next();
});

app.get("/", (req, res) => {
  res.json({ message: "Bonjour, Hi" });
});

app.use("/cafehomer/authentification", authenRoutes);
app.use(authen.authentifier); // Premièrement authentifier l'usager
app.use("/cafehomer/menu", menu.menuRoutes);
app.use("/cafehomer/commandes", commandeRoutes);

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Écoute sur http://localhost:${port}`);
});

process.on("SIGINT", async () => {
  console.log("Arrêt du serveur");
  process.exit();
});
