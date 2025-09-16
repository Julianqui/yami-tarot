import styled from 'styled-components'

export const StyledTarotCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &:hover {
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 12px 40px 0 rgba(31, 38, 135, 0.5);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  }

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

export const CardIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  animation: float 3s ease-in-out infinite;
  position: relative;
  z-index: 1;
  
  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
  }
`

export const CardName = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #4ecdc4;
  position: relative;
  z-index: 1;
`

export const CardDescription = styled.p`
  font-size: 0.9rem;
  opacity: 0.8;
  line-height: 1.4;
  position: relative;
  z-index: 1;
`
