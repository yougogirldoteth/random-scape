// pages/api/randomcheck.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Generate a random number, for example between 1 and 100
  const randomId = Math.floor(Math.random() * 16000) + 1;

  // Append the random number to the post URL query parameter
  const postUrl = `https://random-scape.vercel.app/api/randomanimatedscape`;
  const image_url = `https://scapes.punkscape.xyz/?simple&autoplay&autoscale=false&chapter-switch=false&sound-control=false#${randomId}`;


  const body = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charSet="utf-8"/>
        <meta property="og:title" content="Frame" />
        <meta property='og:image' content=${image_url} />
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${image_url}" />
        <meta property="fc:frame:button:1" content="Gib Random Scape" />
        <meta property="fc:frame:button:2" content="Scape #${randomId}" />
        <meta property="fc:frame:post_url" content="${postUrl}" />
      </head>
    </html>
  `;

  res.status(200).setHeader('Content-Type', 'text/html').send(body);
}
