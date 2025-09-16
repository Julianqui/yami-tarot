'use client'

import React from 'react'
import { StyledCard, CardContent, CardTitle, CardText, CardActions } from './Card.styles'

export interface CardProps {
  title?: string
  text?: string
  children?: React.ReactNode
  actions?: React.ReactNode
  className?: string
  maxWidth?: string
}

export const Card: React.FC<CardProps> = ({
  title,
  text,
  children,
  actions,
  className,
  maxWidth = '500px',
}) => {
  return (
    <StyledCard 
      className={className}
      style={{ maxWidth }}
    >
      <CardContent>
        {title && <CardTitle>{title}</CardTitle>}
        {text && <CardText>{text}</CardText>}
        {children}
        {actions && <CardActions>{actions}</CardActions>}
      </CardContent>
    </StyledCard>
  )
}

export default Card
