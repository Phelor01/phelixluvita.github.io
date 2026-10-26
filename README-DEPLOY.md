# Phelix Luvita portfolio deployment

## What is included

- `index.html` — the responsive portfolio and chatbot interface.
- `api/chat.js` — a secure server endpoint for the OpenAI Responses API. The browser never receives the API key.
- `.env.example` — the environment variables required by the server.
- `vercel.json` — a small Vercel configuration for the serverless endpoint.

## Publish with Vercel

1. Create an account at [vercel.com](https://vercel.com) and import this project folder.
2. In the project settings, add `OPENAI_API_KEY` with your OpenAI secret key.
3. Add `OPENAI_MODEL` with `gpt-5.1`, or choose another model available in your account.
4. Deploy and open the generated HTTPS URL.
5. Test the chatbot at `/index.html#phelix-chatbot`.

Never put the OpenAI key into `index.html`, a public Git repository, or a browser script. The included endpoint uses the Responses API and a web-search tool for current questions when the deployed API account supports it.

## Make Phelix searchable on Google

After deployment, use Google Search Console to verify the domain, submit the public URL for indexing, and add a sitemap if you later have multiple pages. Replace the placeholder public URL with the real deployed URL before adding a sitemap. Google indexing is not instant or guaranteed, but the portfolio includes profile metadata to help Search understand that the page is about Phelix Luvita.
