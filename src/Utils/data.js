import NativeNest_Event from "../Assets/NativeNest_Event.jpeg";
import FutureU_App from "../Assets/FutureU_App.png";
import Origem from "../Assets/Origem.png";

export const skills = [
    { name: 'React.js', level: 95, category: 'Frontend', icon: 'bxl-react', color: 'from-cyan-400 to-blue-500' },
    { name: 'Node.js', level: 92, category: 'Backend', icon: 'bxl-nodejs', color: 'from-green-400 to-emerald-500' },
    { name: 'Python', level: 90, category: 'Programming', icon: 'bxl-python', color: 'from-yellow-400 to-orange-500' },
    { name: 'AWS', level: 88, category: 'Cloud', icon: 'bxl-aws', color: 'from-orange-400 to-red-500' },
    { name: 'MongoDB', level: 90, category: 'Database', icon: 'bxl-mongodb', color: 'from-green-500 to-teal-500' },
    { name: 'TypeScript', level: 87, category: 'Programming', icon: 'bxl-typescript', color: 'from-blue-500 to-indigo-500' },
    { name: 'GraphQL', level: 86, category: 'API', icon: 'bx-data', color: 'from-pink-400 to-purple-500' },
    { name: 'React Native', level: 89, category: 'Mobile', icon: 'bxl-react', color: 'from-purple-400 to-pink-500' }
  ];

export const projects = [
    {
      id: 1,
      title: 'NativeNest Grocery Platform',
      description: 'E-commerce grocery platform with mobile and web apps, built using React Native, React, GraphQL, and AWS deployment.',
      longDescription: 'Led a 4-member team to deliver production-grade mobile and web apps with React Native, GraphQL APIs, secure payments, Google Maps, push notifications, and CI/CD on AWS. Optimized checkout with Apollo caching and integrated real-time inventory for 30,000+ active users.',
      tech: ['React Native', 'React', 'Node.js' , 'Express.js', 'GraphQL', 'MongoDB', 'AWS', 'Apollo', 'CI/CD'],
      stats: { Speed: '30%↑', Team: '4', Uptime: '99.9%', Users: '30K+' },
      image: NativeNest_Event,
      categories: ['Mobile App', 'Web App', 'E-commerce'],
      navigationLink : 'https://nativenest.in/',
      year: '2024',
      featured: true
    },
    {
      id: 2,
      title: 'FutureU Mobile App',
      description: 'An end-to-end mobile application that centralizes all student resources, relocation guides, and essential campus services for 42k+ CSULB students.',
      // longDescription: 'Developed and deployed the "FutureU" mobile application, a comprehensive resource hub for California State University, Long Beach (CSULB) students. The app centralizes critical information on student resources, relocation services, and various campus services, enhancing the student experience and accessibility. The project involved implementing in-app notifications, push notifications, and a student feedback system to improve communication and gather insights for future enhancements.',
      longDescription: 'Developed the FutureU mobile app for CSULB students, serving as a central hub for campus resources, relocation, and services. The project included implementing in-app and push notifications for timely updates and a feedback system to drive continuous improvement.',
      tech: ['React Native', 'Node.js', 'Express.js', 'AWS', 'FCM/APNS', 'SSO'],
      stats: {
        Status : 'In Beta Testing' ,
        Platforms : 'iOS, Android',
        Developer : 'Solo',
        Goal : '42K+ Users'
      },
      image: FutureU_App,
      categories: ['Mobile App', 'Web App'],
      year: '2025',
      navigationLink : 'https://www.asicsulb.org/corporate/discover/futureu',
      featured: true
    },
    {
      id: 3,
      title: 'Origem Jewellery Shopping Application',
      description: 'E-commerce for a fast-growing LGD jewelry brand, built with Next.js + Magento and Redis caching.',
      longDescription: 'Built a responsive storefront with Next.js, Magento backend, Redis caching, and Razorpay payments. Added ISR and a dynamic sitemap for SEO. Live achieving ₹20M topline revenue in the first 3 months.',
      tech: ['Next.js', 'Tailwind CSS', 'Node.js', 'Express.js', 'Redis', 'Magento', 'Razorpay', 'SEO', 'ISR', 'AWS'],
      stats: {
        Speed : '25%↑ faster loads' ,
        SEO : 'Dynamic SEO sitemap' ,
        Scalability : 'ISR optimized' ,
        Revenue : '₹20M in first 3 months' ,
        Users : '10,000+ monthly' ,
      },
      image: Origem,
      categories: ['E-commerce', 'Retail', 'LGD Jewelry'],
      year: '2024',
      navigationLink : 'https://origemindia.com/',
      featured: true
    },
    {
      id: 4,
      title: 'MirrorMate Screen Casting',
      description: 'Windows desktop application for wireless screen sharing using C# and Miracast technology.',
      longDescription: 'Led development of a cross-platform screen casting solution with optimized streaming protocols, Wi-Fi-based sharing, and user-friendly interface for seamless device connectivity.',
      tech: ['C#', 'Miracast', 'Windows API', 'WPF', 'UWP', 'Wi-Fi Direct'],
      stats: { Platforms: '3+', Latency: '<100ms', Users: '5K+' },
      image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=600&h=400&fit=crop',
      categories: ['Desktop App'],
      year: '2023',
      navigationLink : '',
      featured: false
    },
    {
      id: 5,
      title: 'AI Slum Detection System',
      description: 'Smart India Hackathon project using computer vision and employment platform integration.',
      longDescription: 'Award-winning AI solution combining satellite imagery analysis with employment opportunities for affected communities, featuring automated messaging and comprehensive urban planning insights.',
      tech: ['Angular', 'Python', 'TensorFlow', 'Node.js', 'Twilio', 'AI'],
      stats: { Accuracy: '94%', Coverage: '10K+', Award: 'National' },
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop',
      categories: ['AI/ML'],
      year: '2022',
      navigationLink : '',
      featured: false
    },
    {
      id: 6,
      title: 'Booking Bee - AI Appointment Manager',
      description: 'Full-stack salon booking system with Angular, NestJS, and Dasha AI integration.',
      longDescription: 'Revolutionary appointment booking platform enabling real-time scheduling via mobile calls, live chat integration, secure payment gateway, and AI-powered customer interactions.',
      tech: ['Angular', 'NestJS', 'MongoDB', 'Dasha AI', 'Payment Gateway'],
      stats: { Bookings: '10K+', Automation: '80%', Satisfaction: '95%' },
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop',
      categories: ['AI/Automation'],
      year: '2022',
      navigationLink : 'https://bookingbee.ai/',
      featured: false
    }
  ];

export const experience = [
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
      period: 'Jan 2023 - Jan 2025',
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

export const certifications = [
    { name: 'ISTE AP Best Student Innovator Award', type: 'Gold Medal', year: '2023', icon: 'bx-trophy' },
    { name: 'Smart India Hackathon', type: 'National Finalist', year: '2022', icon: 'bx-medal' },
    { name: 'HackerRank Problem Solving', type: 'Top 5%', year: '2023', icon: 'bx-code-alt' },
    { name: 'AWS Cloud Practitioner', type: 'Certified', year: '2024', icon: 'bxl-aws' }
  ];