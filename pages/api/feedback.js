import fs from "fs";
import path from "path";

const buildFilePath = () => {
  return path.join(process.cwd(), "data", "feedback.json");
};

const fileReader = (filePath) => {
  const readFile = fs.readFileSync(filePath);
  const data = JSON.parse(readFile);
  return data;
};

const handler = (req, res) => {
  if (req.method === "POST") {
    const email = req.body.email;
    const feedback = req.body.feedback;

    const newFeedback = {
      id: new Date().toISOString(),
      email,
      text: feedback,
    };

    const filePath = buildFilePath();
    const data = fileReader(filePath);
    data.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(data));

    res.status(201).json({ message: "Success!", feedback: newFeedback });
  } else {
    const filePath = buildFilePath();
    const data = fileReader(filePath);
    res.status(200).json({ feedback: data });
  }
};

export default handler;
