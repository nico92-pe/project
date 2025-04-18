'use client';

import { useState } from 'react';

export function useQRCode() {
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);

  const generateQRCode = async (inputUrl: string) => {
    if (!inputUrl) {
      setError('Please enter a valid URL');
      return;
    }

    try {
      setIsGenerating(true);
      setError(null);
      
      // Validate URL format
      let validUrl = inputUrl;
      if (!/^https?:\/\//i.test(inputUrl)) {
        validUrl = 'https://' + inputUrl;
      }
      
      // Using QR Server API instead of Google Charts
      // This service has better CORS support
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(validUrl)}`;
      
      // Create a test image to verify the URL works
      const testImage = new Image();
      testImage.crossOrigin = 'Anonymous';
      
      testImage.onload = () => {
        setQrCodeUrl(qrUrl);
        setOriginalUrl(validUrl);
        setIsGenerating(false);
      };
      
      testImage.onerror = () => {
        console.error('Failed to load QR code image');
        setError('Failed to generate QR code. Please try again.');
        setIsGenerating(false);
      };
      
      testImage.src = qrUrl;
      
    } catch (err) {
      console.error('Error generating QR code:', err);
      setError('Failed to generate QR code. Please try again.');
      setIsGenerating(false);
    }
  };

  const downloadQRCode = async (format: 'png' | 'jpeg' = 'png') => {
    if (!qrCodeUrl || !originalUrl) return;

    try {
      // Create a format-specific API URL
      const downloadUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&format=${format}&data=${encodeURIComponent(originalUrl)}`;
      
      // Fetch the image
      const response = await fetch(downloadUrl);
      const blob = await response.blob();
      
      // Create a temporary download link
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `qrcode-${new Date().getTime()}.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch (err) {
      console.error('Error downloading QR code:', err);
      setError(`Failed to download QR code as ${format.toUpperCase()}. Please try again.`);
    }
  };

  return {
    qrCodeUrl,
    isGenerating,
    error,
    generateQRCode,
    downloadQRCode
  };
}