'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FloatingContactButton, ContactIcon } from './FloatingContactButton.styles'

export const FloatingContactButtonComponent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Mostrar el botón después de un pequeño delay para que no sea invasivo
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleContactClick = () => {
    router.push('/contact')
  }

  return (
    <FloatingContactButton
      visible={isVisible}
      onClick={handleContactClick}
      aria-label="Ir a contacto"
      title="Contacto"
      className="pulse"
    >
      <ContactIcon>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      </ContactIcon>
    </FloatingContactButton>
  )
}

export default FloatingContactButtonComponent
