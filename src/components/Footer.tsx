export function Footer() {
  return (
    <footer id="contact" className="pt-24 pb-12 bg-neutral-50 border-t border-black/5">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
          <div>
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
              Don't hesitate to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">reach out to us</span>
            </h2>
            <p className="text-lg text-muted max-w-md mb-8">
              Whether you are looking to scale your current operations or build a new growth engine from scratch, we are ready to partner.
            </p>
            <a
              href="mailto:hello@f1marketing.com"
              className="inline-block px-8 py-4 bg-black text-white font-semibold rounded-full hover:bg-neutral-800 transition-colors"
            >
              Get a Free Audit
            </a>
          </div>

          <div className="grid grid-cols-1 md:justify-self-end">
            <div>
              <h4 className="text-neutral-900 font-semibold mb-6">Navigation</h4>
              <ul className="space-y-4">
                <li><a href="/#about" className="text-muted hover:text-neutral-900 transition-colors">About</a></li>
                <li><a href="/#services" className="text-muted hover:text-neutral-900 transition-colors">Service</a></li>
                <li><a href="/#case-studies" className="text-muted hover:text-neutral-900 transition-colors">Case Studies</a></li>
                <li><a href="/#portfolio" className="text-muted hover:text-neutral-900 transition-colors">Portfolio</a></li>
                <li><a href="#" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">Become an Affiliate</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-black/10 text-sm text-neutral-500">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
             <div className="w-5 h-5 bg-black rounded-sm rotate-45 flex items-center justify-center opacity-50">
               <div className="w-2 h-2 bg-white rounded-full" />
             </div>
             F1 Marketing
          </div>
          <p>© {new Date().getFullYear()} F1 Marketing. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
