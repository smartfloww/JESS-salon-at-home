import React, { useEffect, useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';

const WA = 'https://wa.me/639977491555?text=Hi%20JESS%20Salon%20at%20Home!%20I%27d%20like%20to%20inquire%20about%20your%20hair%20services%20and%20book%20an%20appointment.';
const FB = 'https://www.facebook.com/profile.php?id=61580949253081';
const MSG = 'https://m.me/61580949253081';
const PHONE = 'tel:+639977491555';
const localImages = import.meta.glob('../imgs/*.png', { eager: true, query: '?url', import: 'default' });
const img = (name) => localImages[`../imgs/${name}.png`];
const logo = new URL('../imgs/logo.jpeg', import.meta.url).href;

const navItems = [
  ['Home', '/'],
  ['Services', '/services'],
  ['Hair inspiration', '/inspiration'],
  ['Contact', '/contact'],
];

function Arrow({ diagonal = false }) { return <span aria-hidden="true">{diagonal ? '↗' : '→'}</span>; }

function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => setOpen(false), [location.pathname]);
  return <header className="site-header">
    <Link className="brand" to="/" aria-label="JESS Salon at Home home"><img className="brand-logo" src={logo} alt="" /><span className="brand-wordmark"><span className="brand-name">JESS<span className="brand-period">.</span></span><span className="brand-caption">SALON AT HOME</span></span></Link>
    <button className="menu-toggle" aria-expanded={open} aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} onClick={() => setOpen(!open)}><span/><span/></button>
    <nav className={open ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
      {navItems.map(([label, path]) => <NavLink key={path} to={path} end={path === '/'} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>{label}</NavLink>)}
      <a href={MSG} className="nav-book" target="_blank" rel="noreferrer">Book a visit <Arrow diagonal /></a>
    </nav>
  </header>;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Footer() {
  return <footer className="site-footer">
    <div className="footer-main">
      <div><Link className="brand footer-brand" to="/" aria-label="JESS Salon at Home home"><img className="brand-logo" src={logo} alt="" /><span className="brand-wordmark"><span className="brand-name">JESS<span className="brand-period">.</span></span><span className="brand-caption">SALON AT HOME</span></span></Link><p className="footer-note">Good hair, in the comfort<br/>of your own space.</p></div>
      <div className="footer-column"><span className="eyebrow">EXPLORE</span>{navItems.map(([label, path]) => <Link key={path} to={path}>{label}</Link>)}</div>
      <div className="footer-column"><span className="eyebrow">GET IN TOUCH</span><a href={PHONE}>+63 997 749 1555</a><a href={MSG} target="_blank" rel="noreferrer">Facebook Messenger ↗</a><a href={WA} target="_blank" rel="noreferrer">WhatsApp ↗</a></div>
      <div className="footer-column"><span className="eyebrow">SERVICE AREA</span><p>Metro Manila, Philippines</p><p>Daily · 8 AM–10 PM</p></div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} JESS Salon at Home</span><span>Made for the way you live.</span></div>
  </footer>;
}

function BookingLink({ href = MSG, children, className = 'button button-gold', ...props }) {
  return <a href={href} className={className} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined} {...props}>{children}<Arrow diagonal /></a>;
}

function PageIntro({ eyebrow, title, text }) {
  return <section className="page-intro"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1>{text && <p className="intro-copy">{text}</p>}</section>;
}

const serviceCards = [
  { n: '01', title: 'Haircuts', copy: 'A considered cut for your length, texture and everyday style.', tags: 'MEN & WOMEN' },
  { n: '02', title: 'Basic hair color', copy: 'Single-process color without bleach. Share your starting shade and the color you have in mind when you inquire.', tags: 'WITHOUT BLEACH' },
  { n: '03', title: 'Fashion color', copy: 'Highlights, balayage, ombré and peek-a-boo color. Let’s talk through your inspiration and hair history first.', tags: 'HIGHLIGHTS · BALAYAGE · MORE' },
  { n: '04', title: 'Brazilian hair treatments', copy: 'A salon service brought to your home. Ask about suitability and service details for your hair.', tags: 'HAIR TREATMENT' },
  { n: '05', title: 'Straightening', copy: 'Choose from rebond, semi-rebond or protein straight bond. Service details depend on your hair and desired look.', tags: 'REBOND · SEMI-REBOND · PROTEIN STRAIGHT BOND' },
  { n: '06', title: 'Perms', copy: 'A perm service to explore a new shape and texture. Inquire to discuss your hair and the look you want.', tags: 'TEXTURE & SHAPE' },
];
const galleryItems = [
  { file: 'balayage-color', label: 'Soft dimension', kind: 'Balayage inspiration', className: 'gallery-tall' },
  { file: 'sleek-straight', label: 'Sleek lengths', kind: 'Straight style', className: '' },
  { file: 'defined-curls', label: 'Defined movement', kind: 'Curly style', className: '' },
  { file: 'mens-haircut', label: 'Modern texture', kind: 'Men’s haircut inspiration', className: 'gallery-tall' },
  { file: 'hair-inspiration', label: 'Long layers', kind: 'Cut & style inspiration', className: '' },
  { file: 'hero-hair', label: 'Glossy waves', kind: 'Long hair inspiration', className: '' },
];

function Home() {
  return <>
    <main>
      <section className="hero">
        <div className="hero-copy"><p className="eyebrow gold-eyebrow">SALON QUALITY, AT YOUR DOORSTEP</p><h1>Your Hair.<br/>Your Home.<br/><em>Your Style.</em></h1><p className="hero-description">Thoughtful hair services for men and women, brought to you across Metro Manila.</p><BookingLink>Book your appointment</BookingLink><div className="hero-footnote"><span>MEN & WOMEN</span><span>METRO MANILA</span></div></div>
        <div className="hero-image-wrap"><img src={img('hero-hair')} alt="Long, glossy brunette waves" className="hero-image" fetchPriority="high" /><span className="image-index">01 / JESS AT HOME</span></div>
        <div className="hero-side-label">YOUR SPACE, YOUR PACE</div>
      </section>
      <section className="welcome section-shell">
        <div className="section-heading"><p className="eyebrow">A LITTLE MORE YOU</p><h2>Good hair.<br/><em>No salon trip.</em></h2></div>
        <div className="welcome-copy"><p>Make time for the style you want, without leaving the place you feel most at ease. JESS brings hair services to your home, with a personal conversation before every appointment.</p><Link to="/services" className="text-link">Explore our services <Arrow /></Link></div>
      </section>
      <section className="featured-services">
        <div className="section-shell"><div className="section-topline"><div><p className="eyebrow">THE SERVICES</p><h2>A good place to start.</h2></div><Link to="/services" className="text-link">All services <Arrow /></Link></div>
          <div className="service-feature-grid">
            <Link to="/services" className="feature-card feature-color"><img src={img('balayage-color')} alt="Brunette hair with warm dimensional color" loading="lazy" /><span className="feature-number">01 — COLOR</span><span className="feature-title">Color & highlights <Arrow diagonal /></span></Link>
            <Link to="/services" className="feature-card feature-cuts"><img src={img('mens-haircut')} alt="Modern men's haircut inspiration" loading="lazy" /><span className="feature-number">02 — CUT</span><span className="feature-title">Cuts for all <Arrow diagonal /></span></Link>
            <Link to="/services" className="feature-card feature-straight"><img src={img('sleek-straight')} alt="Long, sleek straight hair" loading="lazy" /><span className="feature-number">03 — TREAT</span><span className="feature-title">Straightening <Arrow diagonal /></span></Link>
          </div>
        </div>
      </section>
      <section className="at-home section-shell">
        <div className="at-home-image"><img src={img('home-service')} alt="A stylist working with a client at home" loading="lazy" /><span className="image-index">THE JESS EXPERIENCE</span></div>
        <div className="at-home-copy"><p className="eyebrow">YOUR HOME, YOUR APPOINTMENT</p><h2>Care that comes<br/><em>to you.</em></h2><p>Enjoy a hair appointment in familiar surroundings. Choose a service, share your inspiration and ask us anything before confirming a date.</p><ul className="benefit-list"><li><span>01</span><div><b>Stay in your space</b><small>Have your appointment at home, on your schedule.</small></div></li><li><span>02</span><div><b>Talk it through</b><small>Message ahead to discuss the service you have in mind.</small></div></li><li><span>03</span><div><b>For men & women</b><small>A range of hair services for different styles.</small></div></li></ul><BookingLink className="text-link">Ask about an appointment</BookingLink></div>
      </section>
      <section className="inspiration-strip"><div className="section-shell inspiration-inner"><div><p className="eyebrow">SAVE A LITTLE INSPIRATION</p><h2>A look that feels<br/><em>like you.</em></h2><p>Explore cuts, color and texture to find a direction for your next appointment.</p><Link to="/inspiration" className="button button-outline-light">See the gallery <Arrow diagonal /></Link></div><div className="strip-images"><img src={img('defined-curls')} alt="Defined brunette curls inspiration" loading="lazy" /><img src={img('hair-inspiration')} alt="Long layered brunette hair inspiration" loading="lazy" /></div></div></section>
      <BookingBand />
    </main>
  </>;
}

function BookingBand() {
  return <section className="booking-band"><p className="eyebrow">A GOOD HAIR DAY, AT HOME</p><h2>Let’s find a time<br/>that works for you.</h2><BookingLink>Start a conversation</BookingLink></section>;
}

function Services() {
  return <main className="page-main"><PageIntro eyebrow="A MENU OF POSSIBILITIES" title={<>Services, <em>made personal.</em></>} text="From a fresh cut to a change in color or texture, tell us what you’re considering. We’ll help you inquire about the right service for your hair." />
    <section className="services-menu section-shell"><div className="menu-aside"><span className="eyebrow">THE JESS MENU</span><p>Service pricing varies. Message us with your preferred service and hair details to inquire.</p><BookingLink className="text-link">Ask about pricing</BookingLink></div><div className="service-list">{serviceCards.map((service) => <article className="service-row" key={service.n}><span className="service-num">{service.n}</span><div className="service-info"><p className="eyebrow">{service.tags}</p><h2>{service.title}</h2><p>{service.copy}</p><BookingLink className="service-action">Inquire about this service <Arrow diagonal /></BookingLink></div></article>)}</div></section>
    <section className="service-note section-shell"><img src={img('stylist-at-work')} alt="Stylist applying color during an at-home appointment" loading="lazy" /><div><p className="eyebrow">BEFORE WE BEGIN</p><h2>Let’s talk about<br/><em>your hair first.</em></h2><p>Share your current hair length, color history and a reference photo when you inquire. We can discuss the service details and pricing before you book.</p><BookingLink>Message JESS</BookingLink></div></section><BookingBand />
  </main>;
}

function Inspiration() {
  return <main className="page-main"><PageIntro eyebrow="THE LOOKBOOK" title={<>A little hair <em>inspiration.</em></>} text="A collection of style references to help you start the conversation. These images are inspirational, not examples of verified JESS client results." />
    <section className="gallery section-shell">{galleryItems.map((item, i) => <figure className={`gallery-item ${item.className}`} key={item.file}><div className="gallery-photo"><img src={img(item.file)} alt={`${item.kind}: ${item.label}`} loading="lazy" /><span className="gallery-count">0{i + 1}</span></div><figcaption><span>{item.label}</span><small>{item.kind}</small></figcaption></figure>)}</section>
    <p className="gallery-disclaimer">Style references shown for inspiration only. They are not verified examples of salon client results.</p><BookingBand />
  </main>;
}

function Contact() {
  return <main className="page-main"><PageIntro eyebrow="LET’S MAKE A PLAN" title={<>Your next visit, <em>at home.</em></>} text="Tell us the service you’re interested in and where you’re based in Metro Manila. We’ll help you explore appointment availability." />
    <section className="contact-layout section-shell"><div className="contact-lead"><p className="eyebrow">BOOKING, MADE SIMPLE</p><h2>Choose how<br/>to say <em>hello.</em></h2><p>Send a message with the service you have in mind. For color and chemical services, include your hair length, current color and any inspiration photos.</p><img src={img('home-service')} alt="A stylist working with a client at home" loading="lazy" /></div><div className="contact-options">
      <a className="contact-option" href={MSG} target="_blank" rel="noreferrer"><span className="contact-number">01</span><span><small>QUICK MESSAGE</small><b>Facebook Messenger</b><em>JESS Salon at Home</em></span><span className="contact-arrow">↗</span></a>
      <a className="contact-option" href={PHONE}><span className="contact-number">02</span><span><small>PREFER A CALL?</small><b>Call JESS</b><em>+63 997 749 1555</em></span><span className="contact-arrow">↗</span></a>
      <div className="contact-facts"><div><span className="eyebrow">SERVICE AREA</span><b>Metro Manila, Philippines</b></div><div><span className="eyebrow">OPENING HOURS</span><b>Daily · 8 AM–10 PM</b></div><p>Late-evening appointments should be booked in advance for a specific date. Please message us to check availability.</p></div>
      <a className="facebook-link" href={FB} target="_blank" rel="noreferrer">Visit JESS on Facebook <Arrow diagonal /></a>
    </div></section>
  </main>;
}

export default function App() {
  return <><ScrollToTop/><Header/><Routes><Route path="/" element={<Home/>}/><Route path="/services" element={<Services/>}/><Route path="/inspiration" element={<Inspiration/>}/><Route path="/contact" element={<Contact/>}/><Route path="*" element={<Home/>}/></Routes><Footer/><a className="mobile-booking" href={MSG} target="_blank" rel="noreferrer">Book via Messenger <Arrow diagonal /></a></>;
}
