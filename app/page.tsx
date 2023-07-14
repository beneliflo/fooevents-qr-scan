"use client"

import React, { useState } from 'react';
import QrReader from 'react-qr-scanner'

const QRScanner: React.FC<void> = () => {
  const [error, setError] = useState<any>(null);
  const [scannedData, setScannedData] = useState<any | null>(null);

  const handleError = (error: any) => {
    setError(error);
  };

  const handleScan = (data: any | null) => {
    if (data) {
      setScannedData(data.text);
      navigator.clipboard.writeText(data.text)
      window.open('https://eventik.app/wp-admin/admin.php?page=fooevents-express-checkin-page', '_blank')
    }
  };

  const copyToClipboard = () => {
    if (scannedData) {
      navigator.clipboard.writeText(scannedData)
    }
  };

  return (
    <div>
      <QrReader
        style={{ width: '100%' }}
        onError={handleError}
        onScan={handleScan}
        constraints={{
          video: { facingMode: "environment" }
        }}
      />
      {error && <p>{error.message}</p>}
      {scannedData && (
        <div>
          <p>Scanned data:</p>
          <pre>{JSON.stringify(scannedData, null, 2)}</pre>
          <button onClick={copyToClipboard}>Copy to Clipboard</button>
        </div>
      )}
    </div>
  );
};

export default QRScanner;