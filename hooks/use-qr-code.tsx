'use client';

import { useState } from 'react';

type QRCodeOptions = {
  format: 'png' | 'jpeg';
  size: number;
};

export function useQRCode() {
  const [url, setUrl] = useState<string>('');
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const generateQRCode = async (inputUrl: string, options: QRCodeOptions = { format: 'png', size: 300 }) => {
    if (!inputUrl) {
      setError('Please enter a URL');
      return;
    }

    try {
      setIsGenerating(true);
      setError(null);
      
      // Using the Google Charts API to generate QR codes
      const encodedUrl = encodeURIComponent(inputUrl);
      const qrUrl = `https://chart.googleapis.com/chart?cht=qr&chl=${encodedUrl}&chs=${options.size}x${options.size}&choe=UTF-8`;
      
      setQrCodeUrl(qrUrl);
      setUrl(inputUrl);
    } catch (err) {
      setError('Failed to generate QR code');
      console.error('Error generating QR code:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadQRCode = (format: 'png' | 'jpeg') => {
    if (!qrCodeUrl) return;

    // Create a canvas to convert the image if needed
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const image = new Image();
    
    image.crossOrigin = 'Anonymous';
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      context?.drawImage(image, 0, 0);
      
      // Get the data URL with the correct format
      const dataUrl = canvas.toDataURL(`image/${format}`);
      
      // Create a download link and trigger it
      const link = document.createElement('a');
      link.download = `qrcode-${new Date().getTime()}.${format}`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
    
    image.src = qrCodeUrl;
  };

  return {
    url,
    setUrl,
    qrCodeUrl,
    isGenerating,
    error,
    generateQRCode,
    downloadQRCode,
  };
}