import { ReactLenis, useLenis } from 'lenis/react'
import { useEffect, useState, createContext, useContext } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Scroll lock context for controlling scroll freezing
const ScrollLockContext = createContext<{
  isLocked: boolean
  setLocked: (locked: boolean) => void
}>({
  isLocked: false,
  setLocked: () => {}
})

export function useScrollLock() {
  return useContext(ScrollLockContext)
}

interface SmoothScrollProps {
  children: React.ReactNode
  initialLock?: boolean
}

/**
 * SmoothScroll
 * 
 * A wrapper component that provides smooth scrolling using Lenis and synchronizes it with GSAP ScrollTrigger.
 */
export function SmoothScroll({ children, initialLock = false }: SmoothScrollProps) {
  const [isLocked, setIsLocked] = useState(initialLock)

  return (
    <ScrollLockContext.Provider value={{ isLocked, setLocked: setIsLocked }}>
      <ReactLenis
        root
        options={{
          duration: 1.8,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 0.6,
          touchMultiplier: 0.6,
          autoRaf: false,
        }}
      >
        <LenisSync isLocked={isLocked} />
        <CustomScrollbar />
        {children}
      </ReactLenis>
    </ScrollLockContext.Provider>
  )
}

function LenisSync({ isLocked }: { isLocked?: boolean }) {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return

    // Control scroll locking
    if (isLocked) {
      lenis.stop()
    } else {
      lenis.start()
    }
  }, [lenis, isLocked])

  useEffect(() => {
    if (!lenis) return

    lenis.on('scroll', ScrollTrigger.update)

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(updateLenis)
    gsap.ticker.lagSmoothing(0)

    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)

    return () => {
      lenis.off('scroll', ScrollTrigger.update)
      gsap.ticker.remove(updateLenis)
      clearTimeout(timer)
    }
  }, [lenis])

  return null
}

function CustomScrollbar() {
  const lenis = useLenis()
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    if (!lenis) return

    const scrollbar = document.querySelector('.custom-scrollbar-thumb') as HTMLElement
    const scrollbarTrack = document.querySelector('.custom-scrollbar') as HTMLElement
    if (!scrollbar || !scrollbarTrack) return
    
    const updateScrollbar = () => {
      const currentScrollHeight = document.documentElement.scrollHeight - window.innerHeight
      if (currentScrollHeight <= 0) return
      
      const progress = lenis.scroll / currentScrollHeight
      const thumbHeight = Math.max(40, (window.innerHeight / document.documentElement.scrollHeight) * window.innerHeight)
      
      gsap.set(scrollbar, {
        height: thumbHeight,
        y: progress * (window.innerHeight - thumbHeight),
        opacity: 1
      })
    }

    // Drag functionality
    let startY = 0
    let startScroll = 0

    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true)
      startY = e.clientY
      startScroll = lenis.scroll
      document.body.style.cursor = 'grabbing'
      document.body.style.userSelect = 'none'
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      
      const deltaY = e.clientY - startY
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollDelta = (deltaY / window.innerHeight) * scrollHeight
      
      lenis.scrollTo(startScroll + scrollDelta, { immediate: true })
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }

    // Click to jump
    const handleClick = (e: MouseEvent) => {
      if (isDragging) return
      
      const rect = scrollbarTrack.getBoundingClientRect()
      const clickY = e.clientY - rect.top
      const progress = clickY / window.innerHeight
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      
      lenis.scrollTo(progress * scrollHeight, { duration: 0.5 })
    }

    scrollbar.addEventListener('mousedown', handleMouseDown)
    scrollbarTrack.addEventListener('click', handleClick)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    lenis.on('scroll', updateScrollbar)
    updateScrollbar()

    return () => {
      lenis.off('scroll', updateScrollbar)
      scrollbar.removeEventListener('mousedown', handleMouseDown)
      scrollbarTrack.removeEventListener('click', handleClick)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [lenis, isDragging])

  return (
    <div className="custom-scrollbar">
      <div className="custom-scrollbar-thumb" />
    </div>
  )
}

export { useLenis }
