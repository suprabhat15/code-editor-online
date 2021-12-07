import { exec } from "child_process";
import fs from "fs";

export const getCPPOutput = async ({
  code,
  requestId,
}: {
  code: string;
  requestId: string;
}) => {
  await fs.writeFileSync(`./services/tmp/${requestId}.cpp`, code);

  exec(
    `g++ -o ./services/tmp/${requestId} ./services/tmp/${requestId}.cpp`,
    (error, stdout, stderr) => {
      fs.unlinkSync(`./services/tmp/${requestId}.cpp`);
      if (error) {
        return fs.writeFileSync(
          `./services/tmp/${requestId}.txt`,
          error.message
        );
      }

      if (stderr) {
        return fs.writeFileSync(`./services/tmp/${requestId}.txt`, stderr);
      }

      exec(`./services/tmp/${requestId}`, (error, stdout, stderr) => {
        if (error) {
          return fs.writeFileSync(
            `./services/tmp/${requestId}.txt`,
            error.message
          );
        }

        if (stderr) {
          return fs.writeFileSync(`./services/tmp/${requestId}.txt`, stderr);
        }

        fs.unlinkSync(`./services/tmp/${requestId}`);
        return fs.writeFileSync(`./services/tmp/${requestId}.txt`, stdout);
      });
    }
  );
};
