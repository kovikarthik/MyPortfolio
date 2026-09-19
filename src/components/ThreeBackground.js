import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create 3D Particle Field
    const particleCount = 2800;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 120;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 120;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 120;

      // Linear / Vercel Color Trio: Indigo (#6366F1), Sky Cyan (#38BDF8), Emerald (#10B981)
      const rand = Math.random();
      if (rand < 0.5) {
        // Electric Indigo
        colors[i * 3] = 0.388;
        colors[i * 3 + 1] = 0.4;
        colors[i * 3 + 2] = 0.945;
      } else if (rand < 0.85) {
        // Sky Cyan
        colors[i * 3] = 0.22;
        colors[i * 3 + 1] = 0.74;
        colors[i * 3 + 2] = 0.97;
      } else {
        // Emerald
        colors[i * 3] = 0.06;
        colors[i * 3 + 1] = 0.72;
        colors[i * 3 + 2] = 0.5;
      }
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.28,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    // Animated Wireframe Geometric Meshes
    const shapesGroup = new THREE.Group();
    const geometries = [
      new THREE.IcosahedronGeometry(2, 0),
      new THREE.OctahedronGeometry(2.2, 0),
      new THREE.TetrahedronGeometry(1.8, 0),
      new THREE.TorusGeometry(2, 0.5, 12, 24),
    ];

    const meshes = [];
    for (let i = 0; i < 18; i++) {
      const geom = geometries[i % geometries.length];
      const mat = new THREE.MeshBasicMaterial({
        color: i % 3 === 0 ? 0x6366f1 : i % 3 === 1 ? 0x38bdf8 : 0x10b981,
        wireframe: true,
        transparent: true,
        opacity: 0.2,
      });

      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.set(
        (Math.random() - 0.5) * 75,
        (Math.random() - 0.5) * 75,
        (Math.random() - 0.5) * 50
      );
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);

      mesh.userData = {
        rotSpeedX: (Math.random() - 0.5) * 0.01,
        rotSpeedY: (Math.random() - 0.5) * 0.01,
      };

      shapesGroup.add(mesh);
      meshes.push(mesh);
    }

    scene.add(shapesGroup);

    // Mouse tracking Parallax
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      particleSystem.rotation.y += 0.0006;
      particleSystem.rotation.x += 0.0003;

      meshes.forEach((mesh) => {
        mesh.rotation.x += mesh.userData.rotSpeedX;
        mesh.rotation.y += mesh.userData.rotSpeedY;
      });

      camera.position.x += (mouseX * 4 - camera.position.x) * 0.03;
      camera.position.y += (-mouseY * 4 - camera.position.y) * 0.03;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-80" />;
}
