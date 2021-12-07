import express from "express";
import cors from "cors";
import fs from "fs";
import { getCOutput } from "./services/c";
import { getCPPOutput } from "./services/cpp";
import { getPythonOutput } from "./services/python";
import { getJavascriptOutput } from "./services/javascript";

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("API for code editor");
});

app.post("/api/generateCode/:requestId", async (req, res) => {
  const { code, language } = req.body;

  const requestId = req.params.requestId;

  if (language === "c") {
    await getCOutput({ code, requestId });
  }

  if (language === "c++") {
    await getCPPOutput({ code, requestId });
  }

  if (language === "python") {
    await getPythonOutput({ code, requestId });
  }

  if (language === "javascript") {
    await getJavascriptOutput({ code, requestId });
  }

  res.send("Code generated successfully");
});

app.get("/api/output/:requestId", async (req, res) => {
  const requestId = req.params.requestId;
  const output = await fs.readFileSync(`./services/tmp/${requestId}.txt`);

  res.send(output);
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
