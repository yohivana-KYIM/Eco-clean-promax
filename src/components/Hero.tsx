import React, { useEffect, useRef, useState, useCallback, memo } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Sparkles, ArrowDown, LucideIcon } from 'lucide-react';
import * as THREE from 'three';
import { motion, useScroll, useTransform } from 'framer-motion';

const EnhancedThreeScene = () => {
  const mountRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const particlesRef = useRef(null);
  const floatingElementsRef = useRef([]);
  const mouseRef = useRef(new THREE.Vector2());
  const animationFrameRef = useRef(null);

  const handleMouseMove = useCallback((event) => {
    mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }, []);

  const handleResize = useCallback(() => {
    if (!cameraRef.current || !rendererRef.current) return;
    
    cameraRef.current.aspect = window.innerWidth / window.innerHeight;
    cameraRef.current.updateProjectionMatrix();
    rendererRef.current.setSize(window.innerWidth, window.innerHeight);
  }, []);

  const animate = useCallback(() => {
    if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;

    animationFrameRef.current = requestAnimationFrame(animate);
    
    // Optimiser la rotation des particules avec une vitesse variable
    if (particlesRef.current) {
      const time = Date.now() * 0.0001;
      particlesRef.current.rotation.y = Math.sin(time) * 0.1;
      particlesRef.current.rotation.x = Math.cos(time) * 0.05;
    }
    
    // Optimiser l'animation des éléments flottants avec un mouvement plus naturel
    floatingElementsRef.current.forEach(element => {
      if (!element) return;
      
      const data = element.userData;
      data.time += data.floatSpeed;
      
      // Mouvement plus organique avec plusieurs sinusoïdes
      element.position.y = data.startY + 
        Math.sin(data.time) * data.floatDistance +
        Math.sin(data.time * 0.5) * (data.floatDistance * 0.3);
      
      // Rotation plus fluide
      element.rotation.x += data.rotationSpeed.x * (1 + Math.sin(data.time) * 0.2);
      element.rotation.y += data.rotationSpeed.y * (1 + Math.cos(data.time) * 0.2);
      element.rotation.z += data.rotationSpeed.z * (1 + Math.sin(data.time * 0.5) * 0.2);
    });
    
    // Optimiser le mouvement de la caméra avec un effet plus doux
    if (cameraRef.current) {
      const targetX = mouseRef.current.x * 3;
      const targetY = -mouseRef.current.y * 2;
      
      cameraRef.current.position.x += (targetX - cameraRef.current.position.x) * 0.015;
      cameraRef.current.position.y += (targetY - cameraRef.current.position.y) * 0.015;
      
      // Ajouter un léger mouvement de respiration
      const time = Date.now() * 0.0005;
      cameraRef.current.position.z = 10 + Math.sin(time) * 0.2;
      
      cameraRef.current.lookAt(sceneRef.current.position);
    }
    
    rendererRef.current.render(sceneRef.current, cameraRef.current);
  }, []);

  useEffect(() => {
    if (!mountRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    cameraRef.current = camera;
    
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance'
    });
    rendererRef.current = renderer;
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);
    
    // Optimiser la création des particules
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 1500;
    
    const positionArray = new Float32Array(particleCount * 3);
    const scaleArray = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
      positionArray[i] = (Math.random() - 0.5) * 20;
      positionArray[i + 1] = (Math.random() - 0.5) * 20;
      positionArray[i + 2] = (Math.random() - 10) * 10;
      scaleArray[i / 3] = Math.random();
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3));
    particlesGeometry.setAttribute('scale', new THREE.BufferAttribute(scaleArray, 1));
    
    // Optimiser le shader material pour un meilleur rendu
    const particlesMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        attribute float scale;
        varying vec3 vPosition;
        varying float vScale;
        
        void main() {
          vPosition = position;
          vScale = scale;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = scale * 10.0 * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vPosition;
        varying float vScale;
        
        void main() {
          float depth = 1.0 - (vPosition.z + 10.0) / 10.0;
          float strength = 0.2 + depth * 0.8;
          float distanceToCenter = length(gl_PointCoord - vec2(0.5));
          float circle = 1.0 - smoothstep(0.3, 0.5, distanceToCenter);
          
          // Gradient de couleur plus riche
          vec3 color1 = vec3(0.1, 0.6, 0.4);
          vec3 color2 = vec3(0.3, 0.9, 0.5);
          vec3 color3 = vec3(0.2, 0.8, 0.6);
          
          float t = vPosition.y * 0.1 + 0.5;
          vec3 color = mix(
            mix(color1, color2, t),
            color3,
            sin(vPosition.x * 0.1) * 0.5 + 0.5
          );
          
          gl_FragColor = vec4(color, strength * circle * (0.5 + vScale * 0.5));
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    particlesRef.current = particles;
    scene.add(particles);
    
    // Optimiser les lumières pour un meilleur rendu
    scene.fog = new THREE.FogExp2(0x0f3022, 0.025);
    const ambientLight = new THREE.AmbientLight(0x4eff9e, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Ajouter une lumière ponctuelle pour plus de profondeur
    const pointLight = new THREE.PointLight(0x2ecc71, 0.5);
    pointLight.position.set(0, 0, 5);
    scene.add(pointLight);
    
    // Optimiser la création des éléments flottants
    const addFloatingElement = (geometry, color, x, y, z) => {
      const material = new THREE.MeshPhongMaterial({
        color: color,
        transparent: true,
        opacity: 0.8,
        shininess: 50,
        specular: 0xffffff
      });
      
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(x, y, z);
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      
      mesh.userData = {
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.008,
          y: (Math.random() - 0.5) * 0.008,
          z: (Math.random() - 0.5) * 0.008
        },
        floatSpeed: 0.003 + Math.random() * 0.005,
        floatDistance: 0.3 + Math.random() * 0.4,
        startY: y,
        time: Math.random() * Math.PI * 2
      };
      
      scene.add(mesh);
      return mesh;
    };
    
    // Créer les éléments flottants
    const floatingElements = [];
    
    // Optimiser la création des formes
    const geometries = {
      leaf: new THREE.TorusKnotGeometry(0.3, 0.1, 64, 8, 2, 3),
      drop: new THREE.SphereGeometry(0.2, 32, 32),
      bubble: new THREE.IcosahedronGeometry(0.4, 1)
    };
    
    // Ajouter les éléments avec des positions optimisées
    for (let i = 0; i < 8; i++) {
      const x = (Math.random() - 0.5) * 15;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 10 - 5;
      const color = new THREE.Color(0x2ecc71).offsetHSL(0, 0, Math.random() * 0.2 - 0.1);
      floatingElements.push(addFloatingElement(geometries.leaf, color, x, y, z));
    }
    
    for (let i = 0; i < 12; i++) {
      const x = (Math.random() - 0.5) * 15;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 10 - 5;
      const color = new THREE.Color(0x3498db).offsetHSL(0, 0, Math.random() * 0.2 - 0.1);
      floatingElements.push(addFloatingElement(geometries.drop, color, x, y, z));
    }
    
    for (let i = 0; i < 15; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 10 - 5;
      const color = new THREE.Color(0x1abc9c).offsetHSL(0, 0, Math.random() * 0.4);
      floatingElements.push(addFloatingElement(geometries.bubble, color, x, y, z));
    }
    
    floatingElementsRef.current = floatingElements;
    
    // Position camera
    camera.position.z = 10;
    
    // Event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    
    // Start animation
    animate();
    setIsLoaded(true);
    
    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      scene.clear();
      
      // Nettoyer les références
      sceneRef.current = null;
      rendererRef.current = null;
      cameraRef.current = null;
      particlesRef.current = null;
      floatingElementsRef.current = [];
    };
  }, [handleMouseMove, handleResize, animate]);
  
  return (
    <div ref={mountRef} className="absolute inset-0 z-0" aria-hidden="true">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-eco-green-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

interface FeatureCardProps {
  icon: LucideIcon;
  text: string;
  index: number;
}

const FeatureCard = memo(({ icon: Icon, text, index }: FeatureCardProps) => {
  const calculateTransform = useCallback((index: number) => {
    const baseDelay = 0.2;
    const delay = baseDelay * index;
    return {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: delay,
        ease: [0.22, 1, 0.36, 1]
      }
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={calculateTransform(index)}
      className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20 hover:bg-white/15 hover:border-eco-green-400/60 transition-all duration-300"
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-eco-green-500/20 flex items-center justify-center">
        <Icon className="h-5 w-5 text-eco-green-400" />
      </div>
      <span className="text-white/90 font-medium">{text}</span>
    </motion.div>
  );
});

FeatureCard.displayName = 'FeatureCard';

const Hero = () => {
  const heroRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  const scrollToNextSection = useCallback(() => {
    const nextSection = document.querySelector('#services');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const calculateTransform = useCallback((index) => {
    const baseDelay = 0.2;
    const delay = baseDelay * index;
    return {
      opacity: isVisible ? 1 : 0,
      y: isVisible ? 0 : 50,
      transition: {
        duration: 0.8,
        delay: delay,
        ease: [0.22, 1, 0.36, 1]
      }
    };
  }, [isVisible]);

  return (
    <motion.section 
      ref={heroRef}
      style={{ opacity, scale }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-eco-green-900 to-eco-green-950 px-4 sm:px-6 lg:px-8"
    >
      <EnhancedThreeScene />
      
      {/* Glass morphism elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-1/4 right-1/4 w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] rounded-full border-[30px] sm:border-[40px] md:border-[60px] border-eco-green-500/5 parallax backdrop-blur-sm" 
          data-speed="0.2"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute -bottom-24 -left-24 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 rounded-full bg-eco-green-300/10 parallax backdrop-blur-md" 
          data-speed="0.3"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, -5, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-32 left-1/4 w-32 sm:w-36 md:w-44 h-32 sm:h-36 md:h-44 rounded-3xl bg-white/5 backdrop-blur-lg parallax rotate-12" 
          data-speed="0.4"
          animate={{ 
            scale: [1, 1.15, 1],
            rotate: [12, 17, 12]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute -bottom-20 -right-20 w-[400px] sm:w-[500px] md:w-[600px] h-[400px] sm:h-[500px] md:h-[600px] rounded-full bg-eco-green-200/5 parallax rotate-45 backdrop-blur-sm" 
          data-speed="0.5"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [45, 50, 45]
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto">
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
          
          
          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={calculateTransform(1)}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight text-center"
          >
            Nettoyage Professionnel
            <span className="block text-eco-green-400 mt-2">Écologique & Efficace</span>
          </motion.h1>
          
          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={calculateTransform(2)}
            className="text-lg sm:text-xl text-white mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed text-center px-4 sm:px-0 font-bold"
            style={{
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              backdropFilter: 'blur(8px)',
              backgroundColor: 'rgba(255, 255, 255, 0.1)'
            }}
          >
            Des solutions de nettoyage innovantes et respectueuses de l'environnement pour tous vos espaces.
          </motion.p>
          
          {/* Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={calculateTransform(3)}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16 max-w-3xl mx-auto px-4 sm:px-0"
          >
            <FeatureCard icon={CheckCircle} text="Solutions Écologiques" index={4} />
            <FeatureCard icon={Sparkles} text="Résultats Garantis" index={5} />
            <FeatureCard icon={CheckCircle} text="Service Personnalisé" index={6} />
          </motion.div>
          
         
        </div>
      </div>
    </motion.section>
  );
};

export default memo(Hero);