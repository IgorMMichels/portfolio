import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CardsParallax, iCardItem } from './scroll-cards';
import '@testing-library/jest-dom';

// Mock GSAP
vi.mock('gsap', () => {
  return {
    default: {
      registerPlugin: vi.fn(),
      context: vi.fn((cb) => {
        cb();
        return { revert: vi.fn() };
      }),
      utils: {
        toArray: vi.fn(() => []),
      },
      fromTo: vi.fn(),
    },
  };
});

vi.mock('gsap/ScrollTrigger', () => {
  return {
    ScrollTrigger: {
      create: vi.fn(),
    },
  };
});

const mockItems: iCardItem[] = [
  {
    id: 1,
    title: 'Project 1',
    description: 'Description 1',
    image: 'image1.jpg',
    techStack: ['React', 'TypeScript'],
    link: 'https://example.com/1',
    color: '#000',
    textColor: '#fff',
  },
  {
    id: 2,
    title: 'Project 2',
    description: 'Description 2',
    image: 'image2.jpg',
    techStack: ['Next.js', 'Tailwind'],
    link: 'https://example.com/2',
    color: '#111',
    textColor: '#eee',
  },
];

describe('CardsParallax Component', () => {
  it('renders the correct number of cards', () => {
    render(<CardsParallax items={mockItems} />);
    const cards = screen.getAllByRole('heading', { level: 3 });
    expect(cards).toHaveLength(2);
  });

  it('displays correct project information', () => {
    render(<CardsParallax items={mockItems} />);
    
    expect(screen.getByText('Project 1')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    
    expect(screen.getByText('Project 2')).toBeInTheDocument();
    expect(screen.getByText('Description 2')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
    expect(screen.getByText('Tailwind')).toBeInTheDocument();
  });

  it('applies correct styles from data contract', () => {
    const { container } = render(<CardsParallax items={mockItems} />);
    
    // Check first card container
    const firstCard = container.querySelector('.sticky') as HTMLElement;
    expect(firstCard).toHaveStyle({
      backgroundColor: '#000',
      color: '#fff',
      top: 'calc(10vh + 0px)',
      zIndex: '0',
    });

    // Check second card container
    const secondCard = container.querySelectorAll('.sticky')[1] as HTMLElement;
    expect(secondCard).toHaveStyle({
      backgroundColor: '#111',
      color: '#eee',
      top: 'calc(10vh + 30px)',
      zIndex: '1',
    });
  });

  it('has lazy-loaded images with correct alt text', () => {
    render(<CardsParallax items={mockItems} />);
    
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
    
    expect(images[0]).toHaveAttribute('loading', 'lazy');
    expect(images[0]).toHaveAttribute('alt', 'Screenshot of Project 1');
    
    expect(images[1]).toHaveAttribute('loading', 'lazy');
    expect(images[1]).toHaveAttribute('alt', 'Screenshot of Project 2');
  });

  it('has accessible project links', () => {
    render(<CardsParallax items={mockItems} />);
    
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    
    expect(links[0]).toHaveAttribute('href', 'https://example.com/1');
    expect(links[0]).toHaveAttribute('aria-label', 'Visit Project 1 project');
    expect(links[0]).toHaveAttribute('target', '_blank');
    expect(links[0]).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
