'use client'

import React, { useState, useEffect } from 'react'
import { ScrollToTopButton } from './ScrollToTopButton.styles'

export const ScrollToTopButtonComponent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      // Mostrar el botón cuando el usuario haga scroll más de 300px
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    // Agregar event listener
    window.addEventListener('scroll', toggleVisibility)

    // Cleanup
    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }

  return (
    <ScrollToTopButton
      visible={isVisible}
      onClick={scrollToTop}
      aria-label="Volver arriba"
      title="Volver arriba"
    >
      ↑
    </ScrollToTopButton>
  )
}

export default ScrollToTopButtonComponent
