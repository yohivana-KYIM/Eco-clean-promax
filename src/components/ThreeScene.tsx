
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ThreeScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup with improved visuals
    const scene = new THREE.Scene();
    
    // Camera setup with better perspective
    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    camera.position.y = 1;
    
    // Renderer with better quality
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Better performance on high-DPI displays
    
    mountRef.current.appendChild(renderer.domElement);

    // Enhanced lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0x25b35a, 1);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 0.8);
    pointLight.position.set(-5, 5, 5);
    scene.add(pointLight);
    
    // Create cleaning-related objects with more variety
    const bubbles: THREE.Mesh[] = [];
    const leafs: THREE.Mesh[] = [];
    
    // Create spheres to represent bubbles with better materials
    for (let i = 0; i < 25; i++) {
      const geometry = new THREE.SphereGeometry(Math.random() * 0.4 + 0.1, 32, 32);
      
      const material = new THREE.MeshPhysicalMaterial({
        color: i % 3 === 0 ? 0x25b35a : 0xffffff,
        transparent: true,
        opacity: 0.7,
        roughness: 0.1,
        metalness: 0.1,
        clearcoat: 0.8,
        clearcoatRoughness: 0.2,
        transmission: 0.5, // Glass-like effect
      });
      
      const bubble = new THREE.Mesh(geometry, material);
      
      // Better position distribution
      bubble.position.x = Math.random() * 12 - 6;
      bubble.position.y = Math.random() * 8 - 4;
      bubble.position.z = Math.random() * 5 - 8;
      
      bubble.userData = {
        rotationSpeed: {
          x: Math.random() * 0.01 - 0.005,
          y: Math.random() * 0.01 - 0.005,
          z: Math.random() * 0.01 - 0.005
        },
        movementSpeed: {
          x: Math.random() * 0.01 - 0.005,
          y: Math.random() * 0.01,
          z: Math.random() * 0.005 - 0.0025
        },
        pulseSpeed: Math.random() * 0.005 + 0.002,
        pulseSize: 0,
        originalScale: Math.random() * 0.4 + 0.8
      };
      
      bubbles.push(bubble);
      scene.add(bubble);
    }
    
    // Create leaf-shaped objects to represent eco-friendly cleaning
    for (let i = 0; i < 15; i++) {
      const leafShape = new THREE.Shape();
      
      // Create a leaf-like shape
      leafShape.moveTo(0, 0);
      leafShape.bezierCurveTo(0.5, 0.5, 1, 1, 0, 2);
      leafShape.bezierCurveTo(-1, 1, -0.5, 0.5, 0, 0);
      
      const extrudeSettings = {
        steps: 1,
        depth: 0.1,
        bevelEnabled: true,
        bevelThickness: 0.05,
        bevelSize: 0.05,
        bevelSegments: 3
      };
      
      const geometry = new THREE.ExtrudeGeometry(leafShape, extrudeSettings);
      const material = new THREE.MeshPhongMaterial({
        color: 0x25b35a,
        transparent: true,
        opacity: 0.8,
        shininess: 30
      });
      
      const leaf = new THREE.Mesh(geometry, material);
      leaf.scale.set(0.3, 0.3, 0.3);
      
      // Position leaves
      leaf.position.x = Math.random() * 10 - 5;
      leaf.position.y = Math.random() * 6 - 3;
      leaf.position.z = Math.random() * 3 - 8;
      
      leaf.rotation.x = Math.random() * Math.PI;
      leaf.rotation.y = Math.random() * Math.PI;
      leaf.rotation.z = Math.random() * Math.PI;
      
      leaf.userData = {
        rotationSpeed: {
          x: Math.random() * 0.005 - 0.0025,
          y: Math.random() * 0.005 - 0.0025,
          z: Math.random() * 0.005 - 0.0025
        },
        movementSpeed: {
          x: Math.random() * 0.008 - 0.004,
          y: Math.random() * 0.005,
          z: Math.random() * 0.004 - 0.002
        }
      };
      
      leafs.push(leaf);
      scene.add(leaf);
    }
    
    // Animation loop with improved animations
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Animate each bubble with pulsing effect
      bubbles.forEach(bubble => {
        // Rotate
        bubble.rotation.x += bubble.userData.rotationSpeed.x;
        bubble.rotation.y += bubble.userData.rotationSpeed.y;
        bubble.rotation.z += bubble.userData.rotationSpeed.z;
        
        // Move
        bubble.position.x += bubble.userData.movementSpeed.x;
        bubble.position.y += bubble.userData.movementSpeed.y;
        bubble.position.z += bubble.userData.movementSpeed.z;
        
        // Pulsing effect
        bubble.userData.pulseSize += bubble.userData.pulseSpeed;
        const scale = bubble.userData.originalScale + Math.sin(bubble.userData.pulseSize) * 0.1;
        bubble.scale.set(scale, scale, scale);
        
        // Reset position if out of view with randomized reentry
        if (bubble.position.y > 5) {
          bubble.position.y = -4;
          bubble.position.x = Math.random() * 10 - 5;
        }
        if (bubble.position.x > 8 || bubble.position.x < -8) {
          bubble.position.x *= -0.8;
        }
      });
      
      // Animate each leaf with floating effect
      leafs.forEach(leaf => {
        // Rotate gently
        leaf.rotation.x += leaf.userData.rotationSpeed.x;
        leaf.rotation.y += leaf.userData.rotationSpeed.y;
        leaf.rotation.z += leaf.userData.rotationSpeed.z;
        
        // Move with slight float
        leaf.position.x += leaf.userData.movementSpeed.x;
        leaf.position.y += leaf.userData.movementSpeed.y;
        leaf.position.z += leaf.userData.movementSpeed.z;
        
        // Reset position if out of view
        if (leaf.position.y > 5) {
          leaf.position.y = -4;
          leaf.position.x = Math.random() * 10 - 5;
          leaf.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
          );
        }
        if (leaf.position.x > 8 || leaf.position.x < -8) {
          leaf.position.x *= -0.9;
        }
      });
      
      // Rotate camera slightly for dynamic effect
      camera.position.x = Math.sin(Date.now() * 0.0002) * 0.5;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Better window resize handler
    const handleWindowResize = () => {
      if (!mountRef.current) return;
      
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    
    window.addEventListener('resize', handleWindowResize);
    
    // Clean up on unmount
    return () => {
      window.removeEventListener('resize', handleWindowResize);
      if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose of geometries and materials
      bubbles.forEach(bubble => {
        bubble.geometry.dispose();
        (bubble.material as THREE.Material).dispose();
      });
      
      leafs.forEach(leaf => {
        leaf.geometry.dispose();
        (leaf.material as THREE.Material).dispose();
      });
    };
  }, []);
  
  return <div ref={mountRef} className="three-scene" />;
};

export default ThreeScene;
