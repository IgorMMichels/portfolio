import { ImagesScrollingAnimation } from './ui/images-scrolling-animation'
import './Trabalhos.css'

const projects = [
  {
    id: 1,
    image: '/assets/economizae.png',
    title: 'Economizae',
    description: 'Projeto pessoal criado para divulgação de links de afiliados com foco em monetização digital. Plataforma otimizada para conversão e automação de ofertas.',
    tech: ['React', 'TypeScript', 'PostgreSQL'],
    link: 'https://economizae.com',
  },
  {
    id: 2,
    image: '/assets/fechandoAsPorteiras.png',
    title: 'Fechando as Porteiras',
    description: 'Projeto desenvolvido para expandir uma marca no nicho de bikes, incluindo sistema de eventos e inscrições online.',
    tech: ['React', 'TypeScript', 'PostgreSQL'],
    link: 'https://www.fechandoasporteiras.com.br/',
  },
  {
    id: 3,
    image: '/assets/solusMotobombas.png',
    title: 'Solus Motobombas',
    description: 'Website institucional focado na divulgação de produtos e serviços, facilitando o contato entre clientes e a empresa.',
    tech: ['React', 'TypeScript', 'PostgreSQL'],
    link: 'https://solus-motobombas.vercel.app/',
  },
  {
    id: 4,
    image: '/assets/fitlyApp.png',
    title: 'FitlyApp',
    description: 'Projeto escolar desenvolvido para o IFC, com foco em auxiliar no processo de emagrecimento através de uma plataforma digital.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    link: 'https://fitlyapp.com.br',
  },
  {
    id: 5,
    image: '/assets/imok.png',
    title: 'Imok',
    description: 'Projeto pessoal voltado para um futuro empreendimento, com foco em facilitar o contato com clientes e permitir assinatura de serviços diretamente pelo site.',
    tech: ['React', 'TypeScript', 'PostgreSQL'],
    link: 'https://imok.vercel.app',
  }
]

export default function Trabalhos() {
  return (
    <section id="trabalhos" className="trabalhos section pb-32" style={{ background: 'linear-gradient(180deg, rgba(5, 6, 10, 1) 0%, rgba(5, 6, 10, 1) 100%)', position: 'relative', zIndex: 1 }}>
      <div className="container">
        <h2 className="section-title">
          <span className="title-number">03.</span> Trabalhos
        </h2>

        {/* Sticky scroll card animation */}
        <div className="scroll-cards-wrapper flex justify-center w-full">
          <ImagesScrollingAnimation projects={projects} />
        </div>
      </div>
    </section>
  )
}
