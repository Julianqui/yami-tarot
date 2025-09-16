'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export const useScrollToTop = (smooth: boolean = true) => {
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

  // Función manual para hacer scroll to top
  const scrollToTopManual = (smoothScroll: boolean = true) => {
    if (smoothScroll) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    } else {
      window.scrollTo(0, 0)
    }
  }

  return { scrollToTopManual }
}
