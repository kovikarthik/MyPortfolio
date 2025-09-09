import React, { useEffect, useRef, useState } from 'react'
import emailjs from "@emailjs/browser";
import { toast } from 'react-toastify';

export default function ContactMe() {
    const formRef = useRef();
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
        subject: ""
    });

    const [emailStatus, setEmailStatus] = useState('Send Message')
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { target } = e;
        const { name, value } = target;

        setForm({
            ...form,
            [name]: value,
        });
    };

      useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://platform.linkedin.com/badges/js/profile.js';
        script.async = true;
        script.defer = true;
        script.type = 'text/javascript';

        document.body.appendChild(script);

        return () => {
          // Clean up the script when the component unmounts
          document.body.removeChild(script);
        };
      }, []); // The empty array ensures this runs only once after the initial render


    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setEmailStatus("Sending...")
        emailjs
            .send(
                'service_znyy4xo',
                'template_98y4ahf',
                {
                    from_name: form.name,
                    from_email: form.email,
                    subject: form.subject,
                    message: form.message,
                    page_url: window.location.href,
                    submitted_at: new Date().toLocaleString("en-US", {
                        timeZone: "America/Los_Angeles",
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                    }),
                    year: new Date().getFullYear()
                },
                { publicKey: 'EtOer1HulMBDZD3bi' }
            )
            .then(
                () => {
                    setLoading(false);
                    // alert("Thank you. I will get back to you as soon as possible.");
                    toast.success(
                        <span style={{ textAlign:'center' }}>
                            Thanks for reaching out!  <br />&nbsp; I’ll get back to you shortly. 🚀
                        </span>
                    );


                    setTimeout(() => {
                        setEmailStatus("Send Message")
                    }, 1000)
                    setForm({
                        name: "",
                        email: "",
                        message: "",
                        subject: ""
                    });
                },
                (error) => {
                    setLoading(false);
                    toast.error("Failed to send")
                    console.error(error);
                    alert("Ahh, something went wrong. Please try again.");
                }
            );
    };

  return (
    <>
      <section id="contact" className="py-14 md:py-24 xl:py-32 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl xl:text-7xl font-black mb-2 md:mb-8">
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
                <div className="bg-white/10 p-5 xl:p-8 rounded-2xl backdrop-blur-2xl border border-white/20">
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
                  <h3 className="text-2xl font-bold text-white mb-6">Connect on Social</h3>
                  <div className="flex justify-center space-x-4">
                    {[
                      { icon: 'bxl-linkedin', label: 'LinkedIn', href: 'https://linkedin.com/in/karthikkovi/', color: 'from-blue-500 to-blue-600' },
                      { icon: 'bxl-github', label: 'GitHub', href: 'https://github.com/kovikarthik', color: 'from-gray-600 to-gray-700' },
                      // { icon: 'bxl-twitter', label: 'Twitter', href: '#', color: 'from-cyan-400 to-blue-500' }
                    ].map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target='_blank'
                        rel="noreferrer"
                        className={`group w-14 h-14 bg-gradient-to-r ${social.color} rounded-full flex items-center justify-center transition-all ease-in-out duration-100 hover:scale-125 hover:rotate-12 active:scale-100 shadow-lg`}
                        title={social.label}
                      >
                        <i className={`bx ${social.icon} text-xl text-white`} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white/10 p-5 xl:p-8 rounded-2xl backdrop-blur-2xl border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-8 flex items-center space-x-3">
                  <i className="bx bx-send text-cyan-400 text-3xl" />
                  <span>Send Message</span>
                </h3>
                
                <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
                 <input 
                    name='name'
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your good name"
                    type="text" 
                    className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                 />

                 <input 
                    onChange={handleChange}
                    name='email'
                    type="email" 
                    value={form.email}
                    placeholder="Enter your email ID"
                    className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                  />
                  
                  <input 
                   onChange={handleChange}
                    type="text" 
                    name="subject"
                    value= {form.subject}
                    placeholder="Enter subject of your message"
                    className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                  />
                  
                  <textarea 
                    rows={6}
                    name='message'
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Enter your message"
                    className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 resize-none"
                  />
                  
                  <button 
                    type="submit"
                    disabled={!form.subject || !form.name || !form.email || !form.message || loading}
                    className={`group w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-lg flex items-center justify-center space-x-3 ${(!form.subject || !form.name || !form.email || !form.message || loading) ? 'opacity-70 cursor-not-allowed' : 'opacity-100 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50 active:scale-90 '}`}
                  >
                    <span>{emailStatus}</span>
                    <i className={`bx bx-paper-plane text-xl ${(!form.subject || !form.name || !form.email || !form.message || loading)?'':'group-hover:translate-x-2 group-hover:-translate-y-1 transition-transformm'}`} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="badge-base LI-profile-badge container mx-auto px-6 flex justify-center mt-12" data-locale="en_US" data-size="large" data-theme="light" data-type="HORIZONTAL" data-vanity="karthikkovi" data-version="v1">
          <a class="badge-base__link LI-simple-link" aria-label="Karthik Kovi LinkedIn Profile" href="https://www.linkedin.com/in/karthikkovi?trk=profile-badge"></a>
        </div>

      </section>
    </>
  )
}
