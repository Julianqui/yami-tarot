'use client'

import styled from 'styled-components'
import { Card } from '@/components/Card'
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
  font-size: 3rem;
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

const CardIcon = styled.div`
  font-size: 5rem;
  margin-bottom: 2rem;
  animation: float 3s ease-in-out infinite;
  
  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
  }
`

const ReadingSection = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 2rem 0;
`

const ReadingText = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  margin-bottom: 2rem;
`

const ReadingTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #4ecdc4;
  text-align: center;
`

const ReadingContent = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  opacity: 0.9;
  text-align: justify;
`

export default function TierraPage() {
  return (
    <Container>
      <CardIcon>🌍</CardIcon>
      <Title>La Tierra</Title>
      
      <ReadingSection>
        <ReadingText>
          <ReadingTitle>Interpretación</ReadingTitle>
          <ReadingContent>
            La Tierra representa la estabilidad, el crecimiento y la conexión con la naturaleza. Esta carta te invita a echar raíces sólidas y construir una base estable para tu futuro. Es un momento para la paciencia, el trabajo constante y la conexión con lo material y práctico.
          </ReadingContent>
        </ReadingText>

        <ReadingText>
          <ReadingTitle>Mensaje del Universo</ReadingTitle>
          <ReadingContent>
            El universo te está pidiendo que te conectes con la tierra y construyas algo duradero. Es tiempo de ser práctico, trabajar con constancia y permitir que tus proyectos crezcan de manera orgánica y sostenible.
          </ReadingContent>
        </ReadingText>

        <ReadingText>
          <ReadingTitle>Consejo</ReadingTitle>
          <ReadingContent>
            Enfócate en construir bases sólidas para tus proyectos. Sé paciente y constante en tus esfuerzos. La Tierra te recuerda que el crecimiento real toma tiempo y requiere dedicación.
          </ReadingContent>
        </ReadingText>
      </ReadingSection>

      <Card
        text="La Tierra te da estabilidad y te ayuda a construir un futuro sólido."
        actions={
          <>
            <NextLinkButton href="/reading">
              Volver a las Cartas
            </NextLinkButton>
            <NextLinkButton href="/">
              Inicio
            </NextLinkButton>
          </>
        }
      />
    </Container>
  )
}
