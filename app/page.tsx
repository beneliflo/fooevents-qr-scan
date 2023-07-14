import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { NextPage } from 'next';

const DynamicQRScanner = dynamic(() => import('./components/qr-scanner'), {
  ssr: false,
});

const ScanPage: NextPage = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div>
      {isClient && <DynamicQRScanner />}
    </div>
  );
};

export default ScanPage;