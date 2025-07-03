import express from "express";
import 'dotenv/config';
import developerRouter from "./routes/developerRouter.js";
import gameRouter from "./routes/gameRouter.js";
import genreRouter from "./routes/genreRouter.js";
import platformRouter from "./routes/platformRouter.js";
import bodyParser from "body-parser";
import methodOverride from "method-override";

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
const __dirname = import.meta.dirname;
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded());
app.use(methodOverride((req, res) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/developers", developerRouter);
app.use("/games", gameRouter);
app.use("/genres", genreRouter);
app.use("/platforms", platformRouter);

app.use("/", (req, res) => {
  res.send("Not found");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));