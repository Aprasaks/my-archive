// app/components/GoogleAdsense.tsx

import Script from 'next/script';

type Props = {
  pId: string;
};

export default function GoogleAdsense({ pId }: Props) {
  if (process.env.NODE_ENV !== 'production') {
    return null; // 개발 환경(localhost)에서는 광고 스크립트 안 불러옴 (오류 방지)
  }

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${pId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
