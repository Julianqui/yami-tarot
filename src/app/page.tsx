'use client'

import styled from 'styled-components'
import Image from 'next/image'
import { Button } from '@/components/Button/Button'
import { Card } from '@/components/Card'
import { WhatsAppContact } from '@/components/WhatsAppContact'

// Datos de las lecturas - fuente de verdad mantenible
const LECTURAS = [
  { id: 'vincular', label: 'Lectura vincular' },
  { id: 'trabajo', label: 'Lectura de trabajo' },
  { id: 'preguntas', label: 'Preguntas específicas' },
  { id: 'general', label: 'Lectura general' },
] as const

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
  margin-bottom: 1.5rem;
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

const ProfileImageWrapper = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 2.5rem;
  box-shadow: 0 8px 32px rgba(255, 107, 107, 0.3),
              0 0 60px rgba(78, 205, 196, 0.2);
  border: 3px solid rgba(255, 255, 255, 0.2);
  position: relative;
  
  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
  }
`

const Bio = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;
  max-width: 500px;
`

const BioText = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  opacity: 0.95;
  margin-bottom: 0.75rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

const Inspirational = styled.p`
  font-size: 1rem;
  font-style: italic;
  opacity: 0.8;
  color: #4ecdc4;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`

const ButtonsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const ContactSection = styled.div`
  max-width: 500px;
  width: 100%;
  margin-top: 2rem;
`

export default function Home() {
  return (
    <Container>
      <Title>🌙 Yami Tarot 🌙</Title>
      <ProfileImageWrapper>
        <Image
          src="/yami-profile.png"
          alt="Yami - Tarotista profesional"
          fill
          sizes="(max-width: 768px) 120px, 150px"
          style={{ objectFit: 'cover' }}
          priority
        />
      </ProfileImageWrapper>
      <Bio>
        <BioText>
          Soy tarotista profesional. Te hablo con la verdad y claridad.
        </BioText>
        <Inspirational>
          &ldquo;Las cartas no predicen el futuro, iluminan el camino para que tú lo construyas&rdquo;
        </Inspirational>
      </Bio>
      <Card
        text="Descubre los secretos del universo a través de las cartas del tarot"
        actions={
          <ButtonsGrid>
            {LECTURAS.map((lectura) => (
              <Button key={lectura.id}>
                {lectura.label}
              </Button>
            ))}
          </ButtonsGrid>
        }
      />
      <ContactSection>
        <WhatsAppContact
          phoneNumber="+54 9 11 5023-5826"
          message="Hola! Me interesa conocer más sobre las lecturas de tarot 🌙✨"
          title="¡Hablemos por WhatsApp!"
          description="Envía un mensaje directo para coordinar tu consulta personalizada"
          showPhoneNumber={false}
        />
      </ContactSection>
    </Container>
  )
}
