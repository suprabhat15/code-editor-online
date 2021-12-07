import { exec } from "child_process";
import fs from "fs";

export const getPythonOutput = async ({
  code,
  requestId,
}: {
  code: string;
  requestId: string;
}) => {
  await fs.writeFileSync(`./services/tmp/${requestId}.py`, code);

  exec(`python ./services/tmp/${requestId}.py`, (error, stdout, stderr) => {
    fs.unlinkSync(`./services/tmp/${requestId}.py`);
    if (error) {
      return fs.writeFileSync(`./services/tmp/${requestId}.txt`, error.message);
    }

    if (stderr) {
      return fs.writeFileSync(`./services/tmp/${requestId}.txt`, stderr);
    }

    return fs.writeFileSync(`./services/tmp/${requestId}.txt`, stdout);
  });
};
