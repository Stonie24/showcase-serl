// src/app/components/QRCodeComponent.tsx
import React from 'react';
import QRCode from 'qrcode.react';

interface QRCodeComponentProps {
  url: string; // URL to encode in the QR code
  size?: number; // Optional size prop
}

const QRCodeComponent: React.FC<QRCodeComponentProps> = ({ url, size = 128 }) => {
  return (
    <div className="flex justify-center items-center">
      <QRCode value={url} size={size} />
    </div>
  );
};

export default QRCodeComponent;

