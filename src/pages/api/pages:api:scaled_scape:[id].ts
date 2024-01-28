// pages/api/scaled_scape/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import sharp from 'sharp';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || Array.isArray(id)) {
    res.status(400).json({ error: 'Invalid ID' });
    return;
  }

  const originalImageUrl = `https://cdn.scapes.xyz/scapes/lg/${id}.png`;

  // Load the original image
  const originalImage = await sharp(originalImageUrl).toBuffer();

  // Create a background image with the desired aspect ratio and color (e.g., white)
  const backgroundBuffer = await sharp({
    create: {
      width: Math.ceil(originalImage.length / 3), // Assuming 3 channels (RGB)
      height: Math.ceil(originalImage.length / 3),
      channels: 3, // RGB
      background: { r: 255, g: 255, b: 255, alpha: 1 }, // White background
    },
  }).toBuffer();

  // Composite the original image over the background
  const resizedBuffer = await sharp(backgroundBuffer)
    .composite([{ input: originalImage }])
    .toBuffer();

  const resizedImageUrl = `data:image/png;base64,${resizedBuffer.toString('base64')}`;

  res.status(200).json({ id, resizedImageUrl });
}
