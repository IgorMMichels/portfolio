import { CardsParallax } from './ui/scroll-cards'
import './Trabalhos.css'

const projects = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop',
    title: 'Economizae',
    description: 'Projeto pessoal criado para divulgação de links de afiliados com foco em monetização digital. Plataforma otimizada para conversão e automação de ofertas.',
    techStack: ['React', 'TypeScript', 'PostgreSQL'],
    link: 'https://economizae.com',
    color: '#1e293b', // slate-800
    textColor: '#f8fafc', // slate-50
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1511994298241-608e28f14fde?q=80&w=2370&auto=format&fit=crop',
    title: 'Fechando as Porteiras',
    description: 'Projeto desenvolvido para expandir uma marca no nicho de bikes, incluindo sistema de eventos e inscrições online.',
    techStack: ['React', 'TypeScript', 'PostgreSQL'],
    link: 'https://www.fechandoasporteiras.com.br/',
    color: '#064e3b', // emerald-900
    textColor: '#ecfdf5', // emerald-50
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2370&auto=format&fit=crop',
    title: 'Solus Motobombas',
    description: 'Website institucional focado na divulgação de produtos e serviços, facilitando o contato entre clientes e a empresa.',
    techStack: ['React', 'TypeScript', 'PostgreSQL'],
    link: 'https://solus-motobombas.vercel.app/',
    color: '#1e3a8a', // blue-900
    textColor: '#eff6ff', // blue-50
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1526506114861-164192b48e1b?q=80&w=2370&auto=format&fit=crop',
    title: 'FitlyApp',
    description: 'Projeto escolar desenvolvido para o IFC, com foco em auxiliar no processo de emagrecimento através de uma plataforma digital.',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    link: 'https://fitlyapp.com.br',
    color: '#7f1d1d', // red-900
    textColor: '#fef2f2', // red-50
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2370&auto=format&fit=crop',
    title: 'Imok',
    description: 'Projeto pessoal voltado para um futuro empreendimento, com foco em facilitar o contato com clientes e permitir assinatura de serviços diretamente pelo site.',
    techStack: ['React', 'TypeScript', 'PostgreSQL'],
    link: 'https://imok.vercel.app',
    color: '#4c1d95', // violet-900
    textColor: '#f5f3ff', // violet-50
  }
]

export default function Trabalhos() {
  return (
    <section id="trabalhos" className="trabalhos section">
      <div className="container">
        <h2 className="section-title">
          <span className="title-number">03.</span> Trabalhos
        </h2>

        {/* Sticky scroll card animation */}
        <div className="scroll-cards-wrapper flex justify-center w-full">
          <CardsParallax items={projects} />
        </div>
      </div>
    </section>
  )
}
