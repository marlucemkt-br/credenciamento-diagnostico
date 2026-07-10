export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    let body = req.body;
    if (typeof body === 'string') body = JSON.parse(body);

    const prompt = body?.prompt;
    if (!prompt) return res.status(400).json({ error: 'Prompt vazio' });

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) return res.status(500).json({ error: 'Chave não configurada' });

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5',
        max_tokens: 4000,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await response.json();
    if (!response.ok) return res.status(500).json({ error: 'Erro Anthropic', details: data });

    const texto = data.content?.[0]?.text || '{}';
    try {
      return res.status(200).json(JSON.parse(texto));
    } catch {
      const match = texto.match(/\{[\s\S]*\}/);
      return res.status(200).json(match ? JSON.parse(match[0]) : {});
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

