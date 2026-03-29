export interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  sizes?: string
}

/**
 * OptimizedImage - Wrapper for responsive images with WebP support
 * 
 * Features:
 * - Automatic WebP fallback via <picture> element
 * - Lazy loading by default
 * - Async decoding for better performance
 */
export function OptimizedImage({ src, alt, className, sizes }: OptimizedImageProps) {
  // Convert /assets/foo.png to /assets/foo.webp for srcSet
  const webpSrc = src.replace(/\.(png|jpg|jpeg)$/i, '.webp')
  
  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <img
        src={src}
        alt={alt}
        className={className}
        loading="lazy"
        decoding="async"
        sizes={sizes}
      />
    </picture>
  )
}
