import { useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { DottedSurface } from './dotted-surface'

interface LoadingScreenProps {
  onLoadingComplete: () => void
}

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const duration = 2000
    const interval = 30
    const steps = duration / interval
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      const easeProgress = 1 - Math.pow(1 - currentStep / steps, 3)
      setProgress(Math.min(Math.round(easeProgress * 100), 100))

      if (currentStep >= steps) {
        clearInterval(timer)
        setIsExiting(true)
        setTimeout(() => {
          onLoadingComplete()
        }, 800)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [onLoadingComplete])

  useEffect(() => {
    if (!isExiting) {
      gsap.fromTo('.loading-content', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      )
      gsap.fromTo('.loading-bar', 
        { scaleX: 0 },
        { scaleX: 1, duration: 2, ease: 'power2.inOut' }
      )
    }
  }, [isExiting])

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0a] transition-all duration-700 ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <DottedSurface position="fixed" />
      <div className="loading-content flex flex-col items-center gap-8" style={{ position: 'relative', zIndex: 1 }}>
        <div className="relative flex items-center justify-center w-[80px] h-[80px] md:w-[100px] md:h-[100px]">
          <span className="text-[32px] md:text-[44px] font-light text-white absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            IM
          </span>
          <svg 
            className="absolute inset-0 w-full h-full animate-spin-slow"
            viewBox="0 0 100 100"
            style={{ 
              animationDuration: '3s',
              opacity: 0.2
            }}
          >
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              fill="none" 
              stroke="white" 
              strokeWidth="1"
              strokeDasharray="10 5"
            />
          </svg>
        </div>

        <div className="flex flex-col items-center gap-2">
          <span className="text-xs tracking-[0.4em] text-white/50 uppercase">
            Carregando
          </span>
          <span className="text-xs tracking-[0.4em] text-white/70">
            {progress}%
          </span>
        </div>

        <div className="w-48 h-[1px] bg-white/10 overflow-hidden">
          <div 
            className="loading-bar h-full bg-white origin-left"
            style={{ 
              transform: `scaleX(${progress / 100})`,
              transition: isExiting ? 'transform 0.8s ease-out' : 'none'
            }}
          />
        </div>

        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1 h-1 bg-white/30 rounded-full"
              style={{
                animation: 'loadingDots 1.4s infinite',
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes loadingDots {
          0%, 80%, 100% {
            transform: scale(0.6);
            opacity: 0.3;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  )
}
