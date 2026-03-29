import { useNavigate } from "react-router-dom"
import { DottedSurface } from './dotted-surface'
import './not-found.css'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="not-found">
      <DottedSurface position="fixed" />
      <div className="not-found-content">
        {/* Clean 404 with spinning ball */}
        <div className="not-found-numbers">
          <span className="text-6xl md:text-8xl font-light tracking-[0.2em] text-white/60">
            4
          </span>
          
          <div className="not-found-spinner">
            <svg 
              viewBox="0 0 100 100"
              style={{ 
                opacity: 0.3
              }}
            >
              <circle 
                cx="50" 
                cy="50" 
                r="45" 
                fill="none" 
                stroke="white" 
                strokeWidth="1"
                strokeDasharray="8 4"
              />
            </svg>
          </div>
          
          <span className="text-6xl md:text-8xl font-light tracking-[0.2em] text-white/60">
            4
          </span>
        </div>

        {/* Message */}
        <div className="not-found-message">
          <span className="text-lg md:text-xl font-light tracking-[0.2em] text-white/80 uppercase">
            Página não encontrada
          </span>
          <span className="text-sm tracking-[0.1em] text-white/40">
            A página que você procura não existe
          </span>
        </div>

        {/* Back button */}
        <button
          onClick={() => navigate('/')}
          className="not-found-button"
        >
          <svg 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M19 12H5M5 12l7-7m-7 7l7 7" />
          </svg>
          VOLTAR AO INÍCIO
        </button>
      </div>
    </div>
  )
}
