import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const CyberneticGridShader = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1) Renderer, Scene, Camera, Clock
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const clock = new THREE.Clock();

    // 2) GLSL Shaders - Minimal/Clean version
    const vertexShader = `
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;
      uniform vec2 iResolution;
      uniform float iTime;
      uniform vec2 iMouse;

      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898, 78.233)))
                     * 43758.5453123);
      }

      void main() {
        // normalize coords around center
        vec2 uv    = (gl_FragCoord.xy - 0.5 * iResolution.xy)
                     / iResolution.y;
        vec2 mouse = (iMouse - 0.5 * iResolution.xy)
                     / iResolution.y;

        float t         = iTime * 0.15;
        float mouseDist = length(uv - mouse);

        // subtle warp effect around mouse
        float warp = sin(mouseDist * 15.0 - t * 3.0) * 0.05;
        warp *= smoothstep(0.5, 0.0, mouseDist);
        uv += warp;

        // grid lines - cleaner, thinner
        vec2 gridUv = abs(fract(uv * 12.0) - 0.5);
        float line  = pow(1.0 - min(gridUv.x, gridUv.y), 80.0);

        // subtle grid color - muted slate/cyan
        vec3 gridColor = vec3(0.15, 0.2, 0.25);
        vec3 color     = gridColor
                       * line
                       * (0.4 + sin(t * 1.5) * 0.1);

        // subtle energy pulses - muted teal instead of bright purple
        float energy = sin(uv.x * 15.0 + t * 4.0)
                     * sin(uv.y * 15.0 + t * 2.5);
        energy = smoothstep(0.85, 1.0, energy);
        color += vec3(0.1, 0.3, 0.35) * energy * line * 0.5;

        // subtle glow around mouse - desaturated
        float glow = smoothstep(0.15, 0.0, mouseDist);
        color += vec3(0.2, 0.25, 0.3) * glow * 0.3;

        // very subtle noise
        color += random(uv + t * 0.05) * 0.02;

        // slight vignette for depth
        float vignette = 1.0 - smoothstep(0.5, 1.5, length(uv));
        color *= 0.7 + vignette * 0.3;

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    // 3) Uniforms, Material, Mesh
    const uniforms = {
      iTime:       { value: 0 },
      iResolution: { value: new THREE.Vector2() },
      iMouse:      { value: new THREE.Vector2(
                       window.innerWidth / 2,
                       window.innerHeight / 2
                     ) }
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh     = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // 4) Resize handler
    const onResize = () => {
      const width  = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      uniforms.iResolution.value.set(width, height);
    };
    window.addEventListener('resize', onResize);
    onResize();

    // 5) Mouse handler
    const onMouseMove = (e: MouseEvent) => {
      uniforms.iMouse.value.set(
        e.clientX,
        container.clientHeight - e.clientY
      );
    };
    window.addEventListener('mousemove', onMouseMove);

    // 6) Animation loop
    renderer.setAnimationLoop(() => {
      uniforms.iTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    });

    // 7) Cleanup on unmount
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);

      renderer.setAnimationLoop(null);

      const canvas = renderer.domElement;
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }

      material.dispose();
      geometry.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="shader-container"
      style={{
        position:      'fixed',
        top:           0,
        left:          0,
        width:         '100vw',
        height:        '100vh',
        zIndex:        -1,
        pointerEvents: 'none'
      }}
      aria-label="Cybernetic Grid animated background"
    />
  );
};

export default CyberneticGridShader;
