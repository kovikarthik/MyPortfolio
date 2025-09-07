import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import ContactMe from './ContactMe/ContactMe';
import Footer from './Footer/Footer'
import Projects from './Projects/Projects'
import OnAppLoading from './OnAppLoading/OnAppLoading'
import AwardsAndCertificates from './AwardsAndCertificates/AwardsAndCertificates'
import Skills from './Skills/Skills';
import AboutMe from './AboutMe/AboutMe';
import Experience from './Experience/Experience';
import HeroSection from './HeroSection/HeroSection';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const particleSystemRef = useRef(null);

  useEffect(() => {
    // Loading animation
    setTimeout(() => setIsLoading(false), 2000);

    // Scroll tracking with intersection observer
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.5 });

    sections.forEach(section => observer.observe(section));

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    // Mouse tracking for parallax
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      });
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Revolutionary Three.js Scene
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Advanced Particle Systems
    const createParticleField = () => {
      const particleCount = 5000;
      const particles = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const sizes = new Float32Array(particleCount);
      const velocities = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
        // Distribute in 3D space
        positions[i * 3] = (Math.random() - 0.5) * 100;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 100;

        // Dynamic colors
        const hue = (Math.random() * 0.4 + 0.5); // Cyan to purple range
        colors[i * 3] = hue;
        colors[i * 3 + 1] = Math.random() * 0.5 + 0.5;
        colors[i * 3 + 2] = 1;

        sizes[i] = Math.random() * 0.05 + 0.01;

        // Random velocities
        velocities[i * 3] = (Math.random() - 0.5) * 0.02;
        velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
        velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
      }

      particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
      particles.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

      const particleMaterial = new THREE.PointsMaterial({
        size: 0.1,
        sizeAttenuation: true,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
      });

      return new THREE.Points(particles, particleMaterial);
    };

    const particleSystem = createParticleField();
    scene.add(particleSystem);
    particleSystemRef.current = particleSystem;

    // Animated Geometric Structures
    const createGeometricShapes = () => {
      const shapes = [];
      const geometries = [
        new THREE.OctahedronGeometry(2),
        new THREE.TetrahedronGeometry(1.5),
        new THREE.IcosahedronGeometry(1.8),
        new THREE.DodecahedronGeometry(1.2),
        new THREE.TorusGeometry(1, 0.4, 8, 16)
      ];

      for (let i = 0; i < 25; i++) {
        const geometry = geometries[Math.floor(Math.random() * geometries.length)];
        const material = new THREE.MeshPhongMaterial({
          color: new THREE.Color().setHSL((i * 0.1) % 1, 0.8, 0.6),
          wireframe: Math.random() > 0.5,
          transparent: true,
          opacity: 0.4,
          shininess: 100
        });
        
        const shape = new THREE.Mesh(geometry, material);
        shape.position.set(
          (Math.random() - 0.5) * 80,
          (Math.random() - 0.5) * 80,
          (Math.random() - 0.5) * 80
        );
        shape.rotation.set(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        );
        shape.userData = {
          rotSpeed: {
            x: (Math.random() - 0.5) * 0.02,
            y: (Math.random() - 0.5) * 0.02,
            z: (Math.random() - 0.5) * 0.02
          },
          floatSpeed: Math.random() * 0.02 + 0.01,
          floatRange: Math.random() * 5 + 2
        };
        shapes.push(shape);
        scene.add(shape);
      }
      return shapes;
    };

    const geometricShapes = createGeometricShapes();

    // Dynamic Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x00ffff, 1, 100);
    pointLight1.position.set(20, 20, 20);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xff0080, 0.8, 100);
    pointLight2.position.set(-20, -20, -20);
    scene.add(pointLight2);

    const spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.position.set(0, 50, 50);
    spotLight.castShadow = true;
    scene.add(spotLight);

    camera.position.set(0, 0, 30);

    // Advanced Animation Loop
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      // Animate particles with fluid motion
      if (particleSystemRef.current) {
        const positions = particleSystemRef.current.geometry.attributes.position.array;
        const velocities = particleSystemRef.current.geometry.attributes.velocity.array;
        
        for (let i = 0; i < positions.length; i += 3) {
          // Apply velocities
          positions[i] += velocities[i];
          positions[i + 1] += velocities[i + 1];
          positions[i + 2] += velocities[i + 2];

          // Add wave motion
          positions[i + 1] += Math.sin(time + i * 0.01) * 0.01;
          positions[i] += Math.cos(time + i * 0.01) * 0.005;

          // Boundary wrapping
          if (Math.abs(positions[i]) > 50) velocities[i] *= -1;
          if (Math.abs(positions[i + 1]) > 50) velocities[i + 1] *= -1;
          if (Math.abs(positions[i + 2]) > 50) velocities[i + 2] *= -1;
        }
        particleSystemRef.current.geometry.attributes.position.needsUpdate = true;
      }

      // Animate geometric shapes
      geometricShapes.forEach((shape, index) => {
        shape.rotation.x += shape.userData.rotSpeed.x;
        shape.rotation.y += shape.userData.rotSpeed.y;
        shape.rotation.z += shape.userData.rotSpeed.z;
        
        shape.position.y += Math.sin(time + index) * shape.userData.floatSpeed;
        shape.position.x += Math.cos(time + index * 0.5) * 0.001;
      });

      // Dynamic lighting
      pointLight1.position.x = Math.sin(time) * 30;
      pointLight1.position.z = Math.cos(time) * 30;
      pointLight2.position.x = Math.cos(time * 0.8) * 25;
      pointLight2.position.y = Math.sin(time * 0.8) * 25;

      // Camera movement with mouse
      camera.position.x += (mousePosition.x * 5 - camera.position.x) * 0.01;
      camera.position.y += (mousePosition.y * 5 - camera.position.y) * 0.01;
      camera.lookAt(scene.position);

      // Scroll-based camera movement
      camera.position.z = 30 + scrollY * 0.01;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [mousePosition, scrollY]);


  if (isLoading) {
    return (
      <>  
        <OnAppLoading />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      {/* Enhanced Three.js Background */}
      <canvas ref={canvasRef} className="fixed inset-0 -z-10" />
      
      {/* Dynamic gradient overlays */}
      <div className="fixed inset-0 bg-gradient-to-br from-cyan-900/10 via-transparent to-purple-900/10 -z-5 pointer-events-none animate-pulse" />
      <div className="fixed inset-0 bg-gradient-to-tl from-blue-900/5 via-transparent to-pink-900/5 -z-5 pointer-events-none" style={{animationDelay: '2s'}} />
      
      {/* Enhanced Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-2xl border-b border-white/10 shadow-2xl">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="text-4xl font-black tracking-wider">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent hover:scale-110 transition-transform cursor-pointer">
                KK
              </span>
            </div>
            
            <div className="hidden lg:flex items-center space-x-8">
              {[
                { id: 'home', label: 'Home', icon: 'bx-home-alt' },
                { id: 'about', label: 'About', icon: 'bx-user' },
                { id: 'experience', label: 'Experience', icon: 'bx-briefcase' },
                { id: 'skills', label: 'Skills', icon: 'bx-code-alt' },
                { id: 'projects', label: 'Projects', icon: 'bx-folder-open' },
                { id: 'contact', label: 'Contact', icon: 'bx-message-dots' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`group flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-500 ${
                    activeSection === item.id 
                      ? 'bg-gradient-to-r from-cyan-500/30 to-blue-500/30 text-cyan-300 border border-cyan-400/50 shadow-lg shadow-cyan-500/25 scale-105' 
                      : 'hover:text-cyan-400 hover:bg-white/10 hover:scale-105 hover:shadow-lg'
                  }`}
                >
                  <i className={`bx ${item.icon} text-xl group-hover:rotate-12 transition-transform`} />
                  <span className="font-semibold tracking-wide">{item.label}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden w-14 h-14 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-2xl border border-white/20 hover:border-cyan-400/50 hover:bg-cyan-400/20 transition-all duration-300"
            >
              <i className={`bx ${isMenuOpen ? 'bx-x' : 'bx-menu'} text-2xl transition-transform duration-300 ${isMenuOpen ? 'rotate-180': '' }`} />
            </button>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="lg:hidden mt-6 p-6 bg-black/80 rounded-2xl backdrop-blur-2xl border border-white/20 shadow-2xl">
              {[
                { id: 'home', label: 'Home', icon: 'bx-home-alt' },
                { id: 'about', label: 'About', icon: 'bx-user' },
                { id: 'experience', label: 'Experience', icon: 'bx-briefcase' },
                { id: 'skills', label: 'Skills', icon: 'bx-code-alt' },
                { id: 'projects', label: 'Projects', icon: 'bx-folder-open' },
                { id: 'contact', label: 'Contact', icon: 'bx-message-dots' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setIsMenuOpen(false);
                    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex items-center space-x-4 w-full p-4 rounded-xl hover:bg-white/10 hover:scale-105 transition-all duration-300 group"
                >
                  <i className={`bx ${item.icon} text-2xl text-cyan-400 group-hover:rotate-12 transition-transform`} />
                  <span className="text-lg font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Revolutionary Hero Section */}
      <HeroSection />

      {/* Revolutionary About Section */}
      <AboutMe />

      {/* Elite Experience Section */}
      <Experience />

      {/* Mind-blowing Skills Section */}
      <Skills />

      {/* Spectacular Projects Section */}
      <Projects />

      {/* Awards & Certifications */}
      <AwardsAndCertificates />

      {/* Contact Section */}
      <ContactMe />

      {/* Footer */}
      <Footer />

      {/* Back to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl shadow-cyan-500/50 hover:scale-125 hover:rotate-12 transition-all duration-300 z-40 ${
          scrollY > 500 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <i className="bx bx-up-arrow-alt text-2xl text-white" />
      </button>

   
    </div>
  );
};

export default Portfolio;