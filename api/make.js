export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const response = await fetch(process.env.MAKE_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req.body),
  });

  const text = await response.text();

  res.status(response.status).send(text);
}
