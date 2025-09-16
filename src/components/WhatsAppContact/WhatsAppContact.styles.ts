import styled from 'styled-components'

export const WhatsAppButton = styled.a`
  background: linear-gradient(45deg, #25D366, #128C7E);
  border: none;
  color: white;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  border-radius: 25px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: inherit;
  font-weight: 600;
  letter-spacing: 0.5px;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(37, 211, 102, 0.4);
    color: white;
    text-decoration: none;
  }

  &:active {
    transform: translateY(0);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(37, 211, 102, 0.3);
  }

  /* Efecto de brillo al pasar el mouse */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  &:hover::before {
    left: 100%;
  }
`

export const WhatsAppIcon = styled.div`
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin: 1rem 0;
`

export const ContactTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: #4ecdc4;
  text-align: center;
`

export const ContactText = styled.p`
  font-size: 1rem;
  opacity: 0.8;
  text-align: center;
  margin-bottom: 1rem;
  line-height: 1.5;
`

export const PhoneNumber = styled.span`
  font-weight: 600;
  color: #25D366;
  font-size: 1.1rem;
`
