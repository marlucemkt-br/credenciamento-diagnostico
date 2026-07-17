export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    let body = req.body;

    if (typeof body === "string") {
      body = JSON.parse(body);
    }

    const prompt = body?.prompt;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt vazio" });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "OPENAI_API_KEY não configurada",
      });
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-5.4-mini",
        input: prompt,
        max_output_tokens: 5000,
        text: {
          format: {
            type: "json_object",
          },
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Erro OpenAI:", data);

      return res.status(response.status).json({
        error: "Erro OpenAI",
        details: data,
      });
    }

    const texto = data.output
      ?.flatMap((item) => item.content || [])
      ?.find((content) => content.type === "output_text")
      ?.text;

    if (!texto) {
      return res.status(500).json({
        error: "A OpenAI não retornou texto",
        details: data,
      });
    }

    try {
      return res.status(200).json(JSON.parse(texto));
    } catch (parseError) {
      console.error("JSON inválido:", texto);

      return res.status(500).json({
        error: "A resposta da IA não veio em JSON válido",
        raw: texto,
      });
    }
  } catch (error) {
    console.error("Erro interno:", error);

    return res.status(500).json({
      error: error instanceof Error ? error.message : "Erro interno",
    });
  }
}
