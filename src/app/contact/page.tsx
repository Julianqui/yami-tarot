'use client'

import styled from 'styled-components'
import { Card } from '@/components/Card'
import { NextLinkButton } from '@/components/Button/Button'
import { WhatsAppContact } from '@/components/WhatsAppContact'

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

const ContactSection = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 2rem 0;
`

const ContactInfo = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  margin-bottom: 2rem;
  text-align: center;
`

const ContactTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #4ecdc4;
`

const ContactText = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  opacity: 0.9;
  margin-bottom: 1.5rem;
`

const ServicesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
`

const ServiceItem = styled.li`
  font-size: 1rem;
  margin-bottom: 0.8rem;
  padding-left: 1.5rem;
  position: relative;
  
  &::before {
    content: '✨';
    position: absolute;
    left: 0;
    top: 0;
  }
`

const PhoneNumber = styled.div`
  font-size: 1.3rem;
  font-weight: 600;
  color: #25D366;
  margin: 1rem 0;
  padding: 1rem;
  background: rgba(37, 211, 102, 0.1);
  border-radius: 10px;
  border: 1px solid rgba(37, 211, 102, 0.3);
`

export default function ContactPage() {
  return (
    <Container>
      <Title>📞 Contacto</Title>
      
      <ContactSection>
        <ContactInfo>
          <ContactTitle>Conecta conmigo</ContactTitle>
          <ContactText>
            ¿Te sientes llamado por las cartas? ¿Necesitas una guía espiritual personalizada? 
            Estoy aquí para ayudarte en tu viaje de autoconocimiento y crecimiento personal.
          </ContactText>
          
          <ServicesList>
            <ServiceItem>Lecturas de tarot personalizadas</ServiceItem>
            <ServiceItem>Consultas espirituales privadas</ServiceItem>
            <ServiceItem>Guía en momentos de incertidumbre</ServiceItem>
            <ServiceItem>Interpretación de sueños y sincronías</ServiceItem>
            <ServiceItem>Meditación y conexión espiritual</ServiceItem>
          </ServicesList>

          <PhoneNumber>
            📱 +54 9 11 5023-5826
          </PhoneNumber>
        </ContactInfo>

        <WhatsAppContact
          phoneNumber="+54 9 11 5023-5826"
          message="Hola! Me interesa conocer más sobre las lecturas de tarot y consultas espirituales 🌙✨"
          title="¡Hablemos por WhatsApp!"
          description="Envía un mensaje directo para coordinar tu consulta personalizada"
          showPhoneNumber={false}
        />

        <Card
          text="Las consultas están disponibles de lunes a viernes de 10:00 a 20:00 hs. Respeto tu privacidad y mantengo la confidencialidad en todas las sesiones."
          actions={
            <>
              <NextLinkButton href="/reading">
                Ver Cartas
              </NextLinkButton>
              <NextLinkButton href="/">
                Inicio
              </NextLinkButton>
            </>
          }
        />
      </ContactSection>
    </Container>
  )
}
