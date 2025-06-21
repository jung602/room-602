import { useState, useEffect } from 'react';

export const useLoadingState = (minimumLoadingTime: number = 1500) => {
  const [isLoading, setIsLoading] = useState(true);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [contentLoaded, setContentLoaded] = useState(false);

  useEffect(() => {
    // 폰트 로딩 확인
    const checkFonts = async () => {
      if (typeof document !== 'undefined' && 'fonts' in document) {
        try {
          await document.fonts.ready;
          setFontLoaded(true);
        } catch (error) {
          console.warn('Font loading check failed:', error);
          setFontLoaded(true); // fallback
        }
      } else {
        // document.fonts가 지원되지 않는 경우 타이머로 처리
        setTimeout(() => setFontLoaded(true), 1000);
      }
    };

    // 컨텐츠 로딩 시뮬레이션 (이미지, 데이터 등)
    const simulateContentLoading = () => {
      // 실제로는 이미지나 API 호출 등의 로딩을 확인해야 함
      setTimeout(() => setContentLoaded(true), 800);
    };

    checkFonts();
    simulateContentLoading();
  }, []);

  useEffect(() => {
    if (fontLoaded && contentLoaded) {
      // 최소 로딩 시간 보장
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, minimumLoadingTime);

      return () => clearTimeout(timer);
    }
  }, [fontLoaded, contentLoaded, minimumLoadingTime]);

  return {
    isLoading,
    fontLoaded,
    contentLoaded
  };
}; 