// pages/api/scaled_scape/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { createCanvas, loadImage } from 'canvas';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    const imageUrl = `https://cdn.scapes.xyz/scapes/lg/${id}.png`;

    // Load the original image
    const originalImage = await loadImage(imageUrl);

    // Set the desired aspect ratio
    const targetAspectRatio = 1.91 / 1;

    // Calculate the new dimensions while maintaining the aspect ratio
    let newWidth = originalImage.width;
    let newHeight = originalImage.height;

    if (originalImage.width / originalImage.height > targetAspectRatio) {
      newWidth = originalImage.height * targetAspectRatio;
    } else {
      newHeight = originalImage.width / targetAspectRatio;
    }

    // Create a canvas with the new dimensions
    const canvas = createCanvas(newWidth, newHeight);
    const context = canvas.getContext('2d');

    // Draw a background with a color of your choice
    context.fillStyle = 'black';
    context.fillRect(0, 0, newWidth, newHeight);

    // Calculate the position to center the image on the canvas
    const x = (newWidth - originalImage.width) / 2;
    const y = (newHeight - originalImage.height) / 2;

    // Draw the scaled image on the canvas
    context.drawImage(originalImage, x, y, originalImage.width, originalImage.height);

    // Add Scape ID as text
    context.fillStyle = 'white';
    context.font = '20px Arial';
    context.fillText(`Scape #${id}`, 10, newHeight - 10);

    // Convert the canvas to a data URL
    const scaledImageUrl = canvas.toDataURL();

    // Send the scaled image URL as the response
    res.status(200).json({ scaledImageUrl });
  } catch (error) {
    console.error('Error generating scaled scape:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
