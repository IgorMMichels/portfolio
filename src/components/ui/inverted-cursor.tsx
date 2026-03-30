"use client"

import React, { useEffect, useRef, useState, useCallback } from "react"

interface CursorProps {
  size?: number
}

export const Cursor: React.FC<CursorProps> = ({ size = 18 }) => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const requestRef = useRef<number>()
  const previousPos = useRef({ x: -size, y: -size })
  const positionRef = useRef({ x: -size, y: -size })

  const [visible, setVisible] = useState(false)

  const animate = useCallback(() => {
    if (!cursorRef.current) return

    const currentX = previousPos.current.x
    const currentY = previousPos.current.y
    const targetX = positionRef.current.x - size / 2
    const targetY = positionRef.current.y - size / 2

    const deltaX = (targetX - currentX) * 0.2
    const deltaY = (targetY - currentY) * 0.2

    const newX = currentX + deltaX
    const newY = currentY + deltaY

    previousPos.current = { x: newX, y: newY }
    cursorRef.current.style.transform = `translate3d(${newX}px, ${newY}px, 0)`

    requestRef.current = requestAnimationFrame(animate)
  }, [size])

  // Check if cursor is over the scrollbar
  const isOverScrollbar = useCallback((x: number) => {
    const scrollbarWidth = 17 // Typical scrollbar width
    const threshold = 20 // Extra tolerance
    return x >= window.innerWidth - scrollbarWidth - threshold
  }, [])

  // Check if cursor is over an element that should show default cursor
  const shouldHideCursor = useCallback((e: MouseEvent) => {
    // Check if over scrollbar area
    if (isOverScrollbar(e.clientX)) {
      return true
    }

    // Check target element
    const target = e.target as HTMLElement
    if (!target) return false

    // Hide on scrollbars
    if (
      target.classList.contains('scrollbar') ||
      target.classList.contains('scrollbar-thumb') ||
      target.classList.contains('scrollbar-track') ||
      window.getComputedStyle(target).overflow === 'scroll' ||
      window.getComputedStyle(target).overflowY === 'scroll'
    ) {
      return true
    }

    // Hide on interactive elements (buttons, links, inputs, etc.)
    const tagName = target.tagName.toLowerCase()
    const interactiveElements = ['button', 'a', 'input', 'textarea', 'select', 'label']
    if (interactiveElements.includes(tagName)) {
      return true
    }

    // Check for elements with onclick, or cursor: pointer
    const style = window.getComputedStyle(target)
    if (style.cursor === 'pointer' || style.cursor === 'grab' || style.cursor === 'grabbing') {
      return true
    }

    // Check parent chain for interactive elements
    let parent = target.parentElement
    while (parent) {
      const parentStyle = window.getComputedStyle(parent)
      const parentTagName = parent.tagName.toLowerCase()
      if (
        interactiveElements.includes(parentTagName) ||
        parentStyle.cursor === 'pointer' ||
        parentStyle.cursor === 'grab' ||
        parentStyle.cursor === 'grabbing'
      ) {
        return true
      }
      parent = parent.parentElement
    }

    // Check parent chain for scrollbar related elements
    parent = target.parentElement
    while (parent) {
      const parentStyle = window.getComputedStyle(parent)
      if (parentStyle.overflow === 'scroll' || parentStyle.overflowY === 'scroll' || parentStyle.overflowX === 'scroll') {
        // Check if we're near the scrollbar area
        const rect = parent.getBoundingClientRect()
        if (e.clientX >= rect.right - 25) {
          return true
        }
      }
      parent = parent.parentElement
    }

    return false
  }, [isOverScrollbar])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const shouldHide = shouldHideCursor(e)
      
      if (shouldHide) {
        setVisible(false)
        document.body.style.cursor = "auto"
      } else {
        positionRef.current = { x: e.clientX, y: e.clientY }
        setVisible(true)
        document.body.style.cursor = "none"
      }
    }

    const handleMouseLeave = () => {
      setVisible(false)
      document.body.style.cursor = "auto"
    }

    const handleMouseEnter = (e: MouseEvent) => {
      if (!shouldHideCursor(e)) {
        setVisible(true)
        document.body.style.cursor = "none"
      }
    }

    // Track mouse globally
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    // Start animation loop
    requestRef.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
      document.body.style.cursor = "auto"
    }
  }, [animate, shouldHideCursor])

  return (
    <div
      ref={cursorRef}
      className="fixed rounded-full bg-white mix-blend-difference pointer-events-none z-[9999] transition-opacity duration-300"
      style={{
        width: size,
        height: size,
        opacity: visible ? 1 : 0,
        left: 0,
        top: 0,
        pointerEvents: "none",
        willChange: "transform",
        marginLeft: -size / 2,
        marginTop: -size / 2,
      }}
      aria-hidden="true"
    />
  )
}

export default Cursor
