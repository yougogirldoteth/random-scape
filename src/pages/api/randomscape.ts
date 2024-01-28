// pages/api/randomscape.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import sharp from 'sharp';  // Import sharp library

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Generate a random number, for example between 1 and 100
  const randomId = Math.floor(Math.random() * 9999) + 1;

  // Image URL with the original size
  const originalImageUrl = `https://cdn.scapes.xyz/scapes/lg/${randomId}.png`;

  // Desired aspect ratio (1.91:1)
  const targetAspectRatio = 1.91 / 1;

  // Resize the image using sharp
  const resizedBuffer = await sharp(originalImageUrl)
    .resize({
      width: 1000,  // Adjust the width based on your needs
      height: Math.round(1000 / targetAspectRatio),  // Calculate height based on aspect ratio
      fit: 'cover',  // or 'contain' based on your cropping preference
    })
    .toBuffer();

  // Base64 encode the resized image for embedding in HTML
  const resizedImageBase64 = resizedBuffer.toString('base64');

  // Append the random number to the post URL query parameter
  const postUrl = `https://random-scape.vercel.app/api/randomscape`;
  const resizedImageUrl = `data:image/png;base64,${resizedImageBase64}`;

  const body = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width"/>
        <meta property="og:title" content="Frame" />
        <meta property='og:image' content="${resizedImageUrl}" />  <!-- Use the resized image URL -->
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${resizedImageUrl}" />  <!-- Use the resized image URL -->
        <meta property="fc:frame:button:1" content="Gib random Scape" />
        <meta property="fc:frame:button:2" content="Scape #${randomId}" />
        <meta property="fc:frame:post_url" content="${postUrl}" />
      </head>
    </html>
  `;

  res.status(200).setHeader('Content-Type', 'text/html').send(body);
}
