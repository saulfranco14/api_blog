import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { config as dotenvConfig } from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

dotenvConfig();

const app = express();
const port = process.env.PORT || 4000;

app.use(helmet());
app.use(bodyParser.json({ limit: "50kb" }));

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 300,
});

app.use(limiter);


app.use(cors());
app.use(bodyParser.json());


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`La API está funcionando en el puerto ${port}`);
});
