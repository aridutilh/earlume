import { NextApiRequest, NextApiResponse } from "next";
import { IncomingForm, Fields, Files, File } from "formidable";

import fs from "fs";
import pdf from "pdf-parse";
import axios from "axios";
import { sleep } from "../../util/sleep";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { files, fields } = await new Promise<{ fields: Fields; files: Files }>(
    (resolve, reject) => {
      const form = new IncomingForm({ multiples: false });
      form.parse(req, (err, fields, files) => {
        if (err) {
          return reject(err);
        }
        resolve({ fields, files });
      });
    }
  );
  const bookPDF = files.bookPDF as File;
  const voiceID = fields.voiceID;

  let transcript;

  // data validation
  if (!bookPDF || !voiceID) {
    res.status(400).json({
      message: "Error creating AudioBook.",
      error: "Missing required fields",
      errorCode: "missing_fields",
    });
    return;
  }

  try {
    // extract transcript
    const dataBuffer = fs.readFileSync(bookPDF.filepath);
    const { text } = await pdf(dataBuffer);

    transcript = text;
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Error creating AudioBook.", error: e });
  }

  try {
    // create overdub
    const createOverdub = await axios.post(
      "https://descriptapi.com/v1/overdub/generate_async",
      {
        text: transcript,
        voice_id: voiceID,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.DESCRIPT_API_TOKEN}`,
        },
      }
    );

    if (!createOverdub.data?.id)
      return res.status(500).json({ message: "Error creating AudioBook." });

    // fetch overdub
    let fetchOverdub;

    await sleep(1000);

    while (true) {
      fetchOverdub = await axios.get(
        `https://descriptapi.com/v1/overdub/generate_async/${createOverdub.data.id}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.DESCRIPT_API_TOKEN}`,
          },
        }
      );

      if (fetchOverdub?.data?.state === "done" && fetchOverdub?.data?.url) {
        break;
      }

      await sleep(1000);
    }

    return res.status(200).json({
      message: "AudioBook Created Successfully.",
      data: {
        url: fetchOverdub.data.url,
      },
    });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ message: "Error creating AudioBook.", error: e });
  }
}
