'use client'

import React from 'react'
import Link from 'next/link'
import { StyledButton, StyledLinkButton } from './Button/Button.styles'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  className?: string
}

interface LinkButtonProps {
  children: React.ReactNode
  href: string
  className?: string
  target?: string
  rel?: string
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  type = 'button',
  className,
}) => {
  return (
    <StyledButton
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {children}
    </StyledButton>
  )
}

export const LinkButton: React.FC<LinkButtonProps> = ({
  children,
  href,
  className,
  target,
  rel,
}) => {
  return (
    <StyledLinkButton
      href={href}
      className={className}
      target={target}
      rel={rel}
    >
      {children}
    </StyledLinkButton>
  )
}

export const NextLinkButton: React.FC<LinkButtonProps> = ({
  children,
  href,
  className,
  target,
  rel,
}) => {
  return (
    <Link href={href} passHref legacyBehavior>
      <StyledLinkButton
        className={className}
        target={target}
        rel={rel}
      >
        {children}
      </StyledLinkButton>
    </Link>
  )
}

export default Button
