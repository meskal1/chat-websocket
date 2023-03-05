import { FC, AnimationEvent, useState, useEffect } from 'react'

import Typewriter from 'typewriter-effect'

import azureChat from '../../assets/icons/azureChat.svg'
import whiteChat from '../../assets/icons/whiteChat.svg'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useImagePreloader } from '../../hooks/useImagePreloader'

import './IntroAnimation.scss'

const preloadSrcList: string[] = [azureChat, whiteChat]

type IntroAnimationType = {
  isAnimationLoaded: () => void
}

export const IntroAnimation: FC<IntroAnimationType> = ({ isAnimationLoaded }) => {
  const isInitialized = useAppSelector(state => state.app.isInitialized)
  const [animationLoaded, setAnimationLoaded] = useState(false)
  const [isImgLoaded, setIsImgLoaded] = useState(false)
  const { imagesPreloaded } = useImagePreloader(preloadSrcList)
  const [autoStart, setAutoStart] = useState(false)

  const handleAnimationEnd = (e: AnimationEvent<HTMLDivElement>) => {
    setAnimationLoaded(true)
    setAutoStart(true)
  }

  useEffect(() => {
    if (imagesPreloaded) {
      setIsImgLoaded(true)
    }

    if (animationLoaded) {
      setTimeout(() => isAnimationLoaded(), 3200)
    }
  }, [isInitialized, animationLoaded, imagesPreloaded])

  return (
    <>
      {isImgLoaded && (
        <div className="container">
          <div className="content">
            <img className="azure-chat" src={azureChat} alt="" />
            <div className="logo-text">
              <Typewriter
                options={{
                  strings: [`Simple chat`],
                  autoStart: autoStart,
                  loop: false,
                  //@ts-ignore
                  pauseFor: 5000000,
                  cursorClassName: 'typewriter-cursor',
                }}
              />
            </div>
            <img
              className="white-chat"
              onAnimationEnd={handleAnimationEnd}
              src={whiteChat}
              alt=""
            />
          </div>
        </div>
      )}
    </>
  )
}
