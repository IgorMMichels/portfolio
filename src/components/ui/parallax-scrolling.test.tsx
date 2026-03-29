import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ParallaxScrolling } from './parallax-scrolling';
import { useLenis } from './smooth-scroll';
import '@testing-library/jest-dom';

// Mock the useLenis hook
vi.mock('./smooth-scroll', () => ({
  useLenis: vi.fn(),
}));

describe('ParallaxScrolling Component', () => {
  it('renders children correctly', () => {
    vi.mocked(useLenis).mockReturnValue({} as any);
    render(
      <ParallaxScrolling>
        <div data-testid="child">Test Child</div>
      </ParallaxScrolling>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('renders default content when no children are provided', () => {
    vi.mocked(useLenis).mockReturnValue({} as any);
    render(<ParallaxScrolling />);
    expect(screen.getByText('Parallax Scrolling Active')).toBeInTheDocument();
  });

  it('sets data-lenis="active" when Lenis is available', () => {
    vi.mocked(useLenis).mockReturnValue({} as any);
    const { container } = render(<ParallaxScrolling />);
    const div = container.firstChild as HTMLElement;
    expect(div).toHaveAttribute('data-lenis', 'active');
  });

  it('sets data-lenis="inactive" when Lenis is NOT available', () => {
    vi.mocked(useLenis).mockReturnValue(undefined);
    const { container } = render(<ParallaxScrolling />);
    const div = container.firstChild as HTMLElement;
    expect(div).toHaveAttribute('data-lenis', 'inactive');
  });

  it('applies custom className', () => {
    vi.mocked(useLenis).mockReturnValue({} as any);
    const { container } = render(<ParallaxScrolling className="custom-class" />);
    const div = container.firstChild as HTMLElement;
    expect(div).toHaveClass('custom-class');
  });

  it('renders with mock images as children', () => {
    vi.mocked(useLenis).mockReturnValue({} as any);
    const mockImages = [
      { src: 'image1.jpg', alt: 'Image 1' },
      { src: 'image2.jpg', alt: 'Image 2' },
    ];
    
    render(
      <ParallaxScrolling>
        {mockImages.map((img, i) => (
          <img key={i} src={img.src} alt={img.alt} data-testid={`mock-image-${i}`} />
        ))}
      </ParallaxScrolling>
    );
    
    expect(screen.getByTestId('mock-image-0')).toBeInTheDocument();
    expect(screen.getByTestId('mock-image-0')).toHaveAttribute('src', 'image1.jpg');
    expect(screen.getByTestId('mock-image-1')).toBeInTheDocument();
    expect(screen.getByTestId('mock-image-1')).toHaveAttribute('src', 'image2.jpg');
  });
});
