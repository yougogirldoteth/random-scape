// pages/api/randomscape.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Generate a random number, for example between 1 and 100
  const randomId = Math.floor(Math.random() * 9999) + 1;

  // Append the random number to the post URL query parameter
  const postUrl = `https://random-scape.vercel.app/api/randomscape`;
  const image_url = `https://cdn.scapes.xyz/scapes/lg/${randomId}.png`;


  const body = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width"/>
        <meta property="og:title" content="Frame" />
        <meta property='og:image' content=${image_url} />
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${image_url}" />
        <meta property="fc:frame:button:1" content="Gib random Scape" />
        <meta property="fc:frame:button:2" content="Scape #${randomId}" />
        <meta property="fc:frame:post_url" content="${postUrl}" />
      </head>
    </html>
  `;

  res.status(200).setHeader('Content-Type', 'text/html').send(body);
}
