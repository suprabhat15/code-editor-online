import { exec } from "child_process";
import fs from "fs";

export const getCOutput = async ({
  code,
  requestId,
}: {
  code: string;
  requestId: string;
}) => {
  await fs.writeFileSync(`./services/tmp/${requestId}.c`, code);

  exec(
    `gcc -o ./services/tmp/${requestId} ./services/tmp/${requestId}.c `,
    (error, stdout, stderr) => {
      fs.unlinkSync(`./services/tmp/${requestId}.c`);

      if (error) {
        return fs.writeFileSync(
          `./services/tmp/${requestId}.txt`,
          error.toString()
        );
      }

      if (stderr) {
        return fs.writeFileSync(`./services/tmp/${requestId}.txt`, stderr);
      }

      exec(`./services/tmp/${requestId}`, async (error, stdout, stderr) => {
        fs.unlinkSync(`./services/tmp/${requestId}`);
        if (error) {
          return fs.writeFileSync(
            `./services/tmp/${requestId}.txt`,
            error.message
          );
        }

        if (stderr) {
          return fs.writeFileSync(`./services/tmp/${requestId}.txt`, stderr);
        }

        return fs.writeFileSync(`./services/tmp/${requestId}.txt`, stdout);
      });
    }
  );
};
