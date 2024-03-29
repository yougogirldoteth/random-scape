// pages/api/randomscape.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const randomId = Math.floor(Math.random() * 9999) + 1;
    const postUrl = `https://random-scape.vercel.app/api/randomtinydino`;
    const scaledImageUrl = `https://random-scape.vercel.app/api/scaledtinydino/${randomId}`;

    const body = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8"/>
          <meta name="viewport" content="width=device-width"/>
          <meta property="og:title" content="Frame" />
          <meta property="og:image" content="${scaledImageUrl}" />
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="${scaledImageUrl}" />
          <meta property="fc:frame:button:1" content="give me a rawr 🤏🦖" />
          <meta property="fc:frame:post_url" content="${postUrl}" />
        </head>
      </html>
    `;

    res.status(200).setHeader('Content-Type', 'text/html').send(body);
  } catch (error) {
    console.error('Error generating random scape:', error);
    res.status(500).send('Internal Server Error');
  }
}
