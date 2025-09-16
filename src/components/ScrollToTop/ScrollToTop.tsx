'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

interface ScrollToTopProps {
  children: React.ReactNode
  smooth?: boolean
}

export const ScrollToTop: React.FC<ScrollToTopProps> = ({ 
  children, 
  smooth = true 
}) => {
  const pathname = usePathname()

  useEffect(() => {
    // Función para hacer scroll suave hacia arriba
    const scrollToTop = () => {
      if (smooth) {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        })
      } else {
        window.scrollTo(0, 0)
      }
    }

    // Ejecutar scroll to top cuando cambie la ruta
    scrollToTop()
  }, [pathname, smooth])

  return <>{children}</>
}

export default ScrollToTop
