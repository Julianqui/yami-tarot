import styled from 'styled-components'

export const ScrollToTopButton = styled.button<{ visible: boolean }>`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: ${props => props.visible ? 1 : 0};
  visibility: ${props => props.visible ? 'visible' : 'hidden'};
  transform: ${props => props.visible ? 'translateY(0)' : 'translateY(20px)'};
  z-index: 1000;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(-1px);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.3);
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

  /* Animación de pulso */
  @keyframes pulse {
    0% {
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }
    50% {
      box-shadow: 0 4px 25px rgba(255, 107, 107, 0.4);
    }
    100% {
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }
  }

  &.pulse {
    animation: pulse 2s infinite;
  }
`
