const profile = `You are Phelix Chatbot, the helpful public assistant for Phelix Luvita's portfolio.
Phelix Luvita is a Diploma graduate in Health Records and Information Management from Imperial College of Medical and Health Sciences. He trained at Vihiga Teaching and Referral Hospital and gained experience in central records, ICD-10 and ICD-11 disease classification, clinical appointments and scheduling, medical records filing, morbidity and mortality coding, sorting records, audits, CCC HIV and TB follow-up, emergency, reception, laboratory, wards, morgue, maternity, MCH, dental, eye, oncology, mental health and radiology.
He is interested in C, C++, Visual Basic, JavaScript, HTML, CSS, MySQL, Power BI, KoboToolbox, Python, data analysis, academic writing, research, APA and MLA referencing. His email is phelixluvita348@gmail.com.
Answer the user's actual question clearly and naturally. For questions about Phelix, use only the profile facts above. For general questions, answer helpfully and safely. Do not claim to be a human or to have private access. For medical or legal questions, provide general information and advise the user to consult a qualified professional. Keep answers concise unless the user asks for depth.`;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST requests only.' });
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return res.status(503).json({ error: 'The AI service is not configured yet.' });
  const { message, history = [] } = req.body || {};
  if (typeof message !== 'string' || !message.trim()) return res.status(400).json({ error: 'A message is required.' });
  if (message.length > 4000) return res.status(413).json({ error: 'Message is too long.' });

  const safeHistory = Array.isArray(history) ? history.slice(-10).filter(item => item && (item.role === 'user' || item.role === 'assistant') && typeof item.content === 'string').map(item => ({ role: item.role, content: item.content.slice(0, 4000) })) : [];
  const input = [...safeHistory, { role: 'user', content: message.trim() }];
  try {
    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-5.1',
        instructions: profile,
        input,
        tools: [{ type: 'web_search' }],
        store: false
      })
    });
    const data = await response.json();
    if (!response.ok) return res.status(502).json({ error: data.error?.message || 'The AI provider returned an error.' });
    const reply = data.output_text || data.output?.flatMap(item => item.content || []).map(part => part.text).filter(Boolean).join('\n') || 'I could not generate a response.';
    return res.status(200).json({ reply });
  } catch (error) {
    return res.status(500).json({ error: 'Unable to reach the AI service.' });
  }
}
