import os from "node:os";
import { TelegramAPI } from "@/lib/telegram";
import fs from "node:fs/promises";
import { headers } from "next/headers";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

const telegramClient = new TelegramAPI();

export const POST = async (request: Request) => {
  const h = await headers();

  console.log({
    contentType: h.get("content-type"),
    userAgent: h.get("user-agent"),
  });

  const formData = await request.formData();
  const file = formData.get("file") as File;
  console.log(file);

  await telegramClient.sendMessage(`Information:\n
<b>Name</b>: Giorgi Sharashenidze`);

  //create temp folder
  const tmpDir = os.tmpdir();
  const tempFolder = path.join(tmpDir, "folder");
  const tempFile = path.join(tempFolder, "test.txt");

  const [, , content] = await Promise.all([
    fs.mkdir(tempFolder, {
      recursive: true,
    }),
    // write text.txt file here
    fs.writeFile(tempFolder, "content", "utf-8"),
    // get content
    fs.readFile(tempFile),
  ]);
  console.log(content);

  return new Response("ok");
};
