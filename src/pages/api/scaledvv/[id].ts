// pages/api/scaledtinydino/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { createCanvas, loadImage } from '@napi-rs/canvas';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    

    const { id } = req.query;
    const imageUrl = `public/images_vv_rare/${id}.png`;

    // Load the original square image using @napi-rs/canvas
    const originalImage = await loadImage(imageUrl);

    // Set the desired overall aspect ratio for the square image
    const targetAspectRatio = 1.91 / 1;

    // Calculate the new dimensions while maintaining the target aspect ratio
    let newWidth = Math.round(originalImage.height * targetAspectRatio);
    let newHeight = originalImage.height;

    // Create a canvas with the new dimensions using @napi-rs/canvas
    const canvas = createCanvas(newWidth, newHeight);
    const context = canvas.getContext('2d');

    // Draw a background with a color of your choice
    context.fillStyle = 'black';
    context.fillRect(0, 0, newWidth, newHeight);

    // Calculate the position to center the original square image on the canvas
    const x = (newWidth - originalImage.width) / 2;

    // Draw the original square image on the canvas
    context.drawImage(originalImage, x, 0, originalImage.width, newHeight);

    // Add Scape ID as text with Google Fonts on the left side
    const text = ``;
    context.fillStyle = 'white';
    context.font = 'bold 60px "Roboto Mono", sans-serif'; // Adjust font size and family
    const textMetrics = context.measureText(text);
    const textX = 40; // Adjust the left margin as needed
    const textY = newHeight - 10;

    context.fillText(text, textX, textY);

    // Convert the canvas to a Buffer containing the PNG image
    const buffer = canvas.toBuffer('image/png');

    // Set the Content-Type header to indicate PNG image
    res.setHeader('Content-Type', 'image/png');

    // Send the image data as the response
    res.status(200).send(buffer);
  } catch (error) {
    console.error('Error generating scaled square:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
