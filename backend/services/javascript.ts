import { exec } from "child_process";
import fs from "fs";

export const getJavascriptOutput = async ({
  code,
  requestId,
}: {
  code: string;
  requestId: string;
}) => {
  await fs.writeFileSync(`./services/tmp/${requestId}.js`, code);

  exec(`node ./services/tmp/${requestId}.js`, (error, stdout, stderr) => {
    fs.unlinkSync(`./services/tmp/${requestId}.js`);
    if (error) {
      return fs.writeFileSync(`./services/tmp/${requestId}.txt`, error.message);
    }

    if (stderr) {
      return fs.writeFileSync(`./services/tmp/${requestId}.txt`, stderr);
    }

    return fs.writeFileSync(`./services/tmp/${requestId}.txt`, stdout);
  });
};
