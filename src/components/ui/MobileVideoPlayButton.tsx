import { Play } from 'lucide-react'

interface MobileVideoPlayButtonProps {
  onPlay: () => void;
}

export default function MobileVideoPlayButton({ onPlay }: MobileVideoPlayButtonProps) {
  return (
    <button
      className="mobile-video-play-btn"
      onClick={onPlay}
      aria-label="Play video"
    >
      <Play size={32} fill="white" />
      <span className="mobile-video-play-label">Tap to play</span>
    </button>
  )
}
