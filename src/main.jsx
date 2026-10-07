import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, BadgeCheck, BarChart3, Box, BriefcaseBusiness, Check,
  CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, ClipboardList, Clock3, Copy, ExternalLink,
  Eye, FileImage, Filter, FolderOpen, Globe2, Heart, Image as ImageIcon, Layers3,
  LayoutDashboard, LogOut, Mail, MapPin, Menu, MessageCircle, Minus, Package, Palette, Pencil,
  Phone, Plus, Quote, Search, Send, Settings, ShoppingBag, Sparkles, Star, Tags, Trash2, Upload, X,
  Zap
} from 'lucide-react';
import './styles.css';

const Instagram = ({ size = 18, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const WA = '919491554114';
const PHONE = '9491554114';
const ADDRESS = 'Rajahmundry, Andhra Pradesh';
const IG = 'https://www.instagram.com/jsm_bags/';

const remoteImages = {
  hero: 'https://images.pexels.com/photos/8954490/pexels-photo-8954490.jpeg?auto=compress&cs=tinysrgb&w=1600',
  heroAlt: 'https://images.pexels.com/photos/6787035/pexels-photo-6787035.jpeg?auto=compress&cs=tinysrgb&w=1200',
  tote: 'https://images.pexels.com/photos/9869067/pexels-photo-9869067.jpeg?auto=compress&cs=tinysrgb&w=1200',
  pink: 'https://images.pexels.com/photos/19197736/pexels-photo-19197736.jpeg?auto=compress&cs=tinysrgb&w=1200',
  green: 'https://images.pexels.com/photos/4068314/pexels-photo-4068314.jpeg?auto=compress&cs=tinysrgb&w=1200',
  paper: 'https://images.pexels.com/photos/1666067/pexels-photo-1666067.jpeg?auto=compress&cs=tinysrgb&w=1200',
  mockup: 'https://images.pexels.com/photos/12024977/pexels-photo-12024977.jpeg?auto=compress&cs=tinysrgb&w=1200',
  retail: 'https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?auto=format&fit=crop&w=1200&q=80',
  canvasArt: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
  boutique: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=80',
  juteEco: 'https://images.unsplash.com/photo-1574634534894-89d7576c8259?auto=format&fit=crop&w=1200&q=80',
  corporateBag: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80',
  giftBag: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80',
  eventTote: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=80',
  craftTote: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=1200&q=80',
  cottonPack: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=1200&q=80',
  customProof: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
};
const local = (name) => `/assets/${name}`;

const productSeed = [
  { id: 'p1', name: 'Premium Printed Tote', category: 'Printed Bags', price: 'Quote on request', moq: '50 pcs', material: 'Canvas / Cotton', size: '12 × 14 in', image: remoteImages.heroAlt, featured: true, accent: 'coral', description: 'Clean, brand-ready totes for retail, events and promotional campaigns.' },
  { id: 'p2', name: 'Natural Jute Shopper', category: 'Jute Bags', price: 'Bulk pricing', moq: '50 pcs', material: 'Jute', size: '14 × 16 in', image: remoteImages.mockup, featured: true, accent: 'sage', description: 'Textured, premium-feel shoppers for eco-conscious brands and gifting.' },
  { id: 'p3', name: 'Branded Corporate Tote', category: 'Corporate', price: 'Quote on request', moq: '25 pcs', material: 'Cotton', size: 'Custom', image: remoteImages.pink, featured: true, accent: 'rose', description: 'Corporate gifting and conference totes designed around your identity.' },
  { id: 'p4', name: 'Retail Carry Bag', category: 'Shopping Bags', price: 'Bulk pricing', moq: '100 pcs', material: 'Non-woven', size: 'Multiple sizes', image: remoteImages.paper, featured: false, accent: 'amber', description: 'Practical carry bags made for stores, launches and daily retail use.' },
  { id: 'p5', name: 'Custom Event Bag', category: 'Event Bags', price: 'Quote on request', moq: '50 pcs', material: 'Fabric / Paper', size: 'Custom', image: remoteImages.tote, featured: false, accent: 'blue', description: 'Event-ready bags for campaigns, celebrations, exhibitions and giveaways.' },
  { id: 'p6', name: 'Eco Utility Bag', category: 'Eco Collection', price: 'Bulk pricing', moq: '50 pcs', material: 'Cotton', size: 'Custom', image: remoteImages.green, featured: false, accent: 'olive', description: 'Reusable everyday utility bags that put your brand in motion.' },
];

const workSeed = [
  { id: 'w1', title: 'Custom Retail Run', type: 'Retail branding', image: remoteImages.retail, copy: 'A vivid printed collection made for a retail-facing order.', tag: 'Printed', meta: 'Bulk / Brand print' },
  { id: 'w2', title: 'Mighty Hills Carry Bags', type: 'Business branding', image: remoteImages.canvasArt, copy: 'A clean branded canvas carry-bag application for creative retail.', tag: 'Corporate', meta: 'Custom / Logo print' },
  { id: 'w3', title: 'Pleats & Pearls Studio', type: 'Boutique packaging', image: remoteImages.boutique, copy: 'A sophisticated visual direction for a luxury boutique-style bag.', tag: 'Boutique', meta: 'Branding / Retail' },
  { id: 'w4', title: 'Maraya Greens', type: 'Lifestyle branding', image: remoteImages.juteEco, copy: 'Natural styling and premium positioning for an organic lifestyle brand.', tag: 'Premium', meta: 'Jute / Natural' },
  { id: 'w5', title: 'Rajahmundry Illustration', type: 'Signature artwork', image: remoteImages.heroAlt, copy: 'A place-led illustration turned into a memorable carry-bag graphic.', tag: 'Artwork', meta: 'Local / Signature' },
  { id: 'w6', title: 'Seasonal Campaign', type: 'Campaign creative', image: remoteImages.craftTote, copy: 'A promotional campaign combining sustainable fabric, seasonal messaging and visual storytelling.', tag: 'Campaign', meta: 'Social / Print' },
  { id: 'w7', title: 'Custom Gift Collection', type: 'Event gifting', image: remoteImages.giftBag, copy: 'A festive presentation built around custom printed carry bags.', tag: 'Events', meta: 'Gift / Print' },
  { id: 'w8', title: 'Corporate Utility Set', type: 'Utility / kits', image: remoteImages.corporateBag, copy: 'Practical branded executive bags positioned for corporate gifting and everyday business use.', tag: 'Corporate', meta: 'Utility / Bulk' },
];

const gallerySeed = [
  { id: 'g1', image: remoteImages.paper, caption: 'Retail collection' },
  { id: 'g2', image: remoteImages.tote, caption: 'Premium tote' },
  { id: 'g3', image: remoteImages.hero, caption: 'Custom artwork' },
  { id: 'g4', image: remoteImages.cottonPack, caption: 'Bulk production' },
  { id: 'g5', image: remoteImages.pink, caption: 'Seasonal print' },
  { id: 'g6', image: remoteImages.eventTote, caption: 'Retail showcase' },
];

const categories = ['All', 'Printed Bags', 'Jute Bags', 'Corporate', 'Shopping Bags', 'Event Bags', 'Eco Collection'];
const defaultSettings = {
  businessName: 'JSM Bags',
  tagline: 'Custom bags. Better brands.',
  phone: PHONE,
  whatsapp: PHONE,
  instagram: '@jsm_bags',
  address: ADDRESS,
};

const testimonials = [
  { quote: 'The custom print turned out clean, premium and exactly suited to the brand.', name: 'Business customer', role: 'Custom order' },
  { quote: 'Good variety, fast communication and a simple way to coordinate bulk requirements.', name: 'Wholesale buyer', role: 'Bulk order' },
  { quote: 'We wanted something practical but still brand-forward. The finished bags did the job.', name: 'Retail partner', role: 'Branding project' },
];

const clone = (v) => JSON.parse(JSON.stringify(v));
function useStored(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.some(x => typeof x?.image === 'string' && x.image.includes('/assets/work-'))) {
          localStorage.setItem(key, JSON.stringify(initial));
          return clone(initial);
        }
        if (key === 'jsm_settings' && (String(parsed?.phone).includes('94408') || String(parsed?.whatsapp).includes('94408'))) {
          localStorage.setItem(key, JSON.stringify(initial));
          return clone(initial);
        }
        return parsed;
      }
      return clone(initial);
    } catch { return clone(initial); }
  });
  const update = (next) => setValue(prev => {
    const resolved = typeof next === 'function' ? next(prev) : next;
    try { localStorage.setItem(key, JSON.stringify(resolved)); } catch {}
    return resolved;
  });
  return [value, update];
}

function waLink(message = 'Hello JSM Bags, I would like to discuss a bag requirement.') {
  return `https://wa.me/${WA}?text=${encodeURIComponent(message)}`;
}
function slugify(v) { return String(v).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
function scrollTop() {
  try {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  } catch {}
}

function ScrollToTop() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    scrollTop();
  }, [pathname, search]);
  return null;
}

function AppImage({ src, alt = '', className = '', ...rest }) {
  const [failed, setFailed] = useState(false);
  return failed ? <div className={`img-fallback ${className}`} {...rest}><Package size={28}/><span>JSM Bags</span></div> : <img src={src} alt={alt} className={className} onError={() => setFailed(true)} {...rest}/>;
}

function Logo({ light = false }) {
  return <Link to="/" className={`logo ${light ? 'light' : ''}`} onClick={scrollTop}>
    <span className="logo-mark"><AppImage src={local('logo-avatar.jpg')} alt="JSM Bags"/></span>
    <span className="logo-word"><strong>JSM</strong><small>BAGS</small></span>
  </Link>;
}

function Reveal({ children, delay = 0, className = '', once = true }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once, amount: 0.15 }} transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}>{children}</motion.div>;
}
function MagneticButton({ children, className = '', ...props }) {
  return <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}><a className={`btn ${className}`} {...props}>{children}</a></motion.div>;
}

function Navbar({ quoteCount = 0, onQuote }) {
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  useEffect(() => setOpen(false), [loc.pathname]);
  const links = [
    ['/','Home'],['/products','Catalogue'],['/work','Our Work'],['/custom-printing','Custom Print'],['/contact','Contact']
  ];
  return <>
    <div className="announcement"><span><Sparkles size={14}/> Custom printing + wholesale orders</span><span>Rajahmundry • Andhra Pradesh</span></div>
    <header className="site-nav">
      <div className="nav-shell">
        <Logo/>
        <nav className="main-nav">{links.map(([to,label]) => <NavLink key={to} to={to} end={to === '/'} className={({isActive}) => isActive ? 'active' : ''}>{label}</NavLink>)}</nav>
        <div className="nav-tools">
          <a href={IG} target="_blank" rel="noreferrer" className="nav-icon"><Instagram size={17}/></a>
          <button className="quote-button" onClick={onQuote}><ShoppingBag size={16}/><span>Quote bag</span>{quoteCount > 0 && <b>{quoteCount}</b>}</button>
          <MagneticButton className="nav-primary" href={waLink()} target="_blank" rel="noreferrer">WhatsApp <ArrowUpRight size={16}/></MagneticButton>
          <button className="mobile-toggle" onClick={() => setOpen(v => !v)}>{open ? <X/> : <Menu/>}</button>
        </div>
      </div>
      <AnimatePresence>{open && <motion.div className="mobile-menu-panel" initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}}><div>{links.map(([to,label]) => <NavLink key={to} to={to} end={to === '/'}>{label}</NavLink>)}<a href={waLink()} target="_blank" rel="noreferrer">WhatsApp enquiry <ArrowUpRight size={15}/></a><button onClick={onQuote}>Quote bag {quoteCount ? `(${quoteCount})` : ''}</button></div></motion.div>}</AnimatePresence>
    </header>
  </>;
}

function Marquee() {
  const items = ['Custom Printing','Wholesale Orders','Retail Bags','Corporate Kits','Event Bags','Jute & Cotton','WhatsApp Quotes'];
  return <div className="marquee"><div className="marquee-track">{[...items,...items].map((x,i)=><span key={i}><i>✦</i>{x}</span>)}</div></div>;
}

function Hero({ onQuote }) {
  const { scrollYProgress } = useScroll();
  const imageY = useTransform(scrollYProgress, [0, 0.25], [0, -32]);
  return <section className="hero">
    <div className="hero-gridline"/><div className="hero-ring ring-a"/><div className="hero-ring ring-b"/>
    <div className="container hero-layout">
      <div className="hero-copy">
        <Reveal><div className="eyebrow"><span className="eyebrow-dot"/> Rajahmundry • Bags made for brands</div></Reveal>
        <Reveal delay={0.05}><h1>Make your <span>brand</span><br/>impossible to miss.</h1></Reveal>
        <Reveal delay={0.1}><p>Custom printed bags, wholesale collections and packaging that turns everyday carry into brand visibility.</p></Reveal>
        <Reveal delay={0.15}><div className="hero-ctas"><MagneticButton className="primary" href="/products" onClick={(e)=>{e.preventDefault(); window.history.pushState({},'', '/products'); window.dispatchEvent(new PopStateEvent('popstate')); scrollTop();}}>Explore the catalogue <ArrowRight size={17}/></MagneticButton><MagneticButton className="secondary" href={waLink('Hello JSM Bags, I want to discuss a custom or bulk bag order.')} target="_blank" rel="noreferrer"><MessageCircle size={17}/> Start on WhatsApp</MagneticButton></div></Reveal>
        <Reveal delay={0.2}><div className="hero-trust"><div className="micro-stack"><span>PT</span><span>JG</span><span>CB</span><span>+</span></div><div><strong>Real work. Real enquiries. Real customisation.</strong><small>Built for businesses, events and everyday retail.</small></div></div></Reveal>
      </div>
      <div className="hero-art">
        <motion.div className="hero-main-photo" style={{ y: imageY }}><AppImage src={remoteImages.hero} alt="Modern branded tote bag"/></motion.div>
        <div className="hero-float hero-float-top"><div className="icon-badge coral"><Sparkles size={16}/></div><span>Custom orders</span><strong>100% brand-ready</strong></div>
        <div className="hero-float hero-float-bottom"><div className="icon-badge dark"><Box size={16}/></div><span>Bulk quantity</span><strong>MOQ starts from 25+</strong></div>
        <div className="hero-pod pod-one"><AppImage src={remoteImages.pink} alt="Printed tote detail"/></div>
        <div className="hero-pod pod-two"><AppImage src={remoteImages.mockup} alt="Paper bag detail"/></div>
        <div className="hero-label">01 <span>PRINT</span><i/> 02 <span>PACK</span><i/> 03 <span>DELIVER</span></div>
      </div>
    </div>
  </section>;
}

function SocialProof() {
  return <section className="proof-strip"><div className="container proof-inner"><span className="proof-lead"><BadgeCheck size={17}/> Built for real orders</span><span>Custom printing</span><span>Wholesale ready</span><span>Local support</span><span>WhatsApp first</span><span>Retail + events</span></div></section>;
}

function Home({ products, works, addToQuote, onQuote }) {
  const featured = products.filter(p=>p.featured).slice(0,3);
  return <>
    <Navbar quoteCount={useQuoteCount()} onQuote={onQuote}/>
    <main>
      <Hero onQuote={onQuote}/>
      <Marquee/>
      <SocialProof/>

      <section className="section categories-section"><div className="container">
        <div className="section-topline"><div><div className="eyebrow">What we make</div><h2>From everyday carry to <span>brand moments.</span></h2></div><Link className="text-link" to="/products">View all products <ArrowUpRight size={16}/></Link></div>
        <div className="category-mosaic">
          <CategoryCard title="Custom Printed" copy="Put your logo, campaign or artwork where it travels." image={remoteImages.heroAlt} accent="coral" large/>
          <CategoryCard title="Jute & Eco" copy="Natural textures for modern brands." image={remoteImages.mockup} accent="sage"/>
          <CategoryCard title="Corporate Kits" copy="Practical bags for teams, gifting and events." image={remoteImages.pink} accent="rose"/>
          <CategoryCard title="Retail Carry" copy="Consistent bags for everyday customer touchpoints." image={remoteImages.paper} accent="amber"/>
        </div>
      </div></section>

      <section className="section featured-products"><div className="container">
        <div className="section-topline"><div><div className="eyebrow">Shop / enquire</div><h2>A catalogue that <span>starts conversations.</span></h2><p className="section-copy">Choose a product, add it to your quote bag, then send one clean WhatsApp enquiry instead of juggling messages.</p></div><Link className="text-link" to="/products">Browse catalogue <ArrowUpRight size={16}/></Link></div>
        <div className="product-grid">{featured.map((p,i)=><ProductCard key={p.id} product={p} addToQuote={addToQuote} featured index={i}/>)}</div>
      </div></section>

      <section className="dark-story"><div className="container story-grid">
        <Reveal className="story-copy"><div className="eyebrow light-eyebrow">The custom workflow</div><h2>Brief it. <span>Print it.</span> Put it into the world.</h2><p>JSM is built around a simple flow: tell us what you need, send the artwork, choose the bag and move toward production with a real person on WhatsApp.</p><div className="story-points"><StoryPoint n="01" title="Share the brief" copy="Bag type, quantity, use case and artwork."/><StoryPoint n="02" title="Approve the direction" copy="Size, print, material and finishing."/><StoryPoint n="03" title="Move to production" copy="Bulk-ready delivery with clear communication."/></div><Link className="story-link" to="/custom-printing">See how custom printing works <ArrowRight size={17}/></Link></Reveal>
        <Reveal delay={0.08} className="story-collage"><div className="story-photo large"><AppImage src={remoteImages.green} alt="Natural tote in use"/></div><div className="story-photo small"><AppImage src={remoteImages.paper} alt="Paper bag detail"/></div><div className="story-card"><span>Custom print</span><strong>From your artwork to a bag people remember.</strong><div className="story-mini"><CheckCircle2 size={15}/> Easy WhatsApp coordination</div><div className="story-mini"><CheckCircle2 size={15}/> Bulk-order friendly</div></div></Reveal>
      </div></section>

      <section className="section work-section"><div className="container">
        <div className="section-topline"><div><div className="eyebrow">Proof / portfolio</div><h2>Work that gives the <span>website credibility.</span></h2><p className="section-copy">The portfolio is not decoration. It shows customers what JSM has actually put into the world.</p></div><Link className="text-link" to="/work">Explore our work <ArrowUpRight size={16}/></Link></div>
        <WorkMosaic works={works.slice(0,6)}/>
      </div></section>

      <section className="section trust-section"><div className="container trust-layout">
        <div className="trust-panel"><div className="eyebrow">Why choose JSM</div><h2>Professional where it matters. <span>Human where it counts.</span></h2><p>Make the website feel like a polished brand, but make the buying experience feel like talking to a responsive local supplier.</p><div className="trust-grid"><TrustCard icon={<Clock3/>} title="Fast communication" copy="A direct WhatsApp path keeps enquiries moving."/><TrustCard icon={<Layers3/>} title="Many bag types" copy="Printed, jute, cotton, retail, event and corporate use cases."/><TrustCard icon={<Palette/>} title="Brand-first print" copy="Show your logo, artwork or message the right way."/><TrustCard icon={<BriefcaseBusiness/>} title="Bulk-ready" copy="Designed for real business quantities, not just one-off shopping."/></div></div>
        <div className="quote-wall"><div className="quote-card-main"><Quote size={31}/><p>“We don't need another pretty catalogue. We need a website that helps people trust the work and message us quickly.”</p><div className="quote-author"><div className="quote-avatar">J</div><div><strong>JSM Bags</strong><span>Rajahmundry · Custom & wholesale</span></div></div></div><div className="quote-stat"><div className="stat-orbit"><Sparkles size={20}/></div><strong>Portfolio + catalogue + enquiry</strong><span>One experience, built to convert attention into conversations.</span></div></div>
      </div></section>

      <section className="testimonial-section"><div className="container"><div className="section-topline"><div><div className="eyebrow">Customer proof</div><h2>Small details create <span>big confidence.</span></h2></div></div><div className="testimonial-grid">{testimonials.map((t,i)=><Reveal key={t.name} delay={i*0.06} className="testimonial-card"><div className="stars">{Array.from({length:5}).map((_,j)=><Star key={j} size={14} fill="currentColor"/>)}</div><p>“{t.quote}”</p><div className="testimonial-author"><strong>{t.name}</strong><span>{t.role}</span></div></Reveal>)}</div></div></section>

      <FinalCta/>
    </main>
    <Footer/>
  </>;
}

function useQuoteCount() {
  const [count, setCount] = useState(() => { try { return JSON.parse(localStorage.getItem('jsm_quote') || '[]').length; } catch { return 0; } });
  useEffect(() => { const f=()=>{try{setCount(JSON.parse(localStorage.getItem('jsm_quote')||'[]').length)}catch{}}; window.addEventListener('jsm-quote',f); return()=>window.removeEventListener('jsm-quote',f); }, []);
  return count;
}

function CategoryCard({ title, copy, image, accent, large }) {
  return <Link to={`/products?category=${encodeURIComponent(title.includes('Jute')?'Jute Bags':title.includes('Corporate')?'Corporate':title.includes('Retail')?'Shopping Bags':'Printed Bags')}`} onClick={scrollTop} className={`category-card ${large?'large':''} accent-${accent}`}><AppImage src={image} alt={title}/><div className="category-shade"/><div className="category-meta"><span>{title}</span><h3>{copy}</h3><i><ArrowUpRight size={16}/></i></div></Link>;
}
function ProductCard({ product, addToQuote, featured=false }) {
  return <motion.article className={`product-card ${featured?'featured':''}`} whileHover={{ y: -8 }} transition={{ duration:0.25 }}>
    <div className="product-media"><Link to={`/products/${product.id}`} onClick={scrollTop} style={{display:'block',width:'100%',height:'100%'}}><AppImage src={product.image} alt={product.name}/></Link><span className={`product-badge ${product.accent}`}>{product.category}</span><button className="quick-add" onClick={()=>addToQuote(product)}><Plus size={17}/><span>Add to quote</span></button></div>
    <div className="product-body"><div><span className="muted-label">{product.moq} MOQ · {product.material}</span><h3><Link to={`/products/${product.id}`} onClick={scrollTop}>{product.name}</Link></h3><p>{product.description}</p></div><div className="product-foot"><strong>{product.price}</strong><Link to={`/products/${product.id}`} onClick={scrollTop}><ArrowUpRight size={17}/></Link></div></div>
  </motion.article>;
}
function StoryPoint({n,title,copy}){return <div className="story-point"><span>{n}</span><div><strong>{title}</strong><p>{copy}</p></div></div>}
function TrustCard({icon,title,copy}){return <div className="trust-card"><span className="trust-icon">{icon}</span><strong>{title}</strong><p>{copy}</p></div>}
function WorkMosaic({works}) { return <div className="work-mosaic">{works.map((w,i)=><Link to="/work" onClick={scrollTop} key={w.id} className={`work-tile tile-${i}`}><AppImage src={w.image} alt={w.title}/><div className="work-overlay"><span>{w.tag}</span><strong>{w.title}</strong><small>{w.meta}</small></div></Link>)}</div>; }
function FinalCta(){return <section className="final-cta"><div className="container"><div className="final-cta-inner"><div><div className="eyebrow light-eyebrow">Ready when you are</div><h2>Have a bag requirement? <span>Let's make it tangible.</span></h2><p>Tell us what you need. We'll take it from a rough idea to a clear enquiry.</p></div><div className="final-actions"><MagneticButton className="light-btn" href={waLink('Hello JSM Bags, I have a bag requirement and would like a quote.')} target="_blank" rel="noreferrer"><MessageCircle size={17}/> Request on WhatsApp</MagneticButton><Link className="outline-light" to="/contact" onClick={scrollTop}>Open contact form <ArrowRight size={17}/></Link></div></div></div></section>}
function Footer(){return <footer className="footer"><div className="container footer-top"><div className="footer-brand"><Logo light/><p>Custom printed bags, wholesale collections and brand-ready packaging from Rajahmundry.</p><div className="social-row"><a href={IG} target="_blank" rel="noreferrer"><Instagram size={16}/></a><a href={waLink()} target="_blank" rel="noreferrer"><MessageCircle size={16}/></a><a href={`tel:${PHONE}`}><Phone size={16}/></a></div></div><div><span className="footer-label">Explore</span><Link to="/products" onClick={scrollTop}>Catalogue</Link><Link to="/work" onClick={scrollTop}>Our Work</Link><Link to="/custom-printing" onClick={scrollTop}>Custom Printing</Link><Link to="/contact" onClick={scrollTop}>Contact</Link></div><div><span className="footer-label">Business</span><span>Rajahmundry</span><span>Andhra Pradesh</span><span>Wholesale & custom</span><span>WhatsApp orders</span></div><div className="footer-note"><span className="footer-label">A little promise</span><strong>Beautiful bags are useful. Useful bags are unforgettable.</strong><span>© {new Date().getFullYear()} JSM Bags</span></div></div><div className="container footer-bottom"><span>Designed as a conversion-first business storefront.</span><span>React + Vite • Local demo data • No database</span></div></footer>}

function Products({ products, addToQuote, quoteCount, onQuote }) {
  const query = new URLSearchParams(useLocation().search);
  const initialCategory = query.get('category') || 'All';
  const [category,setCategory] = useState(categories.includes(initialCategory) ? initialCategory : 'All');
  const [search,setSearch] = useState('');
  const filtered = useMemo(() => products.filter(p => (category==='All'||p.category===category) && `${p.name} ${p.category} ${p.description}`.toLowerCase().includes(search.toLowerCase())), [products,category,search]);
  useEffect(()=>{ const q=new URLSearchParams(window.location.search).get('category'); if(q && categories.includes(q)) { setCategory(q); scrollTop(); } }, [useLocation().search]);
  return <><Navbar quoteCount={quoteCount} onQuote={onQuote}/><main className="page-shell"><PageHero kicker="Catalogue" title={<>A better way to <span>shop by requirement.</span></>} copy="Browse the collection, compare bag types and add the right products to one quote bag before you message JSM."/><div className="container catalogue"><div className="catalogue-head"><div className="search-wrap"><Search size={17}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search bags, materials, use cases…"/></div><div className="filter-row">{categories.map(c=><button key={c} className={category===c?'active':''} onClick={()=>{setCategory(c); scrollTop();}}>{c}</button>)}</div></div><div className="catalogue-result"><span>{filtered.length} products</span><span><Filter size={14}/> Filters update instantly</span></div><div className="product-grid catalogue-grid">{filtered.map((p,i)=><Reveal key={p.id} delay={i*0.035}><ProductCard product={p} addToQuote={addToQuote}/></Reveal>)}{filtered.length===0&&<div className="empty-state"><Package size={24}/><strong>No bags match that search.</strong><span>Try another keyword or category.</span></div>}</div></div></main><Footer/></>;
}

function ProductDetail({ products, addToQuote, quoteCount, onQuote }) {
  const {id}=useParams(); const p=products.find(x=>x.id===id); if(!p) return <><Navbar quoteCount={quoteCount} onQuote={onQuote}/><div className="container not-found"><h1>Product not found.</h1><Link to="/products" className="btn primary">Back to catalogue</Link></div><Footer/></>;
  return <><Navbar quoteCount={quoteCount} onQuote={onQuote}/><main className="detail-page"><div className="container"><div className="breadcrumbs"><Link to="/products">Catalogue</Link><span>/</span><span>{p.category}</span><span>/</span><strong>{p.name}</strong></div><div className="detail-grid"><div className="detail-gallery"><div className="detail-main"><AppImage src={p.image} alt={p.name}/><span className={`product-badge ${p.accent}`}>{p.category}</span></div><div className="detail-thumbs"><div className="detail-thumb active"><AppImage src={p.image} alt=""/></div><div className="detail-thumb"><AppImage src={remoteImages.tote} alt=""/></div><div className="detail-thumb"><AppImage src={remoteImages.mockup} alt=""/></div></div></div><div className="detail-copy"><div className="eyebrow">{p.moq} MOQ · {p.material}</div><h1>{p.name}</h1><p className="detail-lead">{p.description}</p><div className="detail-price">{p.price}</div><div className="spec-grid"><Spec label="Material" value={p.material}/><Spec label="Size" value={p.size}/><Spec label="MOQ" value={p.moq}/><Spec label="Use case" value="Retail / Events / Business"/></div><div className="detail-actions"><button className="btn primary large" onClick={()=>addToQuote(p)}><ShoppingBag size={18}/> Add to quote bag</button><a className="btn secondary large" href={waLink(`Hello JSM Bags, I'm interested in ${p.name}. Please share pricing and available options.`)} target="_blank" rel="noreferrer"><MessageCircle size={18}/> Ask on WhatsApp</a></div><div className="detail-note"><CheckCircle2 size={16}/><span>Need a different print, size or quantity? We'll coordinate the custom requirement on WhatsApp.</span></div></div></div></div></main><FinalCta/><Footer/></>;
}
function Spec({label,value}){return <div className="spec"><span>{label}</span><strong>{value}</strong></div>}

function WorkPage({works, gallery, quoteCount, onQuote}) {
  const [filter,setFilter]=useState('All'); const filters=['All',...Array.from(new Set(works.map(w=>w.tag)))]; const items=filter==='All'?works:works.filter(w=>w.tag===filter);
  return <><Navbar quoteCount={quoteCount} onQuote={onQuote}/><main className="page-shell"><PageHero kicker="Our work" title={<>Proof is more powerful than <span>promises.</span></>} copy="This is where the website earns trust: real work, recognizable applications, different visual directions and the kind of detail a customer can point at and say — that's close to what we need."/><div className="container work-page"><div className="filter-row work-filters">{filters.map(f=><button key={f} className={filter===f?'active':''} onClick={()=>{setFilter(f); scrollTop();}}>{f}</button>)}</div><div className="case-grid">{items.map((w,i)=><Reveal key={w.id} delay={i*0.04}><article className="case-card"><div className="case-img"><AppImage src={w.image} alt={w.title}/><span>{w.tag}</span></div><div className="case-copy"><div><small>{w.type}</small><h3>{w.title}</h3><p>{w.copy}</p></div><div className="case-meta"><span>{w.meta}</span><ArrowUpRight size={17}/></div></div></article></Reveal>)}</div><div className="work-gallery"><div className="section-topline"><div><div className="eyebrow">Gallery / detail</div><h2>More work. <span>More proof.</span></h2></div></div><div className="gallery-strip">{gallery.map(g=><div className="gallery-card" key={g.id}><AppImage src={g.image} alt={g.caption}/><span>{g.caption}</span></div>)}</div></div></div></main><FinalCta/><Footer/></>;
}

function CustomPrinting({ quoteCount, onQuote }) {
  return <><Navbar quoteCount={quoteCount} onQuote={onQuote}/><main className="page-shell"><section className="custom-hero"><div className="container custom-hero-grid"><div><div className="eyebrow">Custom studio</div><h1>Turn a rough idea into a <span>bag worth carrying.</span></h1><p>From a simple logo to a full campaign, the website should make the custom-order process feel clear before the first message is sent.</p><div className="hero-ctas"><MagneticButton className="primary" href={waLink('Hello JSM Bags, I want a custom printed bag quote.')} target="_blank" rel="noreferrer"><MessageCircle size={17}/> Start a custom quote</MagneticButton><Link to="/work" className="btn secondary">See previous work <ArrowRight size={17}/></Link></div></div><div className="custom-hero-art"><div className="custom-image big"><AppImage src={remoteImages.heroAlt} alt="Printed tote bag"/></div><div className="custom-image small"><AppImage src={remoteImages.pink} alt="Pink tote"/></div><div className="floating-note"><Sparkles size={15}/><strong>Print-ready</strong><span>Logo • artwork • message</span></div></div></div></section><section className="section"><div className="container"><div className="section-topline"><div><div className="eyebrow">How it works</div><h2>Three steps. <span>Zero confusion.</span></h2></div></div><div className="step-grid"><Step n="01" title="Tell us the use case" copy="Retail, event, school, gifting, corporate or everyday business." icon={<BriefcaseBusiness/>}/><Step n="02" title="Share the artwork" copy="Send your logo, print or even a rough reference. We'll take it from there." icon={<FileImage/>}/><Step n="03" title="Confirm the bag" copy="Material, size, finish and quantity — then move into production." icon={<CheckCircle2/>}/></div></div></section><section className="section custom-proof"><div className="container custom-proof-grid"><div><div className="eyebrow">What can be customised</div><h2>Not just a logo. <span>The whole presence.</span></h2><div className="pill-list"><span>Logo & brand name</span><span>Event artwork</span><span>Corporate kits</span><span>Seasonal campaigns</span><span>Retail identity</span><span>Special occasions</span></div></div><div className="custom-proof-photo"><AppImage src={remoteImages.customProof} alt="JSM custom work"/><div className="photo-callout"><span>Real portfolio work</span><strong>Show the customer what is possible.</strong></div></div></div></section><FinalCta/></main><Footer/></>;
}
function Step({n,title,copy,icon}){return <div className="step-card"><div className="step-number">{n}</div><div className="step-icon">{icon}</div><h3>{title}</h3><p>{copy}</p><ArrowUpRight className="step-arrow" size={18}/></div>}

function Contact({ quoteCount, onQuote }) {
  const [sent,setSent]=useState(false); const [form,setForm]=useState({name:'',phone:'',requirement:'',quantity:'',category:'Printed Bags'});
  const submit=(e)=>{e.preventDefault(); if(!form.name||!form.phone||!form.requirement) return; try{const raw=JSON.parse(localStorage.getItem('jsm_enquiries')||'[]'); raw.unshift({id:`e-${Date.now()}`,...form,status:'New',created:new Date().toLocaleDateString()}); localStorage.setItem('jsm_enquiries',JSON.stringify(raw));}catch{} setSent(true); setTimeout(()=>{window.location.href=waLink(`Hello JSM Bags, I'm ${form.name}. I need ${form.requirement}. Quantity: ${form.quantity||'Not sure yet'}.`);},350);};
  return <><Navbar quoteCount={quoteCount} onQuote={onQuote}/><main className="page-shell"><PageHero kicker="Let's talk" title={<>The easiest next step is <span>a clear enquiry.</span></>} copy="Send the basics here, then take the conversation to WhatsApp when you are ready."/><div className="container contact-page"><div className="contact-layout"><div className="contact-info"><div className="contact-highlight"><div className="highlight-icon"><MessageCircle size={20}/></div><span>Fastest route</span><strong>WhatsApp the requirement.</strong><a href={waLink()} target="_blank" rel="noreferrer">Open WhatsApp <ArrowUpRight size={15}/></a></div><div className="contact-list"><ContactItem icon={<MapPin/>} title="Visit / locate" value={ADDRESS}/><ContactItem icon={<Phone/>} title="Call" value={PHONE}/><ContactItem icon={<Instagram/>} title="Instagram" value="@jsm_bags"/></div><div className="map-card"><div className="map-placeholder"><div className="map-grid"/><div className="map-pin"><MapPin size={22}/></div><span>Rajahmundry</span></div><a href="https://maps.google.com/?q=JSM+Bags+Rajahmundry" target="_blank" rel="noreferrer" className="map-link">Open in Google Maps <ExternalLink size={14}/></a></div></div><form className="contact-form-card" onSubmit={submit}>{sent && <div className="success-banner"><CheckCircle2 size={17}/> Saved as an enquiry. Opening WhatsApp…</div>}<div className="eyebrow">Quote request</div><h2>Tell us what you're making.</h2><div className="form-grid"><Field label="Name *"><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required placeholder="Your name"/></Field><Field label="Phone *"><input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} required placeholder="10-digit number"/></Field><Field label="Bag category"><select value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>{categories.filter(c=>c!=='All').map(c=><option key={c}>{c}</option>)}</select></Field><Field label="Quantity"><input value={form.quantity} onChange={e=>setForm({...form,quantity:e.target.value})} placeholder="e.g. 250 pcs"/></Field><Field label="Requirement *" wide><textarea value={form.requirement} onChange={e=>setForm({...form,requirement:e.target.value})} required rows="5" placeholder="What do you need printed / supplied? Include size, use case, artwork details…"/></Field></div><button className="btn primary large" type="submit"><Send size={17}/> Send enquiry + WhatsApp</button><span className="form-note">Your enquiry is kept locally in this demo admin panel. No database is connected.</span></form></div></div></main><Footer/></>;
}
function ContactItem({icon,title,value}){return <div className="contact-item"><span>{icon}</span><div><small>{title}</small><strong>{value}</strong></div></div>}
function Field({label,children,wide}){return <label className={wide?'wide':''}>{label}{children}</label>}
function PageHero({kicker,title,copy}){return <section className="page-hero"><div className="container"><div className="eyebrow">{kicker}</div><h1>{title}</h1><p>{copy}</p></div></section>}

function QuoteDrawer({open, onClose, items, onRemove, onClear}) {
  const [customer,setCustomer]=useState(''); const [phone,setPhone]=useState('');
  if(!open) return null;
  const message=`Hello JSM Bags, I'd like a quote for:%0A${items.map(p=>`• ${p.name} — ${p.moq}`).join('%0A')}%0A%0AName: ${customer||'Not provided'}%0APhone: ${phone||'Not provided'}`;
  return <AnimatePresence><motion.div className="drawer-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={onClose}><motion.aside className="quote-drawer" initial={{x:'100%'}} animate={{x:0}} exit={{x:'100%'}} transition={{duration:.45,ease:[.16,1,.3,1]}} onClick={e=>e.stopPropagation()}><div className="drawer-head"><div><span className="eyebrow">Your shortlist</span><h2>Quote bag <b>{items.length}</b></h2></div><button className="round-btn" onClick={onClose}><X size={18}/></button></div>{items.length===0?<div className="drawer-empty"><ShoppingBag size={28}/><strong>Your quote bag is empty.</strong><span>Save a few products here, then send them in one enquiry.</span><Link to="/products" onClick={onClose} className="btn primary">Browse catalogue <ArrowRight size={16}/></Link></div>:<><div className="drawer-items">{items.map(p=><div className="drawer-item" key={p.id}><AppImage src={p.image} alt={p.name}/><div><strong>{p.name}</strong><span>{p.category}</span><small>{p.moq} MOQ</small></div><button onClick={()=>onRemove(p.id)}><X size={14}/></button></div>)}</div><div className="drawer-form"><label>Name<input value={customer} onChange={e=>setCustomer(e.target.value)} placeholder="Your name"/></label><label>WhatsApp / phone<input value={phone} onChange={e=>setPhone(e.target.value)} placeholder={PHONE}/></label></div><div className="drawer-actions"><a className="btn primary large" href={`https://wa.me/${WA}?text=${encodeURIComponent(message)}`} target="_blank" rel="noreferrer"><MessageCircle size={17}/> Send quote on WhatsApp</a><button className="text-btn" onClick={onClear}>Clear quote bag</button></div></>}</motion.aside></motion.div></AnimatePresence>;
}

function AdminLogin({ onLogin }) {
  const [password,setPassword]=useState(''); const [show,setShow]=useState(false); const [error,setError]=useState('');
  const submit=e=>{e.preventDefault(); if(password==='jsm-demo'){localStorage.setItem('jsm_admin','1'); onLogin();}else setError('Use the demo password: jsm-demo');};
  return <div className="admin-login"><div className="admin-login-glow one"/><div className="admin-login-glow two"/><div className="admin-login-card"><Logo/><div className="eyebrow">Demo admin</div><h1>Manage the JSM storefront.</h1><p>Add products, update the portfolio, review enquiries and keep the site feeling current — without a database.</p><form onSubmit={submit}><label>Password<div className="password-field"><input type={show?'text':'password'} value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter demo password"/><button type="button" onClick={()=>setShow(v=>!v)}>{show?<Eye size={16}/>:<Eye size={16}/>}</button></div></label>{error&&<small className="error-text">{error}</small>}<button className="btn primary large" type="submit">Enter dashboard <ArrowRight size={17}/></button></form><div className="demo-hint"><span>Demo password</span><code>jsm-demo</code><button onClick={()=>{navigator.clipboard?.writeText('jsm-demo')}}><Copy size={13}/></button></div><Link to="/" className="back-site"><ChevronLeft size={15}/> Back to website</Link></div></div>;
}
function Admin({ products, setProducts, works, setWorks, gallery, setGallery, enquiries, setEnquiries, settings, setSettings }) {
  const [active,setActive]=useState('overview'); const [modal,setModal]=useState(null); const [logged,setLogged]=useState(()=>localStorage.getItem('jsm_admin')==='1');
  const logout=()=>{localStorage.removeItem('jsm_admin');setLogged(false)};
  if(!logged) return <AdminLogin onLogin={()=>setLogged(true)}/>;
  return <div className="admin-shell"><aside className="admin-side"><Logo/><div className="admin-status"><span className="live-dot"/> Demo mode <small>No DB</small></div><nav>{[['overview','Overview',LayoutDashboard],['products','Products',Package],['works','Portfolio',FolderOpen],['gallery','Gallery',ImageIcon],['enquiries','Enquiries',InboxIcon],['settings','Settings',Settings]].map(([id,label,Icon])=><button className={active===id?'active':''} onClick={()=>setActive(id)} key={id}><Icon size={16}/>{label}{id==='enquiries'&&enquiries.filter(e=>e.status==='New').length>0&&<b>{enquiries.filter(e=>e.status==='New').length}</b>}</button>)}</nav><div className="admin-side-foot"><a href={IG} target="_blank" rel="noreferrer"><Instagram size={15}/> Instagram</a><button onClick={logout}><LogOut size={15}/> Sign out</button></div></aside><section className="admin-main"><header className="admin-topbar"><div><span className="admin-breadcrumb">JSM Bags /</span><h1>{active[0].toUpperCase()+active.slice(1)}</h1></div><div className="admin-top-actions"><a href="/" target="_blank" className="admin-preview"><Eye size={15}/> Preview site</a><a href={waLink()} target="_blank" rel="noreferrer" className="admin-wa"><MessageCircle size={15}/> WhatsApp</a></div></header><div className="admin-content">{active==='overview'&&<AdminOverview products={products} works={works} enquiries={enquiries} onAddProduct={()=>setModal({type:'product',item:null})} onAddWork={()=>setModal({type:'work',item:null})} setActive={setActive}/>} {active==='products'&&<AdminProducts products={products} setProducts={setProducts} onAdd={()=>setModal({type:'product',item:null})} onEdit={item=>setModal({type:'product',item})}/>} {active==='works'&&<AdminWorks works={works} setWorks={setWorks} onAdd={()=>setModal({type:'work',item:null})} onEdit={item=>setModal({type:'work',item})}/>} {active==='gallery'&&<AdminGallery gallery={gallery} setGallery={setGallery}/>} {active==='enquiries'&&<AdminEnquiries enquiries={enquiries} setEnquiries={setEnquiries}/>} {active==='settings'&&<AdminSettings settings={settings} setSettings={setSettings}/>}</div></section>{modal&&<AdminModal data={modal} close={()=>setModal(null)} save={(item)=>{if(modal.type==='product') setProducts(prev=>prev.some(x=>x.id===item.id)?prev.map(x=>x.id===item.id?item:x):[item,...prev]); else setWorks(prev=>prev.some(x=>x.id===item.id)?prev.map(x=>x.id===item.id?item:x):[item,...prev]); setModal(null)}}/>}</div>;
}
function InboxIcon(props){return <Mail {...props}/>}
function AdminOverview({products,works,enquiries,onAddProduct,onAddWork,setActive}){const newLeads=enquiries.filter(e=>e.status==='New').length; return <><div className="admin-hero"><div><span className="eyebrow">Storefront control room</span><h2>Keep the website <span>alive.</span></h2><p>This demo uses local browser storage, so every change you make is immediately visible in the public site on this device.</p></div><div className="admin-hero-badge"><div><Zap size={17}/></div><strong>Live demo</strong><span>Content changes are instant.</span></div></div><div className="admin-stat-grid"><AdminStat icon={<Package/>} label="Products" value={products.length} tone="coral"/><AdminStat icon={<FolderOpen/>} label="Portfolio" value={works.length} tone="amber"/><AdminStat icon={<Mail/>} label="New enquiries" value={newLeads} tone="sage"/><AdminStat icon={<Eye/>} label="Quote-ready" value={products.filter(p=>p.featured).length} tone="blue"/></div><div className="admin-two"><div className="admin-panel"><PanelHead title="Quick actions"/><div className="admin-actions-grid"><button onClick={onAddProduct}><Plus size={18}/><strong>Add product</strong><span>New catalogue item</span></button><button onClick={onAddWork}><Plus size={18}/><strong>Add portfolio work</strong><span>Show recent work</span></button><button onClick={()=>setActive('enquiries')}><InboxIcon size={18}/><strong>Review enquiries</strong><span>{newLeads} need attention</span></button><button onClick={()=>setActive('gallery')}><ImageIcon size={18}/><strong>Update gallery</strong><span>Keep proof fresh</span></button></div></div><div className="admin-panel"><PanelHead title="Latest enquiries" action={<button onClick={()=>setActive('enquiries')} className="panel-link">View all <ArrowUpRight size={14}/></button>}/>{enquiries.slice(0,4).map(e=><div className="mini-enquiry" key={e.id}><div className={`status-dot ${slugify(e.status)}`}/><div><strong>{e.name}</strong><span>{e.requirement}</span></div><small>{e.status}</small></div>)}{enquiries.length===0&&<div className="admin-empty">No enquiries yet.</div>}</div></div><div className="admin-panel recent-panel"><PanelHead title="Featured products" action={<button onClick={()=>setActive('products')} className="panel-link">Manage <ArrowUpRight size={14}/></button>}/><div className="admin-product-strip">{products.filter(p=>p.featured).slice(0,4).map(p=><div key={p.id}><AppImage src={p.image} alt={p.name}/><span>{p.name}</span></div>)}</div></div></>}
function AdminStat({icon,label,value,tone}){return <div className={`admin-stat ${tone}`}><span>{icon}</span><small>{label}</small><strong>{value}</strong><div className="stat-line"/></div>}
function PanelHead({title,action}){return <div className="panel-head"><div><span className="panel-eyebrow">Content</span><h3>{title}</h3></div>{action}</div>}
function AdminProducts({products,setProducts,onAdd,onEdit}){const del=id=>setProducts(prev=>prev.filter(x=>x.id!==id)); return <><div className="admin-page-head"><div><span className="eyebrow">Catalogue manager</span><h2>Products that sell the <span>right story.</span></h2></div><button className="btn primary" onClick={onAdd}><Plus size={16}/> Add product</button></div><div className="admin-table"><div className="admin-table-head"><span>Product</span><span>Category</span><span>MOQ</span><span>Featured</span><span/></div>{products.map(p=><div className="admin-table-row" key={p.id}><div className="table-main"><AppImage src={p.image} alt={p.name}/><div><strong>{p.name}</strong><span>{p.material} · {p.size}</span></div></div><span>{p.category}</span><span>{p.moq}</span><span><span className={`table-chip ${p.featured?'on':'off'}`}>{p.featured?'Featured':'Standard'}</span></span><div className="row-buttons"><button onClick={()=>onEdit(p)}><Pencil size={14}/></button><button onClick={()=>del(p.id)}><Trash2 size={14}/></button></div></div>)}</div></>}
function AdminWorks({works,setWorks,onAdd,onEdit}){const del=id=>setWorks(prev=>prev.filter(x=>x.id!==id)); return <><div className="admin-page-head"><div><span className="eyebrow">Portfolio manager</span><h2>Show the work, <span>build the trust.</span></h2></div><button className="btn primary" onClick={onAdd}><Plus size={16}/> Add work</button></div><div className="admin-work-grid">{works.map(w=><article className="admin-work-card" key={w.id}><AppImage src={w.image} alt={w.title}/><div><span>{w.tag} · {w.meta}</span><h3>{w.title}</h3><p>{w.copy}</p><div className="row-buttons"><button onClick={()=>onEdit(w)}><Pencil size={14}/><span>Edit</span></button><button onClick={()=>del(w.id)}><Trash2 size={14}/><span>Delete</span></button></div></div></article>)}</div></>}
function AdminGallery({gallery,setGallery}){const addFiles=e=>Array.from(e.target.files||[]).forEach(file=>{const r=new FileReader();r.onload=()=>setGallery(prev=>[{id:`g-${Date.now()}-${Math.random()}`,image:r.result,caption:file.name.replace(/\.[^.]+$/,'')},...prev]);r.readAsDataURL(file)}); return <><div className="admin-page-head"><div><span className="eyebrow">Gallery manager</span><h2>Refresh the <span>visual proof.</span></h2></div><label className="btn primary upload-btn"><Upload size={16}/> Upload images<input type="file" accept="image/*" multiple onChange={addFiles}/></label></div><div className="gallery-admin-grid">{gallery.map(g=><div className="gallery-admin-card" key={g.id}><AppImage src={g.image} alt={g.caption}/><div><span>{g.caption}</span><button onClick={()=>setGallery(prev=>prev.filter(x=>x.id!==g.id))}><Trash2 size={14}/></button></div></div>)}</div><p className="demo-disclaimer">Uploaded images are stored as browser data in this demo. For production, connect this module to Cloudinary/S3/Supabase Storage.</p></>}
function AdminEnquiries({enquiries,setEnquiries}){const statuses=['New','Contacted','Quoted','Converted','Closed']; return <><div className="admin-page-head"><div><span className="eyebrow">Lead manager</span><h2>From enquiry to <span>conversation.</span></h2></div><a className="btn secondary" href={waLink()} target="_blank" rel="noreferrer"><MessageCircle size={16}/> Open WhatsApp</a></div><div className="enquiry-grid">{enquiries.map(e=><article className="enquiry-card" key={e.id}><div className="enquiry-head"><span className={`table-chip ${slugify(e.status)}`}>{e.status}</span><small>{e.created}</small></div><h3>{e.name}</h3><a href={`tel:${e.phone}`}>{e.phone}</a><p>{e.requirement}</p><div className="enquiry-foot"><select value={e.status} onChange={ev=>setEnquiries(prev=>prev.map(x=>x.id===e.id?{...x,status:ev.target.value}:x))}>{statuses.map(s=><option key={s}>{s}</option>)}</select><a href={waLink(`Hello ${e.name}, following up on your JSM Bags enquiry.`)} target="_blank" rel="noreferrer"><MessageCircle size={14}/> WhatsApp</a><button onClick={()=>setEnquiries(prev=>prev.filter(x=>x.id!==e.id))}><Trash2 size={14}/></button></div></article>)}{enquiries.length===0&&<div className="empty-state"><InboxIcon size={25}/><strong>No enquiries yet.</strong><span>New contact form submissions will appear here.</span></div>}</div></>}
function AdminSettings({settings,setSettings}){const [draft,setDraft]=useState(settings); const save=e=>{e.preventDefault();setSettings(draft);alert('Settings saved in this browser.');}; return <div className="settings-wrap"><div className="admin-page-head"><div><span className="eyebrow">Storefront settings</span><h2>Control the details that <span>stay consistent.</span></h2></div></div><form className="settings-form" onSubmit={save}><Field label="Business name"><input value={draft.businessName} onChange={e=>setDraft({...draft,businessName:e.target.value})}/></Field><Field label="Tagline"><input value={draft.tagline} onChange={e=>setDraft({...draft,tagline:e.target.value})}/></Field><Field label="Phone"><input value={draft.phone} onChange={e=>setDraft({...draft,phone:e.target.value})}/></Field><Field label="WhatsApp"><input value={draft.whatsapp} onChange={e=>setDraft({...draft,whatsapp:e.target.value})}/></Field><Field label="Instagram"><input value={draft.instagram} onChange={e=>setDraft({...draft,instagram:e.target.value})}/></Field><Field label="Address"><input value={draft.address} onChange={e=>setDraft({...draft,address:e.target.value})}/></Field><button className="btn primary large" type="submit"><Check size={17}/> Save settings</button></form><div className="settings-note"><Zap size={16}/><span>This is intentionally a no-database demo. The state layer is designed so the same UI can later be wired to a proper API.</span></div></div>}

function AdminModal({data,close,save}){const type=data.type; const seed=data.item || (type==='product'?{id:`p-${Date.now()}`,name:'',category:'Printed Bags',price:'Quote on request',moq:'50 pcs',material:'',size:'',image:remoteImages.tote,featured:false,accent:'coral',description:''}:{id:`w-${Date.now()}`,title:'',type:'Business branding',image:remoteImages.retail,copy:'',tag:'Printed',meta:'Custom / Bulk'}); const [form,setForm]=useState(seed); const update=(k,v)=>setForm({...form,[k]:v}); const file=e=>{const f=e.target.files?.[0]; if(!f)return; const r=new FileReader();r.onload=()=>update('image',r.result);r.readAsDataURL(f)}; return <div className="modal-backdrop" onClick={close}><motion.div className="admin-modal" initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} onClick={e=>e.stopPropagation()}><div className="modal-head"><div><span className="eyebrow">{type==='product'?'Product':'Portfolio work'}</span><h2>{data.item?'Edit':'Add'} {type==='product'?'product':'work'}</h2></div><button className="round-btn" onClick={close}><X size={18}/></button></div><form className="modal-grid" onSubmit={e=>{e.preventDefault();save(form)}}>{type==='product'?<><Field label="Name"><input value={form.name} onChange={e=>update('name',e.target.value)} required/></Field><Field label="Category"><select value={form.category} onChange={e=>update('category',e.target.value)}>{categories.filter(c=>c!=='All').map(c=><option key={c}>{c}</option>)}</select></Field><Field label="Price label"><input value={form.price} onChange={e=>update('price',e.target.value)}/></Field><Field label="MOQ"><input value={form.moq} onChange={e=>update('moq',e.target.value)}/></Field><Field label="Material"><input value={form.material} onChange={e=>update('material',e.target.value)}/></Field><Field label="Size"><input value={form.size} onChange={e=>update('size',e.target.value)}/></Field><Field label="Image URL"><input value={String(form.image).startsWith('data:')?'Uploaded image':form.image} onChange={e=>update('image',e.target.value)} /></Field><Field label="Upload image"><input type="file" accept="image/*" onChange={file}/></Field><Field label="Accent"><select value={form.accent} onChange={e=>update('accent',e.target.value)}><option>coral</option><option>sage</option><option>rose</option><option>amber</option><option>blue</option><option>olive</option></select></Field><label className="checkbox-label"><input type="checkbox" checked={form.featured} onChange={e=>update('featured',e.target.checked)}/> Featured product</label><Field label="Description" wide><textarea rows="4" value={form.description} onChange={e=>update('description',e.target.value)}/></Field></>:<><Field label="Title"><input value={form.title} onChange={e=>update('title',e.target.value)} required/></Field><Field label="Work type"><input value={form.type} onChange={e=>update('type',e.target.value)}/></Field><Field label="Tag"><input value={form.tag} onChange={e=>update('tag',e.target.value)}/></Field><Field label="Meta"><input value={form.meta} onChange={e=>update('meta',e.target.value)}/></Field><Field label="Image URL"><input value={String(form.image).startsWith('data:')?'Uploaded image':form.image} onChange={e=>update('image',e.target.value)}/></Field><Field label="Upload image"><input type="file" accept="image/*" onChange={file}/></Field><Field label="Description" wide><textarea rows="5" value={form.copy} onChange={e=>update('copy',e.target.value)}/></Field></>}<div className="modal-actions"><button type="button" className="btn secondary" onClick={close}>Cancel</button><button type="submit" className="btn primary"><Check size={16}/> Save changes</button></div></form></motion.div></div>}

function NotFound(){return <><Navbar quoteCount={useQuoteCount()} onQuote={()=>{}}/><div className="container not-found"><div className="eyebrow">404</div><h1>This page wandered off.</h1><Link className="btn primary" to="/">Back home <ArrowRight size={16}/></Link></div><Footer/></>}

function App(){
  const [products,setProducts] = useStored('jsm_products', productSeed);
  const [works,setWorks] = useStored('jsm_works', workSeed);
  const [gallery,setGallery] = useStored('jsm_gallery', gallerySeed);
  const [settings,setSettings] = useStored('jsm_settings', defaultSettings);
  const [enquiries,setEnquiries] = useStored('jsm_enquiries', []);
  const [quoteOpen,setQuoteOpen] = useState(false);
  const [quoteItems,setQuoteItems] = useState(() => {try{return JSON.parse(localStorage.getItem('jsm_quote')||'[]')}catch{return []}});
  useEffect(()=>{try{localStorage.setItem('jsm_quote',JSON.stringify(quoteItems)); window.dispatchEvent(new Event('jsm-quote'));}catch{}},[quoteItems]);
  const addToQuote=(product)=>setQuoteItems(prev=>prev.some(x=>x.id===product.id)?prev:[...prev,product]);
  const removeQuote=(id)=>setQuoteItems(prev=>prev.filter(x=>x.id!==id));
  const clearQuote=()=>setQuoteItems([]);
  const onQuote=()=>setQuoteOpen(true);
  return <>
    <ScrollToTop/>
    <Routes>
      <Route path="/" element={<Home products={products} works={works} addToQuote={addToQuote} onQuote={onQuote}/>}/>
      <Route path="/products" element={<Products products={products} addToQuote={addToQuote} quoteCount={quoteItems.length} onQuote={onQuote}/>}/>
      <Route path="/products/:id" element={<ProductDetail products={products} addToQuote={addToQuote} quoteCount={quoteItems.length} onQuote={onQuote}/>}/>
      <Route path="/work" element={<WorkPage works={works} gallery={gallery} quoteCount={quoteItems.length} onQuote={onQuote}/>}/>
      <Route path="/custom-printing" element={<CustomPrinting quoteCount={quoteItems.length} onQuote={onQuote}/>}/>
      <Route path="/contact" element={<Contact quoteCount={quoteItems.length} onQuote={onQuote}/>}/>
      <Route path="/admin/*" element={<Admin products={products} setProducts={setProducts} works={works} setWorks={setWorks} gallery={gallery} setGallery={setGallery} enquiries={enquiries} setEnquiries={setEnquiries} settings={settings} setSettings={setSettings}/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
    <QuoteDrawer open={quoteOpen} onClose={()=>setQuoteOpen(false)} items={quoteItems} onRemove={removeQuote} onClear={clearQuote}/>
  </>;
}

createRoot(document.getElementById('root')).render(<BrowserRouter><App/></BrowserRouter>);
