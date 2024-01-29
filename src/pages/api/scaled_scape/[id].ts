// pages/api/scaled_scape/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { createCanvas, loadImage } from '@napi-rs/canvas'; // Updated import statement

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    const { id } = req.query;
    const imageUrl = `https://cdn.scapes.xyz/scapes/lg/${id}.png`;

    // Load the original image using @napi-rs/canvas
    const originalImage = await loadImage(imageUrl);

    // Set the desired overall aspect ratio
    const targetAspectRatio = 1.91 / 1;

    // Calculate the new dimensions while maintaining the original aspect ratio
    let newWidth = originalImage.width;
    let newHeight = originalImage.height;

    // Calculate the required height to achieve the target aspect ratio
    const targetHeight = Math.round(originalImage.width / targetAspectRatio);

    // Create a canvas with the new dimensions using @napi-rs/canvas
    const canvas = createCanvas(newWidth, targetHeight);
    const context = canvas.getContext('2d');

    // Draw a background with a color of your choice
    context.fillStyle = 'black';
    context.fillRect(0, 0, newWidth, targetHeight);

    // Calculate the position to center the original image on the canvas
    const y = (targetHeight - originalImage.height) / 2;

    // Draw the original image on the canvas
    context.drawImage(originalImage, 0, y, originalImage.width, originalImage.height);

    // Add Scape ID as text with Google Fonts
    const text = `Scape #${id}`;
    context.fillStyle = 'white';
    context.font = 'bold 60px "Roboto Mono", sans-serif'; // Adjust font size and family
    const textMetrics = context.measureText(text);
    const textX = (newWidth - textMetrics.width) / 2;
    const textY = targetHeight - 10;

    context.fillText(text, textX, textY);

    // Convert the canvas to a Buffer containing the PNG image
    const buffer = canvas.toBuffer('image/png');

    // Set the Content-Type header to indicate PNG image
    res.setHeader('Content-Type', 'image/png');

    // Send the image data as the response
    res.status(200).send(buffer);
  } catch (error) {
    console.error('Error generating scaled scape:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
