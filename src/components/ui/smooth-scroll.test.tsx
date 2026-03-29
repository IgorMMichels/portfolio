import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import { SmoothScroll } from './smooth-scroll';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from 'lenis/react';
import '@testing-library/jest-dom';

// Mock GSAP and ScrollTrigger
vi.mock('gsap', () => {
  const ticker = {
    add: vi.fn(),
    remove: vi.fn(),
    lagSmoothing: vi.fn(),
  };
  return {
    default: {
      registerPlugin: vi.fn(),
      ticker,
    },
    ticker,
  };
});

vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {
    update: vi.fn(),
    refresh: vi.fn(),
  },
}));

// Mock Lenis
vi.mock('lenis/react', () => ({
  ReactLenis: ({ children }: { children: React.ReactNode }) => <div data-testid="react-lenis">{children}</div>,
  useLenis: vi.fn(),
}));

describe('SmoothScroll Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders children correctly', () => {
    const { getByTestId } = render(
      <SmoothScroll>
        <div data-testid="child">Test Child</div>
      </SmoothScroll>
    );
    expect(getByTestId('child')).toBeInTheDocument();
    expect(getByTestId('react-lenis')).toBeInTheDocument();
  });

  it('synchronizes Lenis with GSAP ScrollTrigger', () => {
    const mockLenis = {
      on: vi.fn(),
      off: vi.fn(),
      raf: vi.fn(),
    };
    vi.mocked(useLenis).mockReturnValue(mockLenis as any);

    render(
      <SmoothScroll>
        <div>Test</div>
      </SmoothScroll>
    );

    // Verify ScrollTrigger update is registered on Lenis scroll
    expect(mockLenis.on).toHaveBeenCalledWith('scroll', ScrollTrigger.update);

    // Verify GSAP ticker synchronization
    expect(gsap.ticker.add).toHaveBeenCalled();
    expect(gsap.ticker.lagSmoothing).toHaveBeenCalledWith(0);

    // Verify ScrollTrigger refresh is called after delay
    vi.advanceTimersByTime(100);
    expect(ScrollTrigger.refresh).toHaveBeenCalled();
  });

  it('cleans up on unmount', () => {
    const mockLenis = {
      on: vi.fn(),
      off: vi.fn(),
      raf: vi.fn(),
    };
    vi.mocked(useLenis).mockReturnValue(mockLenis as any);

    const { unmount } = render(
      <SmoothScroll>
        <div>Test</div>
      </SmoothScroll>
    );

    unmount();

    // Verify cleanup
    expect(mockLenis.off).toHaveBeenCalledWith('scroll', ScrollTrigger.update);
    expect(gsap.ticker.remove).toHaveBeenCalled();
  });
});
