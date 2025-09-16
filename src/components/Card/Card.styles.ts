import styled from 'styled-components'

export const StyledCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  text-align: center;
  max-width: 500px;
  width: 100%;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px 0 rgba(31, 38, 135, 0.5);
  }

  /* Efecto de brillo sutil */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  }

  /* Efecto de partículas flotantes */
  &::after {
    content: '';
    position: absolute;
    top: 20%;
    left: 10%;
    width: 4px;
    height: 4px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    animation: float 6s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
      opacity: 0.3;
    }
    50% {
      transform: translateY(-20px);
      opacity: 0.8;
    }
  }
`

export const CardContent = styled.div`
  position: relative;
  z-index: 1;
`

export const CardTitle = styled.h2`
  font-size: 1.8rem;
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

export const CardText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  text-align: center;
  opacity: 0.9;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
`

export const CardActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
`
