export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");

    return res.status(405).json({
      error: "Método não permitido",
    });
  }

  try {
    let body = req.body;

    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch {
        return res.status(400).json({
          error: "Corpo da requisição inválido",
        });
      }
    }

    const prompt = body?.prompt;

    if (typeof prompt !== "string" || !prompt.trim()) {
      return res.status(400).json({
        error: "Prompt vazio",
      });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      console.error("OPENAI_API_KEY não configurada");

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
        model: "gpt-5-mini",
        input: prompt,
        max_output_tokens: 5000,
        text: {
          format: {
            type: "json_object",
          },
        },
      }),
    });

    const rawResponse = await response.text();

    let data;

    try {
      data = JSON.parse(rawResponse);
    } catch {
      console.error("Resposta não JSON da OpenAI:", rawResponse);

      return res.status(502).json({
        error: "A OpenAI retornou uma resposta inválida",
        raw: rawResponse,
      });
    }

    if (!response.ok) {
      console.error("Erro OpenAI:", data);

      return res.status(response.status).json({
        error: "Erro OpenAI",
        details: data,
      });
    }

    const texto = data.output
      ?.flatMap((item) =>
        Array.isArray(item.content) ? item.content : []
      )
      ?.find((content) => content.type === "output_text")
      ?.text;

    if (!texto) {
      console.error("Resposta sem output_text:", data);

      return res.status(500).json({
        error: "A OpenAI não retornou texto",
        details: data,
      });
    }

    try {
      const diagnostico = JSON.parse(texto);

      return res.status(200).json(diagnostico);
    } catch {
      console.error("JSON inválido gerado pela OpenAI:", texto);

      return res.status(500).json({
        error: "A resposta da IA não veio em JSON válido",
        raw: texto,
      });
    }
  } catch (error) {
    console.error("Erro interno:", error);

    return res.status(500).json({
      error:
        error instanceof Error
          ? error.message
          : "Erro interno inesperado",
    });
  }
}
