// pages/api/randomscape.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import sharp from 'sharp';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Generate a random number, for example between 1 and 100
    const randomId = Math.floor(Math.random() * 9999) + 1;

    // Original image URL
    const originalImageUrl = `https://cdn.scapes.xyz/scapes/lg/${randomId}.png`;

    // Calculate the desired aspect ratio (1.91:1)
    const targetAspectRatio = 1.91 / 1;

    // Resize the image using sharp, adding black bars
    const resizedBuffer = await sharp(originalImageUrl)
      .resize({
        width: undefined, // Undefined width to maintain the original width
        height: Math.round(1000 / targetAspectRatio), // Calculate height based on the target aspect ratio
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 1 } // Black background
      })
      .toBuffer();

    // Convert the buffer to a base64-encoded string
    const resizedImageBase64 = resizedBuffer.toString('base64');

    // Append the random number to the post URL query parameter
    const postUrl = `https://random-scape.vercel.app/api/randomscape`;
    const resizedImageUrl = `data:image/png;base64,${resizedImageBase64}`;

    // Construct the HTML response
    const body = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charSet="utf-8"/>
          <meta name="viewport" content="width=device-width"/>
          <meta property="og:title" content="Frame" />
          <meta property="og:image" content="${resizedImageUrl}" />
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="${resizedImageUrl}" />
          <meta property="fc:frame:button:1" content="Gib random Scape" />
          <meta property="fc:frame:button:2" content="Scape #${randomId}" />
          <meta property="fc:frame:post_url" content="${postUrl}" />
        </head>
      </html>
    `;

    // Send the HTML response
    res.status(200).setHeader('Content-Type', 'text/html').send(body);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
