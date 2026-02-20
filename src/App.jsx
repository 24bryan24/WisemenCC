import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  Instagram, 
  Mail, 
  Coffee, 
  Heart, 
  Globe, 
  ChevronRight, 
  Plus, 
  Equal,
  Crown,
  Settings
} from 'lucide-react';
import AdminPanel from './AdminPanel';
import { loadContent, saveContent, resetContent } from './contentStore';

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [adminOpen, setAdminOpen] = useState(false);
  const [content, setContent] = useState(loadContent);

  const handleContentUpdate = (newContent) => {
    setContent(newContent);
    saveContent(newContent);
  };

  const handleResetContent = () => {
    if (!window.confirm('Reset all content to defaults? This cannot be undone.')) return;
    const reset = resetContent();
    setContent(reset);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToCart = () => setCartCount(prev => prev + 1);

  const products = content.products || [];

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans text-stone-800">
      
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-stone-900 text-white shadow-xl py-3' : 'bg-transparent text-white py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Crown className="w-8 h-8 text-amber-500" />
              <div className="flex flex-col">
                <span className="font-serif font-bold text-xl tracking-widest leading-none uppercase">{content.logoTitle}</span>
                <span className="text-[0.65rem] tracking-[0.2em] text-amber-500 uppercase font-semibold">{content.logoSubtitle}</span>
              </div>
            </div>

            <div className="hidden md:flex space-x-8 items-center">
              <a href="#home" className="hover:text-amber-500 transition-colors font-medium text-sm tracking-wider uppercase">Home</a>
              <a href="#mission" className="hover:text-amber-500 transition-colors font-medium text-sm tracking-wider uppercase">Who We Are</a>
              <a href="#shop" className="hover:text-amber-500 transition-colors font-medium text-sm tracking-wider uppercase">Shop</a>
              <a href="#contact" className="hover:text-amber-500 transition-colors font-medium text-sm tracking-wider uppercase">Contact</a>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setAdminOpen(true)}
                className="p-2 hover:text-amber-500 transition-colors"
                title="Edit site content"
              >
                <Settings className="w-5 h-5" />
              </button>
              <button className="relative p-2 hover:text-amber-500 transition-colors group">
                <ShoppingBag className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-amber-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                    {cartCount}
                  </span>
                )}
              </button>
              <button 
                className="md:hidden p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-stone-900 text-white border-t border-stone-800 shadow-xl">
            <div className="px-4 pt-2 pb-6 space-y-1 flex flex-col">
              <a href="#home" className="block px-3 py-3 hover:bg-stone-800 rounded-md font-medium" onClick={() => setMobileMenuOpen(false)}>Home</a>
              <a href="#mission" className="block px-3 py-3 hover:bg-stone-800 rounded-md font-medium" onClick={() => setMobileMenuOpen(false)}>Who We Are</a>
              <a href="#shop" className="block px-3 py-3 hover:bg-stone-800 rounded-md font-medium" onClick={() => setMobileMenuOpen(false)}>Shop</a>
              <a href="#contact" className="block px-3 py-3 hover:bg-stone-800 rounded-md font-medium" onClick={() => setMobileMenuOpen(false)}>Contact</a>
              <button
                onClick={() => { setAdminOpen(true); setMobileMenuOpen(false); }}
                className="block w-full text-left px-3 py-3 hover:bg-stone-800 rounded-md font-medium flex items-center gap-2"
              >
                <Settings className="w-4 h-4" /> Edit Site
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            src={content.images?.heroBackground || 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'} 
            alt="Pouring Coffee" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-stone-950/60 mix-blend-multiply"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
          <span className="block text-amber-500 font-semibold tracking-[0.2em] uppercase mb-4 animate-fade-in-up">{content.heroTagline}</span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
            {content.heroHeadline1}<br/>{content.heroHeadline2}
          </h1>
          <p className="text-lg md:text-xl text-stone-200 mb-10 max-w-2xl mx-auto font-light">
            {content.heroSubtext}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#shop" className="bg-amber-600 hover:bg-amber-500 text-white px-8 py-4 rounded-sm font-bold tracking-wider uppercase transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-amber-500/25 flex items-center justify-center">
              {content.heroCtaPrimary} <ChevronRight className="ml-2 w-5 h-5" />
            </a>
            <a href="#mission" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-sm font-bold tracking-wider uppercase transition-all flex items-center justify-center">
              {content.heroCtaSecondary}
            </a>
          </div>
        </div>
      </section>

      {/* Mission / Who We Are Section */}
      <section id="mission" className="py-24 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 tracking-wide uppercase">{content.missionTitle}</h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto mb-8"></div>
            <p className="text-lg md:text-xl leading-relaxed text-stone-300 font-light">
              {content.missionParagraph}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 mt-16">
            <div className="relative group w-full lg:w-1/3 overflow-hidden rounded-lg shadow-2xl aspect-square">
              <img src={content.images?.equationCoffee || 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&w=800&q=80'} alt="Coffee Beans" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent flex items-end p-8">
                <h3 className="text-2xl font-serif font-bold text-amber-500 tracking-wider">{content.equationCoffee}</h3>
              </div>
            </div>

            <div className="text-amber-500 hidden lg:block animate-pulse">
              <Plus className="w-12 h-12" />
            </div>
            <div className="text-amber-500 lg:hidden py-4">
              <Plus className="w-8 h-8" />
            </div>

            <div className="relative group w-full lg:w-1/3 overflow-hidden rounded-lg shadow-2xl aspect-square">
              <img src={content.images?.equationMission || 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=800&q=80'} alt="Bible" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent flex items-end p-8">
                <h3 className="text-2xl font-serif font-bold text-amber-500 tracking-wider">{content.equationMission}</h3>
              </div>
            </div>

            <div className="text-amber-500 hidden lg:block animate-pulse">
              <Equal className="w-12 h-12" />
            </div>
            <div className="text-amber-500 lg:hidden py-4">
              <Equal className="w-8 h-8" />
            </div>

            <div className="relative group w-full lg:w-1/3 overflow-hidden rounded-lg shadow-2xl aspect-square bg-stone-800 flex flex-col items-center justify-center p-8 border border-stone-700 hover:border-amber-500 transition-colors duration-300">
              <Crown className="w-20 h-20 text-amber-500 mb-6" />
              <h3 className="text-3xl font-serif font-bold text-white tracking-widest text-center uppercase leading-tight">
                {content.equationResult}<br/><span className="text-xl text-amber-500">{content.equationResultSub}</span>
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-amber-50 border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-700">
                <Coffee className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold font-serif mb-2 text-stone-800">{content.feature1Title}</h4>
              <p className="text-stone-600">{content.feature1Desc}</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-700">
                <Heart className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold font-serif mb-2 text-stone-800">{content.feature2Title}</h4>
              <p className="text-stone-600">{content.feature2Desc}</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-700">
                <Globe className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold font-serif mb-2 text-stone-800">{content.feature3Title}</h4>
              <p className="text-stone-600">{content.feature3Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Shop Section */}
      <section id="shop" className="py-24 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-amber-600 font-bold tracking-widest uppercase text-sm">{content.shopTagline}</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mt-2 text-stone-900 uppercase">{content.shopTitle}</h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {products.map((product) => (
              <div key={product.id} className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-stone-100 flex flex-col h-full transform hover:-translate-y-2">
                <div className="relative h-72 overflow-hidden bg-stone-100">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-stone-800 uppercase tracking-wider shadow-sm">
                    {product.roast}
                  </div>
                </div>
                
                <div className="p-8 flex flex-col flex-grow text-center">
                  <h3 className="text-2xl font-serif font-bold text-stone-900 mb-2">{product.name}</h3>
                  <p className="text-stone-500 mb-6 text-sm flex-grow">{product.description}</p>
                  <p className="text-xl font-bold text-amber-600 mb-6">${product.price.toFixed(2)}</p>
                  
                  <button 
                    onClick={addToCart}
                    className="w-full bg-stone-900 hover:bg-amber-600 text-white py-3 rounded-md font-bold uppercase tracking-widest transition-colors duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>Select Options</span>
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <button className="bg-transparent border-2 border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white px-10 py-4 rounded-sm font-bold uppercase tracking-widest transition-all duration-300">
              {content.shopViewAll}
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-amber-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">{content.newsletterTitle}</h2>
          <p className="text-amber-100 mb-8 max-w-2xl mx-auto">{content.newsletterSubtext}</p>
          <form className="flex flex-col sm:flex-row max-w-lg mx-auto gap-2" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder={content.newsletterPlaceholder} 
              className="flex-grow px-4 py-3 rounded-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900"
              required
            />
            <button type="submit" className="bg-stone-900 hover:bg-stone-800 text-white px-6 py-3 rounded-sm font-bold uppercase tracking-wider transition-colors">
              {content.newsletterButton}
            </button>
          </form>
        </div>
      </section>

      {/* Footer / Contact Section */}
      <footer id="contact" className="relative bg-stone-950 text-stone-300 py-20 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src={content.images?.footerBackground || 'https://images.unsplash.com/photo-1511556820780-d912e42b4980?auto=format&fit=crop&w=1920&q=80'} 
            alt="Coffee Beans Background" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="col-span-1 lg:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <Crown className="w-8 h-8 text-amber-500" />
                <div className="flex flex-col">
                  <span className="font-serif font-bold text-2xl tracking-widest text-white uppercase leading-none">{content.footerBrandTitle}</span>
                  <span className="text-xs tracking-[0.2em] text-amber-500 uppercase font-semibold">{content.footerBrandSubtitle}</span>
                </div>
              </div>
              <p className="text-stone-400 mb-8 max-w-md">
                {content.footerAbout}
              </p>
            </div>

            <div>
              <h4 className="text-white font-serif font-bold text-lg mb-6 uppercase tracking-wider">{content.footerQuickLinksTitle}</h4>
              <ul className="space-y-4">
                <li><a href="#home" className="hover:text-amber-500 transition-colors">{content.footerLinkHome}</a></li>
                <li><a href="#mission" className="hover:text-amber-500 transition-colors">{content.footerLinkAbout}</a></li>
                <li><a href="#mission" className="hover:text-amber-500 transition-colors">{content.footerLinkSupport}</a></li>
                <li><a href="#shop" className="hover:text-amber-500 transition-colors">{content.footerLinkShop}</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-serif font-bold text-lg mb-6 uppercase tracking-wider">{content.footerContactTitle}</h4>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-amber-500 mt-0.5" />
                  <a href={`mailto:${content.footerEmail}`} className="hover:text-amber-500 transition-colors break-all">
                    {content.footerEmail}
                  </a>
                </li>
                <li className="flex items-center space-x-3 pt-2">
                  <a href="#" className="bg-amber-600 hover:bg-amber-500 p-2 rounded-sm text-white transition-colors">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <span className="text-sm">{content.footerInstagramText}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-stone-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-stone-500">
            <p>&copy; {new Date().getFullYear()} {content.footerCopyright}</p>
            <p className="mt-2 md:mt-0">{content.footerTagline}</p>
          </div>
        </div>
      </footer>

      {adminOpen && (
        <AdminPanel
          content={content}
          onUpdate={handleContentUpdate}
          onClose={() => setAdminOpen(false)}
          onReset={handleResetContent}
        />
      )}
    </div>
  );
};

export default App;
