import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { OptimizedImage } from './optimized-image'

describe('OptimizedImage', () => {
  it('renders picture element with source', () => {
    render(<OptimizedImage src="/test.png" alt="Test" />)
    const picture = screen.getByRole('img').parentElement
    expect(picture?.tagName).toBe('PICTURE')
  })

  it('renders source element with WebP', () => {
    render(<OptimizedImage src="/test.png" alt="Test" />)
    const source = document.querySelector('source[type="image/webp"]')
    expect(source).toBeInTheDocument()
    expect(source).toHaveAttribute('srcset', '/test.webp')
  })

  it('falls back gracefully when no WebP available', () => {
    render(<OptimizedImage src="/test.png" alt="Test" />)
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('src', '/test.png')
  })

  it('passes through className', () => {
    render(<OptimizedImage src="/test.png" alt="Test" className="test-class" />)
    const img = screen.getByRole('img')
    expect(img).toHaveClass('test-class')
  })

  it('has lazy loading by default', () => {
    render(<OptimizedImage src="/test.png" alt="Test" />)
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('loading', 'lazy')
  })

  it('has async decoding by default', () => {
    render(<OptimizedImage src="/test.png" alt="Test" />)
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('decoding', 'async')
  })
})
