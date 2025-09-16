'use client'

import React from 'react'
import Link from 'next/link'
import { StyledTarotCard, CardIcon, CardName, CardDescription } from './TarotCard.styles'

export interface TarotCardProps {
  icon: string
  name: string
  description: string
  href: string
  onClick?: () => void
}

export const TarotCard: React.FC<TarotCardProps> = ({
  icon,
  name,
  description,
  href,
  onClick,
}) => {
  return (
    <Link href={href} passHref legacyBehavior>
      <StyledTarotCard onClick={onClick}>
        <CardIcon>{icon}</CardIcon>
        <CardName>{name}</CardName>
        <CardDescription>{description}</CardDescription>
      </StyledTarotCard>
    </Link>
  )
}

export default TarotCard
