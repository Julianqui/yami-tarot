'use client'

import styled from 'styled-components'
import { Card } from '@/components/Card'
import { NextLinkButton } from '@/components/Button/Button'
import { TarotCard } from '@/components/TarotCard'

const Container = styled.main`
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
`

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 2rem;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 800px;
  width: 100%;
  margin: 2rem 0;
`


const Instructions = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  max-width: 600px;
`

const InstructionText = styled.p`
  font-size: 1.1rem;
  opacity: 0.9;
  line-height: 1.6;
  margin-bottom: 1rem;
`

export default function ReadingPage() {
  const tarotCards = [
    {
      icon: '🌙',
      name: 'La Luna',
      description: 'Intuición y misterio',
      href: '/cards/luna'
    },
    {
      icon: '☀️',
      name: 'El Sol',
      description: 'Alegría y éxito',
      href: '/cards/sol'
    },
    {
      icon: '⭐',
      name: 'La Estrella',
      description: 'Esperanza y guía',
      href: '/cards/estrella'
    },
    {
      icon: '🌊',
      name: 'El Agua',
      description: 'Emociones profundas',
      href: '/cards/agua'
    },
    {
      icon: '🔥',
      name: 'El Fuego',
      description: 'Pasión y energía',
      href: '/cards/fuego'
    },
    {
      icon: '🌍',
      name: 'La Tierra',
      description: 'Estabilidad y crecimiento',
      href: '/cards/tierra'
    }
  ]

  return (
    <Container>
      <Title>🔮 Lectura de Tarot 🔮</Title>
      
      <Instructions>
        <InstructionText>
          Cierra los ojos, respira profundamente y deja que tu intuición te guíe.
        </InstructionText>
        <InstructionText>
          Selecciona tres cartas que resuenen contigo en este momento.
        </InstructionText>
      </Instructions>

      <CardGrid>
        {tarotCards.map((card, index) => (
          <TarotCard 
            key={index}
            icon={card.icon}
            name={card.name}
            description={card.description}
            href={card.href}
          />
        ))}
      </CardGrid>

      <Card
        text="Una vez que hayas seleccionado tus cartas, podrás descubrir el mensaje que el universo tiene para ti."
        actions={
          <NextLinkButton href="/">
            Volver al Inicio
          </NextLinkButton>
        }
      />
    </Container>
  )
}
