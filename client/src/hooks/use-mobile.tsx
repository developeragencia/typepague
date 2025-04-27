import { useState, useEffect } from 'react';

export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Função para verificar se a tela é menor que o breakpoint
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Verifica inicialmente
    checkIsMobile();

    // Adiciona listener para redimensionamento
    window.addEventListener('resize', checkIsMobile);

    // Limpa o listener ao desmontar
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, [breakpoint]);

  return isMobile;
}