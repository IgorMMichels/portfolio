"use client"

import React, { useEffect, useRef, useState } from "react"

interface CursorProps {
  size?: number
}

export const Cursor: React.FC<CursorProps> = ({ size = 40 }) => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const requestRef = useRef<number>()
  const previousPos = useRef({ x: -size, y: -size })

  const [visible, setVisible] = useState(false)
  const [position, setPosition] = useState({ x: -size, y: -size })
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    // Check for touch device
    const checkTouch = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
    }
    checkTouch()
  }, [])

  const animate = () => {
    if (!cursorRef.current) return

    const currentX = previousPos.current.x
    const currentY = previousPos.current.y
    const targetX = position.x - size / 2
    const targetY = position.y - size / 2

    const deltaX = (targetX - currentX) * 0.2
    const deltaY = (targetY - currentY) * 0.2

    const newX = currentX + deltaX
    const newY = currentY + deltaY

    previousPos.current = { x: newX, y: newY }
    cursorRef.current.style.transform = `translate(${newX}px, ${newY}px)`

    requestRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    if (isTouchDevice) return

    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      setVisible(true)
      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }

    const handleMouseEnter = () => {
      setVisible(true)
    }

    const handleMouseLeave = () => {
      setVisible(false)
    }

    container.addEventListener("mousemove", handleMouseMove)
    container.addEventListener("mouseenter", handleMouseEnter)
    container.addEventListener("mouseleave", handleMouseLeave)

    requestRef.current = requestAnimationFrame(animate)

    return () => {
      container.removeEventListener("mousemove", handleMouseMove)
      container.removeEventListener("mouseenter", handleMouseEnter)
      container.removeEventListener("mouseleave", handleMouseLeave)
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
    }
  }, [position, size, isTouchDevice])

  if (isTouchDevice) return null

  return (
    <div ref={containerRef} className="absolute inset-0 cursor-none pointer-events-none">
      <div
        ref={cursorRef}
        className="pointer-events-none absolute z-[9999] rounded-full bg-white mix-blend-difference transition-opacity duration-300"
        style={{
          width: size,
          height: size,
          opacity: visible ? 1 : 0,
        }}
        aria-hidden="true"
      />
    </div>
  )
}

export default Cursor
