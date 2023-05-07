import compression from "compression";
import cors from "cors";
import express, { json, urlencoded } from "express";
import { config } from "dotenv";

config();

const { PORT } = process.env;

const app = express();

app.use(compression());
app.use(json());
app.use(cors());
app.use(urlencoded({ extended: false }));

async function init() {
  try {
    console.log("init");
    initRouter();
    initServer();
  } catch (error) {
    logger.error("unable to initialize app: ", error);
  }
}

async function initServer() {
  app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
  });
}

async function initRouter() {
  app.get("/", (_, res) => {
    res.json({
      data: {
        message: `Server connected to PORT:${PORT}!`,
      },
      error: null,
    });
  });
}

init();

export default app;
