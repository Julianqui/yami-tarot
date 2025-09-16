'use client'

import styled from 'styled-components'
import { NextLinkButton } from '@/components/Button/Button'

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
  font-size: 4rem;
  margin-bottom: 1rem;
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

const Subtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  text-align: center;
  opacity: 0.8;
`


export default function NotFound() {
  return (
    <Container>
      <Title>404</Title>
      <Subtitle>
        La página que buscas no existe en este universo místico
      </Subtitle>
      <NextLinkButton href="/">
        Volver al Inicio
      </NextLinkButton>
    </Container>
  )
}
