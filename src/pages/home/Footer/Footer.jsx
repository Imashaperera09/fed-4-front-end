import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-background py-12 px-6 border-t border-border transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Smart Energy Logo and Description */}
          <div className="col-span-1">
            <div className="flex items-center gap-4 mb-4 group">
              <div className="w-20 h-20 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-110">
                <img src="/assests/logo.png" alt="SolarNova Logo" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-2xl font-extrabold tracking-tighter flex items-center">
                <span className="text-orange-500">Solar</span>
                <span className="text-blue-600">Nova</span>
              </h3>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Revolutionizing wind farm management through advanced digital twin technology and predictive insights.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-secondary rounded flex items-center justify-center cursor-pointer hover:bg-secondary/80">
                <svg className="w-4 h-4 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </div>
              <div className="w-8 h-8 bg-secondary rounded flex items-center justify-center cursor-pointer hover:bg-secondary/80">
                <svg className="w-4 h-4 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </div>
              <div className="w-8 h-8 bg-secondary rounded flex items-center justify-center cursor-pointer hover:bg-secondary/80">
                <svg className="w-4 h-4 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>
              <div className="w-8 h-8 bg-secondary rounded flex items-center justify-center cursor-pointer hover:bg-secondary/80">
                <svg className="w-4 h-4 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Solutions Column */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Solutions</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Digital Twin Platform</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Predictive Analytics</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Remote Monitoring</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Performance Optimization</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Real-time Alerts</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Maintenance Planning</a></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Documentation</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">API Reference</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Case Studies</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">White Papers</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Blog</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Support Center</a></li>
            </ul>
          </div>

          {/* Get in Touch Column */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Get in Touch</h4>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <div className="text-sm text-muted-foreground">
                  <p>123 Innovation Drive</p>
                  <p>Energy Tech Park</p>
                  <p>Copenhagen, Denmark</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                <p className="text-sm text-muted-foreground">+45 33 62 17 00</p>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                <p className="text-sm text-muted-foreground">contact@solarnova.com</p>
              </div>
            </div>

            <div>
              <h5 className="text-sm font-medium text-foreground mb-3">Stay Updated</h5>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder:text-muted-foreground"
                />
                <button className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Terms of Service</a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Cookie Policy</a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Accessibility</a>
            </div>
            <p className="text-sm text-muted-foreground">© 2026 SolarNova. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
