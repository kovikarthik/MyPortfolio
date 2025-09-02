import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentProject, setCurrentProject] = useState(0);
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const particleSystemRef = useRef(null);

  useEffect(() => {
    // Loading animation
    setTimeout(() => setIsLoading(false), 3000);

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

  const skills = [
    { name: 'React.js', level: 95, category: 'Frontend', icon: 'bxl-react', color: 'from-cyan-400 to-blue-500' },
    { name: 'Node.js', level: 92, category: 'Backend', icon: 'bxl-nodejs', color: 'from-green-400 to-emerald-500' },
    { name: 'Python', level: 90, category: 'Programming', icon: 'bxl-python', color: 'from-yellow-400 to-orange-500' },
    { name: 'AWS', level: 88, category: 'Cloud', icon: 'bxl-aws', color: 'from-orange-400 to-red-500' },
    { name: 'MongoDB', level: 90, category: 'Database', icon: 'bxl-mongodb', color: 'from-green-500 to-teal-500' },
    { name: 'TypeScript', level: 87, category: 'Programming', icon: 'bxl-typescript', color: 'from-blue-500 to-indigo-500' },
    { name: 'GraphQL', level: 86, category: 'API', icon: 'bx-data', color: 'from-pink-400 to-purple-500' },
    { name: 'React Native', level: 89, category: 'Mobile', icon: 'bxl-react', color: 'from-purple-400 to-pink-500' }
  ];

  const projects = [
    {
      id: 1,
      title: 'NativeNest Grocery Platform',
      description: 'Production-grade mobile and web platform serving 30,000+ users with React Native, GraphQL, and AWS infrastructure.',
      longDescription: 'Led a 4-member team to build a comprehensive grocery platform featuring real-time inventory management, secure payment integration, advanced caching strategies, and seamless user experience across mobile and web platforms.',
      tech: ['React Native', 'GraphQL', 'AWS', 'Redis', 'MongoDB', 'Node.js'],
      stats: { users: '30K+', performance: '30%↑', team: '4', uptime: '99.9%' },
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      category: 'Mobile App',
      year: '2024',
      featured: true
    },
    {
      id: 2,
      title: 'FutureU Mobile App',
      description: 'End-to-end mobile application development for 12,000+ monthly users with accessibility standards.',
      longDescription: 'Independently developed a comprehensive mobile app with WCAG 2.1/2.2 AA accessibility standards, audio streaming SDK integration, and campus Single Sign-On for seamless user access.',
      tech: ['React Native', 'Node.js', 'AWS LightSail', 'SSO', 'Audio SDK'],
      stats: { users: '12K+', accessibility: 'AA', deployment: '40%↓' },
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop',
      category: 'Mobile App',
      year: '2025',
      featured: true
    },
    {
      id: 3,
      title: 'Origem Jewellery E-commerce',
      description: 'High-performance e-commerce platform with Next.js, Redis caching, and integrated payment systems.',
      longDescription: 'Delivered a stunning jewellery shopping experience with dynamic product pages, SEO optimization, secure Razorpay integration, and Redis middleware that cut load times by 25%.',
      tech: ['Next.js', 'Tailwind', 'Redis', 'Razorpay', 'Magento', 'SEO'],
      stats: { performance: '25%↑', seo: '100%', conversion: '15%↑' },
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=400&fit=crop',
      category: 'E-commerce',
      year: '2024',
      featured: false
    },
    {
      id: 4,
      title: 'MirrorMate Screen Casting',
      description: 'Windows desktop application for wireless screen sharing using C# and Miracast technology.',
      longDescription: 'Led development of a cross-platform screen casting solution with optimized streaming protocols, Wi-Fi-based sharing, and user-friendly interface for seamless device connectivity.',
      tech: ['C#', 'Miracast', 'Windows API', 'WPF', 'Wi-Fi Direct'],
      stats: { platforms: '3+', latency: '<100ms', users: '5K+' },
      image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=600&h=400&fit=crop',
      category: 'Desktop App',
      year: '2023',
      featured: false
    },
    {
      id: 5,
      title: 'AI Slum Detection System',
      description: 'Smart India Hackathon project using computer vision and employment platform integration.',
      longDescription: 'Award-winning AI solution combining satellite imagery analysis with employment opportunities for affected communities, featuring automated messaging and comprehensive urban planning insights.',
      tech: ['Angular', 'Python', 'TensorFlow', 'Node.js', 'Twilio', 'AI'],
      stats: { accuracy: '94%', coverage: '10K+', award: 'National' },
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop',
      category: 'AI/ML',
      year: '2022',
      featured: false
    },
    {
      id: 6,
      title: 'Booking Bee - AI Appointment Manager',
      description: 'Full-stack salon booking system with Angular, NestJS, and Dasha AI integration.',
      longDescription: 'Revolutionary appointment booking platform enabling real-time scheduling via mobile calls, live chat integration, secure payment gateway, and AI-powered customer interactions.',
      tech: ['Angular', 'NestJS', 'MongoDB', 'Dasha AI', 'Payment Gateway'],
      stats: { bookings: '1K+', automation: '80%', satisfaction: '95%' },
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop',
      category: 'AI/Automation',
      year: '2022',
      featured: false
    }
  ];

  const experience = [
    {
      company: 'Associated Students, Inc. - CSULB',
      role: 'Software Developer',
      period: 'Feb 2025 - Present',
      location: 'California, USA',
      current: true,
      achievements: [
        'Developed FutureU Mobile App serving 12,000+ monthly users',
        'Implemented WCAG 2.1/2.2 AA accessibility standards',
        'Built CI/CD pipeline reducing deployment effort by 40%',
        'Optimized AWS infrastructure reducing load times by 30%',
        'Delivered ASI websites with 50% improved content efficiency'
      ],
      tech: ['React Native', 'React', 'Node.js', 'AWS', 'WordPress', 'CI/CD']
    },
    {
      company: 'Infobell IT Solutions Pvt Ltd',
      role: 'Full Stack Developer',
      period: 'Jul 2023 - Jan 2025',
      location: 'Bengaluru, India',
      current: false,
      achievements: [
        'Led 4-member team launching NativeNest platform for 30K+ users',
        'Optimized checkout latency by 30% using Apollo caching',
        'Delivered Origem storefront with 25% faster load times',
        'Mentored interns and managed 6 on-time Agile releases',
        'Built MirrorMate Windows app with Wi-Fi screen sharing'
      ],
      tech: ['GraphQL', 'Next.js', 'Redis', 'C#', 'MongoDB', 'React Native']
    }
  ];

  const certifications = [
    { name: 'ISTE AP Best Student Innovator Award', type: 'Gold Medal', year: '2023', icon: 'bx-trophy' },
    { name: 'Smart India Hackathon', type: 'National Finalist', year: '2022', icon: 'bx-medal' },
    { name: 'HackerRank Problem Solving', type: 'Top 5%', year: '2023', icon: 'bx-code-alt' },
    { name: 'AWS Cloud Practitioner', type: 'Certified', year: '2024', icon: 'bxl-aws' }
  ];

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-purple-900 flex items-center justify-center z-50">
        <div className="text-center relative">
          {/* Animated loading rings */}
          <div className="relative w-40 h-40 mx-auto mb-8">
            <div className="absolute inset-0 border-4 border-cyan-400/20 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 border-4 border-cyan-400 rounded-full border-t-transparent animate-spin"></div>
            <div className="absolute inset-2 border-3 border-blue-500/60 rounded-full border-r-transparent animate-spin" style={{animationDirection: 'reverse', animationDuration: '2s'}}></div>
            <div className="absolute inset-4 border-2 border-purple-400/40 rounded-full border-b-transparent animate-spin" style={{animationDuration: '3s'}}></div>
            <div className="absolute inset-8 border border-pink-400/30 rounded-full border-l-transparent animate-spin" style={{animationDirection: 'reverse', animationDuration: '4s'}}></div>
          </div>
          
          <div className="text-4xl font-black mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-pulse">
              KARTHIK KOVI
            </span>
          </div>
          
          <div className="text-cyan-400 text-lg mb-4 tracking-[0.3em] uppercase font-light animate-pulse">
            Elite Developer
          </div>
          
          <div className="flex items-center justify-center space-x-2 text-gray-400">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      </div>
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
              <i className={`bx ${isMenuOpen ? 'bx-x' : 'bx-menu'} text-2xl transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} />
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
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="mb-12">
            <div className="text-xl text-cyan-400 mb-6 tracking-[0.5em] uppercase font-light opacity-0 animate-fade-in-up" style={{animationDelay: '0.3s', animationFillMode: 'forwards'}}>
               Full Stack Developer
            </div>
            
            <h1 className="text-5xl md:text-5xl lg:text-7xl font-black mb-8 leading-none opacity-0 animate-fade-in-up" style={{animationDelay: '0.6s', animationFillMode: 'forwards'}}>
              <span className="bg-gradient-to-r from-white via-blue-200 to-blue-300 bg-clip-text text-transparent block">
                KARTHIK
              </span>
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent block mt-4">
                KOVI
              </span>
            </h1>
            
            <div className="max-w-5xl mx-auto mb-12 opacity-0 animate-fade-in-up" style={{animationDelay: '0.9s', animationFillMode: 'forwards'}}>
              <p className="text-2xl md:text-3xl text-gray-300 leading-relaxed mb-6">
                Architecting the future of digital experiences through
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-lg">
                {['Technology', 'Innovation', 'Expertise', 'Integration'].map((tech, index) => (
                  <span key={tech} className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full border border-cyan-400/30 text-cyan-300 font-medium hover:scale-110 transition-transform duration-300 cursor-default">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-8 justify-center mb-20 opacity-0 animate-fade-in-up" style={{animationDelay: '1.2s', animationFillMode: 'forwards'}}>
            <button 
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-bold text-xl overflow-hidden hover:scale-110 hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
              <span className="relative flex items-center justify-center space-x-3">
                <i className="bx bx-rocket text-2xl" />
                <span>Explore My Work</span>
                <i className="bx bx-right-arrow-alt text-2xl group-hover:translate-x-2 transition-transform" />
              </span>
            </button>
            
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative px-10 py-5 bg-white/5 border-2 border-cyan-400/50 rounded-full font-bold text-xl backdrop-blur-2xl overflow-hidden hover:bg-cyan-400/20 hover:border-cyan-300 hover:shadow-2xl hover:shadow-cyan-400/50 transition-all duration-500"
            >
              <span className="relative flex items-center justify-center space-x-3">
                <i className="bx bx-message-dots text-2xl group-hover:scale-125 transition-transform" />
                <span>Let's Connect</span>
                <i className="bx bx-paper-plane text-2xl group-hover:rotate-12 transition-transform" />
              </span>
            </button>
          </div>

          <div className="flex justify-center space-x-6 opacity-0 animate-fade-in-up" style={{animationDelay: '1.5s', animationFillMode: 'forwards'}}>
            {[
              { icon: 'bxl-linkedin', label: 'LinkedIn', href: 'https://in.linkedin.com/in/karthikkovi', color: 'hover:text-blue-400' },
              { icon: 'bxl-github', label: 'GitHub', href: '#', color: 'hover:text-gray-300' },
              { icon: 'bx-envelope', label: 'Email', href: 'mailto:karthikkovik@gmail.com', color: 'hover:text-red-400' },
              { icon: 'bx-phone', label: 'Phone', href: 'tel:+15622840297', color: 'hover:text-green-400' }
            ].map((social) => (
              <a
                key={social.label}
                    href={social.href}
                    target='_blank'
                className={`group w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-2xl border border-white/20 hover:border-cyan-400/70 hover:bg-cyan-400/20 hover:scale-125 hover:rotate-12 transition-all duration-500 ${social.color}`}
                title={social.label}
              >
                <i className={`bx ${social.icon} text-2xl transition-all duration-300`} />
              </a>
            ))}
          </div>
        </div>

        {/* Animated scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center space-y-2 animate-bounce">
            <div className="text-cyan-400 text-sm font-medium tracking-widest">SCROLL</div>
            <div className="w-6 h-12 border-2 border-cyan-400/70 rounded-full p-1">
              <div className="w-1 h-4 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full mx-auto animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Revolutionary About Section */}
      <section id="about" className="min-h-screen py-32 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-6xl md:text-7xl font-black mb-8">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                About Me
              </span>
            </h2>
            <div className="w-32 h-2 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full shadow-lg shadow-cyan-500/50" />
          </div>

          <div className="grid lg:grid-cols-2 gap-20 items-center max-w-7xl mx-auto">
            <div className="space-y-10">
              <div className="text-xl leading-relaxed space-y-8 text-gray-300">
                <p className="text-2xl leading-relaxed">
                  I'm a visionary <span className="text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text font-bold">Full Stack Developer</span> currently pursuing 
                  my Master's in Computer Science at <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text font-semibold">California State University, Long Beach</span>. 
                  With a stellar <span className="text-transparent bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text font-bold">3.67 GPA</span>, I merge academic excellence 
                  with industry-leading expertise.
                </p>
                <p className="text-lg">
                  My transformative journey spans from leading elite development teams to architecting scalable applications 
                  that serve <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text font-bold">30,000+ users</span>. 
                  I specialize in cutting-edge web technologies, cloud infrastructure, and creating 
                  revolutionary user experiences that set new industry standards.
                </p>
                <p className="text-lg">
                  Beyond coding, I'm an award-winning innovator with prestigious recognition from ISTE AP 
                  and Smart India Hackathon. I believe in building technology that creates meaningful, 
                  lasting impact on people's lives and drives digital transformation.
                </p>
                          </div>
                          
                          {/* <div className="relative">
              <div className="relative w-full max-w-lg mx-auto">
              
                
              {[
                  { icon: 'bxl-react', position: 'top-0 left-8', color: 'text-cyan-400' },
                  { icon: 'bxl-nodejs', position: 'top-8 right-0', color: 'text-green-400' },
                  { icon: 'bxl-aws', position: 'bottom-0 left-0', color: 'text-orange-400' },
                  { icon: 'bxl-python', position: 'bottom-8 right-8', color: 'text-yellow-400' }
                ].map((tech, index) => (
                  <div key={index} className={`absolute ${tech.position} w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-xl border border-white/20 animate-bounce`} style={{animationDelay: `${index * 0.5}s`}}>
                    <i className={`bx ${tech.icon} text-2xl ${tech.color}`} />
                  </div>
                ))}
                              
              </div>
            </div> */}

            
            </div>

                      <div>
                      <div className="grid grid-cols-2 gap-6">
                {[
                  { label: 'Projects Delivered', value: '25+', icon: 'bx-check-circle', color: 'from-green-400 to-emerald-500' },
                  { label: 'Users Impacted', value: '42K+', icon: 'bx-user', color: 'from-blue-400 to-cyan-500' },
                  { label: 'Tech Stack', value: '20+', icon: 'bx-code-alt', color: 'from-purple-400 to-pink-500' },
                  { label: 'Experience', value: '3+ Years', icon: 'bx-time', color: 'from-orange-400 to-red-500' }
                ].map((stat) => (
                  <div key={stat.label} className="group relative">
                    <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-2xl border border-white/20 hover:border-cyan-400/50 transition-all duration-500 hover:scale-105 hover:rotate-1">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                          <i className={`bx ${stat.icon} text-2xl text-white`} />
                        </div>
                        <div className={`text-3xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                          {stat.value}
                        </div>
                      </div>
                      <div className="text-sm text-gray-400 font-medium tracking-wide">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
<br/>
              <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-8 rounded-2xl border border-cyan-400/30 backdrop-blur-xl">
                <h3 className="text-2xl font-bold text-cyan-300 mb-4 flex items-center space-x-3">
                  <i className="bx bx-trophy text-3xl" />
                  <span>Notable Achievements</span>
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-gray-300">
                  <div className="flex items-center space-x-3">
                    <i className="bx bx-medal text-yellow-400 text-xl" />
                    <span>ISTE AP Gold Medal Winner</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <i className="bx bx-trending-up text-green-400 text-xl" />
                    <span>HackerRank Top 5%</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <i className="bx bx-brain text-purple-400 text-xl" />
                    <span>SIH National Finalist</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <i className="bx bx-group text-blue-400 text-xl" />
                    <span>Tech Club Coordinator</span>
                  </div>
                </div>
              </div>
           </div>
          </div>
        </div>
      </section>

      {/* Elite Experience Section */}
      <section id="experience" className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-6xl md:text-7xl font-black mb-8">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Professional Journey
              </span>
            </h2>
            <div className="w-32 h-2 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full shadow-lg shadow-cyan-500/50" />
          </div>

          <div className="max-w-6xl mx-auto space-y-16">
            {experience.map((exp, index) => (
              <div key={index} className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-white/10 p-10 rounded-3xl backdrop-blur-2xl border border-white/20 hover:border-cyan-400/50 transition-all duration-500 group-hover:scale-[1.02]">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                    <div className="flex items-start space-x-6 text-left">
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${exp.current ? 'from-green-400 to-emerald-500' : 'from-blue-400 to-purple-500'} flex items-center justify-center`}>
                        <i className="bx bx-briefcase text-2xl text-white" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-black text-white mb-3">{exp.role}</h3>
                        <div className="text-cyan-400 text-xl font-bold mb-2">{exp.company}</div>
                        <div className="text-gray-400 flex items-center space-x-2">
                          <i className="bx bx-map text-lg" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className={`${exp.current ? 'bg-green-400/20 border-green-400/50 text-green-300' : 'bg-blue-400/20 border-blue-400/50 text-blue-300'} font-bold px-6 py-3 rounded-full border backdrop-blur-xl mt-6 lg:mt-0 flex items-center space-x-2`}>
                      {exp.current && <i className="bx bx-time-five animate-pulse" />}
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-10">
                    <div>
                      <h4 className="text-xl font-bold text-white mb-6 flex items-center space-x-3">
                        <i className="bx bx-rocket text-cyan-400 text-2xl" />
                        <span>Key Achievements</span>
                      </h4>
                      <ul className="space-y-4">
                        {exp.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start space-x-4 group/item">
                            <i className="bx bx-check-circle text-cyan-400 text-xl mt-1 group-hover/item:scale-125 transition-transform" />
                            <span className="text-gray-300 leading-relaxed text-lg group-hover/item:text-white transition-colors">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-white mb-6 flex items-center space-x-3">
                        <i className="bx bx-cog text-purple-400 text-2xl" />
                        <span>Technologies Used</span>
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {exp.tech.map((tech, techIndex) => (
                          <span key={tech} className="group/tech relative px-4 py-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 rounded-xl text-sm font-semibold border border-cyan-400/30 hover:border-cyan-300 hover:scale-110 hover:rotate-3 transition-all duration-300 cursor-default">
                            <span className="relative z-10">{tech}</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl opacity-0 group-hover/tech:opacity-100 transition-opacity duration-300"></div>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mind-blowing Skills Section */}
      <section id="skills" className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-6xl md:text-7xl font-black mb-8">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Technical Arsenal
              </span>
            </h2>
            <div className="w-32 h-2 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full shadow-lg shadow-cyan-500/50" />
          </div>

          <div className="max-w-7xl mx-auto mb-20">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {skills.map((skill, index) => (
                <div key={skill.name} className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative bg-white/10 p-8 rounded-2xl backdrop-blur-2xl border border-white/20 hover:border-cyan-400/50 transition-all duration-500 hover:scale-110 hover:rotate-1 text-center">
                    <div className={`w-20 h-20 bg-gradient-to-r ${skill.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500`}>
                      <i className={`bx ${skill.icon} text-3xl text-white`} />
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3">{skill.name}</h3>
                    <div className="text-sm text-cyan-400 font-medium mb-4 uppercase tracking-widest">{skill.category}</div>
                    
                    {/* Animated progress bar */}
                    <div className="relative w-full h-2 bg-white/20 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                        style={{width: `${skill.level}%`}}
                      />
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white/30 to-transparent animate-pulse"></div>
                    </div>
                    <div className="text-right text-xs text-gray-400 mt-2 font-bold">{skill.level}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Categories */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                category: 'Frontend Mastery',
                icon: 'bx-paint',
                color: 'from-cyan-400 to-blue-500',
                techs: ['React', 'Next.js', 'Angular', 'React Native', 'Tailwind']
              },
              {
                category: 'Backend Power',
                icon: 'bx-server',
                color: 'from-green-400 to-emerald-500',
                techs: ['Node.js', 'Express', 'NestJS', 'GraphQL', 'REST APIs']
              },
              {
                category: 'Cloud & DevOps',
                icon: 'bx-cloud',
                color: 'from-orange-400 to-red-500',
                techs: ['AWS', 'Docker', 'CI/CD', 'LightSail', 'S3']
              },
              {
                category: 'Data & AI',
                icon: 'bx-data',
                color: 'from-purple-400 to-pink-500',
                techs: ['MongoDB', 'PostgreSQL', 'Redis', 'TensorFlow', 'ML']
              }
            ].map((category, index) => (
              <div key={category.category} className="group">
                <div className="bg-white/5 p-8 rounded-2xl backdrop-blur-2xl border border-white/10 hover:border-cyan-400/30 hover:scale-105 transition-all duration-500">
                  <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-500`}>
                    <i className={`bx ${category.icon} text-2xl text-white`} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 text-center">{category.category}</h3>
                  <div className="space-y-2">
                    {category.techs.map((tech) => (
                      <div key={tech} className="text-center py-1 px-3 bg-white/10 rounded-lg text-sm text-gray-300 hover:text-cyan-400 transition-colors">
                        {tech}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spectacular Projects Section */}
      <section id="projects" className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-6xl md:text-7xl font-black mb-8">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Featured Projects
              </span>
            </h2>
            <div className="w-32 h-2 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full shadow-lg shadow-cyan-500/50" />
            <p className="text-xl text-gray-400 mt-8 max-w-3xl mx-auto">
              Showcasing innovative solutions that have impacted thousands of users worldwide
            </p>
          </div>

          {/* Featured Projects Carousel */}
          <div className="mb-20">
            <div className="relative max-w-7xl mx-auto">
              <div className="overflow-hidden rounded-3xl">
                <div className="flex transition-transform duration-700 ease-out" style={{transform: `translateX(-${currentProject * 100}%)`}}>
                  {projects.filter(p => p.featured).map((project) => (
                    <div key={project.id} className="w-full flex-shrink-0">
                      <div className="grid lg:grid-cols-2 gap-12 items-center p-12 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20">
                        <div className="space-y-8">
                          <div>
                            <div className="flex items-center space-x-4 mb-4">
                              <span className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full text-cyan-400 text-sm font-bold border border-cyan-400/30">
                                {project.category}
                              </span>
                              <span className="text-gray-400 font-medium">{project.year}</span>
                            </div>
                            <h3 className="text-4xl font-black text-white mb-6">{project.title}</h3>
                            <p className="text-xl text-gray-300 leading-relaxed mb-8">{project.longDescription}</p>
                          </div>

                          <div className="grid grid-cols-3 gap-6">
                            {Object.entries(project.stats).map(([key, value]) => (
                              <div key={key} className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                                <div className="text-2xl font-bold text-cyan-400">{value}</div>
                                <div className="text-xs text-gray-400 uppercase tracking-widest">{key}</div>
                              </div>
                            ))}
                          </div>

                          <div className="flex flex-wrap gap-3">
                            {project.tech.map((tech) => (
                              <span key={tech} className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 rounded-full text-sm font-medium border border-purple-400/30 hover:scale-110 transition-transform">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="relative group/image">
                          <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded-2xl blur-xl opacity-0 group-hover/image:opacity-100 transition-opacity duration-500"></div>
                          <img 
                            src={project.image} 
                            alt={project.title}
                            className="relative w-full h-80 object-cover rounded-2xl border border-white/20 group-hover/image:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Carousel controls */}
              <div className="flex justify-center space-x-4 mt-8">
                {projects.filter(p => p.featured).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentProject(index)}
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${
                      currentProject === index 
                        ? 'bg-gradient-to-r from-cyan-400 to-blue-500 scale-125 shadow-lg shadow-cyan-500/50' 
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* All Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {projects.map((project, index) => (
              <div key={project.id} className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-white/10 rounded-2xl backdrop-blur-2xl border border-white/20 overflow-hidden hover:border-cyan-400/50 hover:scale-105 transition-all duration-500">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full text-cyan-300 text-xs font-bold border border-cyan-400/50 backdrop-blur-xl">
                        {project.year}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full text-purple-300 text-xs font-bold border border-purple-400/50 backdrop-blur-xl">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                    <p className="text-gray-400 leading-relaxed mb-6">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.slice(0, 4).map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-white/10 text-cyan-400 rounded-lg text-xs font-medium border border-cyan-400/20">
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 4 && (
                        <span className="px-3 py-1 bg-white/10 text-gray-400 rounded-lg text-xs font-medium border border-white/20">
                          +{project.tech.length - 4} more
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex space-x-4">
                        {Object.entries(project.stats).slice(0, 2).map(([key, value]) => (
                          <div key={key} className="text-center">
                            <div className="text-lg font-bold text-cyan-400">{value}</div>
                            <div className="text-xs text-gray-500 uppercase">{key}</div>
                          </div>
                        ))}
                      </div>
                      <button className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center hover:scale-125 hover:rotate-12 transition-all duration-300 group/btn">
                        <i className="bx bx-right-arrow-alt text-xl text-white group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Certifications */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-6xl md:text-7xl font-black mb-8">
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Awards & Recognition
              </span>
            </h2>
            <div className="w-32 h-2 bg-gradient-to-r from-yellow-400 to-red-500 mx-auto rounded-full shadow-lg shadow-yellow-500/50" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {certifications.map((cert, index) => (
              <div key={index} className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500/30 to-red-500/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-white/10 p-8 rounded-2xl backdrop-blur-2xl border border-white/20 hover:border-yellow-400/50 transition-all duration-500 hover:scale-110 hover:rotate-2 text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                    <i className={`bx ${cert.icon} text-3xl text-white`} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{cert.name}</h3>
                  <div className="text-yellow-400 font-semibold mb-2">{cert.type}</div>
                  <div className="text-gray-400 text-sm">{cert.year}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-6xl md:text-7xl font-black mb-8">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Let's Connect
              </span>
            </h2>
            <div className="w-32 h-2 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full shadow-lg shadow-cyan-500/50" />
            <p className="text-2xl text-gray-400 mt-8 max-w-3xl mx-auto">
              Ready to build something extraordinary together? Let's discuss your next project.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-8">
                <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-2xl border border-white/20">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
                    <i className="bx bx-conversation text-cyan-400 text-3xl" />
                    <span>Get In Touch</span>
                  </h3>
                  
                  <div className="space-y-6">
                    <a href="mailto:karthikkovik@gmail.com" className="group flex items-center space-x-4 p-4 rounded-xl hover:bg-white/10 transition-all duration-300">
                      <div className="w-12 h-12 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <i className="bx bx-envelope text-xl text-white" />
                      </div>
                      <div>
                        <div className="text-white font-semibold">Email</div>
                        <div className="text-gray-400">karthikkovik@gmail.com</div>
                      </div>
                    </a>

                    <a href="tel:+15622840297" className="group flex items-center space-x-4 p-4 rounded-xl hover:bg-white/10 transition-all duration-300">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <i className="bx bx-phone text-xl text-white" />
                      </div>
                      <div>
                        <div className="text-white font-semibold">Phone</div>
                        <div className="text-gray-400">+1 (562) 284-0297</div>
                      </div>
                    </a>

                    <div className="flex items-center space-x-4 p-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                        <i className="bx bx-map text-xl text-white" />
                      </div>
                      <div>
                        <div className="text-white font-semibold">Location</div>
                        <div className="text-gray-400">California, USA</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-2xl border border-white/20">
                  <h3 className="text-xl font-bold text-white mb-6">Connect on Social</h3>
                  <div className="flex space-x-4">
                    {[
                      { icon: 'bxl-linkedin', label: 'LinkedIn', href: '#', color: 'from-blue-500 to-blue-600' },
                      { icon: 'bxl-github', label: 'GitHub', href: '#', color: 'from-gray-600 to-gray-700' },
                      { icon: 'bxl-twitter', label: 'Twitter', href: '#', color: 'from-cyan-400 to-blue-500' }
                    ].map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        className={`group w-14 h-14 bg-gradient-to-r ${social.color} rounded-full flex items-center justify-center hover:scale-125 hover:rotate-12 transition-all duration-300 shadow-lg`}
                        title={social.label}
                      >
                        <i className={`bx ${social.icon} text-xl text-white`} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-2xl border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-8 flex items-center space-x-3">
                  <i className="bx bx-send text-cyan-400 text-3xl" />
                  <span>Send Message</span>
                </h3>
                
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <input 
                        type="text" 
                        placeholder="Your Name"
                        className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <input 
                        type="email" 
                        placeholder="Your Email"
                        className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                      />
                    </div>
                  </div>
                  
                  <input 
                    type="text" 
                    placeholder="Subject"
                    className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                  />
                  
                  <textarea 
                    rows={6}
                    placeholder="Your Message"
                    className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 resize-none"
                  />
                  
                  <button 
                    type="submit"
                    className="group w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-lg hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 flex items-center justify-center space-x-3"
                  >
                    <span>Send Message</span>
                    <i className="bx bx-paper-plane text-xl group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 relative border-t border-white/10">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-8">
            <div className="text-4xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-4">
              KARTHIK KOVI
            </div>
            <p className="text-gray-400 text-lg">
              Crafting the future, one line of code at a time.
            </p>
          </div>
          
          <div className="flex justify-center space-x-8 mb-8">
            {[
              { icon: 'bxl-linkedin', href: '#' },
              { icon: 'bxl-github', href: '#' },
              { icon: 'bx-envelope', href: 'mailto:karthikkovik@gmail.com' },
              { icon: 'bx-phone', href: 'tel:+15622840297' }
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="group w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-xl border border-white/20 hover:border-cyan-400/50 hover:bg-cyan-400/20 hover:scale-125 hover:rotate-12 transition-all duration-500"
              >
                <i className={`bx ${social.icon} text-xl group-hover:text-cyan-400 transition-colors`} />
              </a>
            ))}
          </div>
          
          <div className="text-gray-500 text-sm">
            © 2025 Karthik Kovi. Designed with passion and innovation.
          </div>
        </div>
      </footer>

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