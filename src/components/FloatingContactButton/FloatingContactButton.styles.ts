import styled from 'styled-components'

export const FloatingContactButton = styled.button<{ visible: boolean }>`
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(45deg, #25D366, #128C7E);
  border: none;
  color: white;
  font-size: 1.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: ${props => props.visible ? 1 : 0};
  visibility: ${props => props.visible ? 'visible' : 'hidden'};
  transform: ${props => props.visible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.8)'};
  z-index: 1000;
  box-shadow: 0 4px 20px rgba(37, 211, 102, 0.3);
  
  &:hover {
    transform: translateY(-3px) scale(1.1);
    box-shadow: 0 6px 25px rgba(37, 211, 102, 0.4);
  }

  &:active {
    transform: translateY(-1px) scale(1.05);
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
    border-radius: 50%;
  }

  &:hover::before {
    left: 100%;
  }

  /* Animación de pulso sutil */
  @keyframes subtlePulse {
    0% {
      box-shadow: 0 4px 20px rgba(37, 211, 102, 0.3);
    }
    50% {
      box-shadow: 0 4px 25px rgba(37, 211, 102, 0.5);
    }
    100% {
      box-shadow: 0 4px 20px rgba(37, 211, 102, 0.3);
    }
  }

  &.pulse {
    animation: subtlePulse 3s infinite;
  }

  /* Tooltip */
  &::after {
    content: 'Contacto';
    position: absolute;
    right: 70px;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    font-size: 0.9rem;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    pointer-events: none;
  }

  &:hover::after {
    opacity: 1;
    visibility: visible;
  }
`

export const ContactIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`
