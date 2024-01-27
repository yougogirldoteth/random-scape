// pages/api/post.ts
import type { NextApiRequest, NextApiResponse } from 'next';

const image_url = 'https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
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
        <meta property="fc:frame:button:1" content="Previous" />
        <meta property="fc:frame:post_url" content="https://frame-test-three.vercel.app/api/basepaint" />
        <met
      </head>
    </html>
  `;

  res.status(200).setHeader('Content-Type', 'text/html').send(body);
}
