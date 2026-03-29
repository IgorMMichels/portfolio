import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import Hero from './Hero';
import gsap from 'gsap';
import '@testing-library/jest-dom';

// Mock GSAP and ScrollTrigger
vi.mock('gsap', () => {
  const timeline = {
    fromTo: vi.fn().mockReturnThis(),
    to: vi.fn().mockReturnThis(),
    from: vi.fn().mockReturnThis(),
  };
  const context = vi.fn((cb) => {
    cb();
    return { revert: vi.fn() };
  });
  return {
    default: {
      registerPlugin: vi.fn(),
      context,
      timeline: vi.fn(() => timeline),
      from: vi.fn().mockReturnThis(),
      to: vi.fn().mockReturnThis(),
    },
    timeline: vi.fn(() => timeline),
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
  useLenis: vi.fn(),
}));

describe('Hero Component - Video Scrubbing', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock HTMLVideoElement properties
    Object.defineProperty(HTMLMediaElement.prototype, 'duration', {
      configurable: true,
      get() { return 10; }
    });
    Object.defineProperty(HTMLMediaElement.prototype, 'readyState', {
      configurable: true,
      get() { return 4; } // HAVE_ENOUGH_DATA
    });
  });

  it('initializes GSAP timeline for video scrubbing', () => {
    render(<Hero />);

    // Verify GSAP timeline is created with ScrollTrigger
    expect(gsap.timeline).toHaveBeenCalledWith(expect.objectContaining({
      scrollTrigger: expect.objectContaining({
        scrub: true,
        start: 'top top',
        end: 'bottom top',
      })
    }));
  });

  it('sets up video scrubbing from 0 to duration', () => {
    const { container } = render(<Hero />);
    const video = container.querySelector('video');
    
    // Verify timeline.fromTo is called with video and duration
    const mockTimeline = vi.mocked(gsap.timeline)();
    expect(mockTimeline.fromTo).toHaveBeenCalledWith(
      video,
      { currentTime: 0 },
      { currentTime: 10, ease: 'none' }
    );
  });

  it('handles video metadata loading if not ready', () => {
    // Mock video not ready
    Object.defineProperty(HTMLMediaElement.prototype, 'readyState', {
      configurable: true,
      get() { return 0; } // HAVE_NOTHING
    });

    const addEventListenerSpy = vi.spyOn(HTMLMediaElement.prototype, 'addEventListener');
    render(<Hero />);
    
    // Verify event listener is added
    expect(addEventListenerSpy).toHaveBeenCalledWith('loadedmetadata', expect.any(Function));
    
    addEventListenerSpy.mockRestore();
  });

  it('does not set up scrubbing if duration is NaN', () => {
    // Mock video with NaN duration
    Object.defineProperty(HTMLMediaElement.prototype, 'duration', {
      configurable: true,
      get() { return NaN; }
    });

    render(<Hero />);
    
    // Verify timeline.fromTo is NOT called
    const mockTimeline = vi.mocked(gsap.timeline)();
    expect(mockTimeline.fromTo).not.toHaveBeenCalled();
  });
});
