import React, { useEffect, useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';

const WA = 'https://wa.me/639977491555?text=Hi%20JESS%20Salon%20at%20Home!%20I%27d%20like%20to%20inquire%20about%20your%20hair%20services%20and%20book%20an%20appointment.';
const FB = 'https://www.facebook.com/profile.php?id=61580949253081';
const MSG = 'https://m.me/61580949253081';
const PHONE = 'tel:+639977491555';
const localImages = import.meta.glob('../imgs/*.png', { eager: true, query: '?url', import: 'default' });
const img = (name) => localImages[`../imgs/${name}.png`];
const logo = new URL('../imgs/logo.jpeg', import.meta.url).href;
const gcashQrPlaceholder = new URL('../imgs/gcash-qr-placeholder.svg', import.meta.url).href;

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
      <Link to="/contact#booking" className="nav-book">Book a visit <Arrow diagonal /></Link>
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

function BookingLink({ href = '/contact#booking', children, className = 'button button-gold', ...props }) {
  const isExternal = /^https?:\/\//.test(href);
  if (isExternal) {
    return <a href={href} className={className} target="_blank" rel="noreferrer" {...props}>{children}<Arrow diagonal /></a>;
  }
  return <Link to={href} className={className} {...props}>{children}<Arrow diagonal /></Link>;
}

function PageIntro({ eyebrow, title, text }) {
  return <section className="page-intro"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1>{text && <p className="intro-copy">{text}</p>}</section>;
}

const haircutPricing = [
  { label: 'Haircut rate', value: '₱999' },
  { label: 'Additional person', value: '+₱500' },
];

const priceTables = {
  'Basic Hair Color': [
    ['Roots Regrowth', '₱1,500'],
    ['Short', '₱2,000'],
    ['Medium', '₱2,500'],
    ['Long', '₱3,000'],
    ['Extra Long', '₱3,500'],
    ['Super Long', '₱4,000'],
  ],
  'Fashion Color': [
    ['Roots Regrowth', '₱4,999'],
    ['Short', '₱5,500'],
    ['Medium', '₱6,000'],
    ['Long', '₱6,500'],
    ['Extra Long', '₱7,000'],
    ['Super Long', '₱7,500'],
  ],
  'Deep Treatment': [
    ['Roots Regrowth', '₱1,500'],
    ['Short', '₱2,000'],
    ['Medium', '₱2,500'],
    ['Long', '₱3,000'],
    ['Extra Long', '₱3,500'],
    ['Super Long', '₱4,000'],
  ],
  'Hair Rebonding': [
    ['Roots Regrowth (1–3 inches)', '₱2,500'],
    ['Short', '₱2,800'],
    ['Medium', '₱3,100'],
    ['Long', '₱3,500'],
    ['Extra Long', '₱4,000'],
    ['Super Long', '₱5,000'],
  ],
  'Hair Perming': [
    ['Roots Regrowth', '₱2,000'],
    ['Short', '₱2,500'],
    ['Medium', '₱3,000'],
    ['Long', '₱3,500'],
    ['Extra Long', '₱4,000'],
    ['Super Long', '₱5,000'],
  ],
  'Rebond + Color + Keratin': [
    ['Roots Regrowth', '₱3,000'],
    ['Short', '₱3,500'],
    ['Medium', '₱4,000'],
    ['Long', '₱4,500'],
    ['Extra Long', '₱5,000'],
    ['Super Long', '₱6,000'],
  ],
};

const serviceCategories = [
  {
    title: 'Haircuts',
    groups: [
      { heading: 'For Men', services: ['Classic Haircut', 'Modern Haircut'] },
      { heading: 'For Women', services: ['Pixie Cut', 'Bob Cut', 'Bixie Cut', 'Wolf Cut', 'Layered Cut', 'Curtain Bangs'] },
      {
        heading: 'Additional haircut options',
        services: ['Haircut for Busy Moms', 'Kids\' Haircut', 'Haircut for Busy Professionals', 'Haircut for Senior Citizens', 'Haircut for Basketball Players', 'Haircut for Persons with Disabilities (PWD)', 'Haircut for Persons with Special Needs'],
      },
    ],
    pricing: haircutPricing,
  },
  {
    title: 'Toupee Haircut & Hairstyling',
    groups: [{ heading: 'Services', services: ['Haircut and Hairstyling for Toupee Hair', 'Hair Blending'] }],
    pricing: null,
  },
  {
    title: 'Hair Coloring',
    groups: [{ heading: 'Services', services: ['Basic Hair Color', 'Fashion Color', 'Special Hair Color', 'Hair Color Correction'] }],
    pricing: null,
  },
  {
    title: 'Hair Treatments',
    groups: [{ heading: 'Services', services: ['Deep Treatment', 'Hot Oil Treatment', 'Hair Mask Treatment', 'Keratin Treatment', 'Brazilian Botox Treatment', 'Collagen Treatment', 'Brazilian Hair Treatment'] }],
    pricing: null,
  },
  { title: 'Hair Straightening', groups: [{ heading: 'Services', services: ['Hair Straightening'] }], pricing: null },
  { title: 'Hair Rebonding', groups: [{ heading: 'Services', services: ['Hair Rebonding'] }], pricing: null },
  { title: 'Hair Perming', groups: [{ heading: 'Services', services: ['Hair Perming'] }], pricing: null },
  { title: 'Rebond Promo Package', groups: [{ heading: 'Services', services: ['Rebond + Color + Keratin'] }], pricing: null },
  {
    title: 'Massage Services',
    groups: [{ heading: 'Services', services: ['Full Body Massage', 'Swedish Massage', 'Back Massage', 'Hand and Foot Massage', 'Hand and Foot Reflexology'] }],
    pricing: null,
  },
  { title: 'Modern Ventosa', groups: [{ heading: 'Services', services: ['Modern Ventosa'] }], pricing: null },
];

function PriceTable({ rows }) {
  return <div className="price-table-wrap"><table className="price-table"><thead><tr><th>Hair Length</th><th>Price</th></tr></thead><tbody>{rows.map(([length, price]) => <tr key={length}><td>{length}</td><td>{price}</td></tr>)}</tbody></table></div>;
}

function renderServiceInfo(name) {
  if (name === 'Hair Color Correction') {
    return <div className="service-price-detail">
      <span>Starting range: ₱1,999–₱7,300</span>
      <small>Price depends on hair length and complexity. Consultation may be required for complicated corrections.</small>
    </div>;
  }

  if (name === 'Basic Hair Color' || name === 'Fashion Color' || name === 'Deep Treatment' || name === 'Hair Rebonding' || name === 'Hair Perming' || name === 'Rebond + Color + Keratin') {
    return <><div className="service-price-detail"><span>Price</span></div>{priceTables[name] && <PriceTable rows={priceTables[name]} />}</>;
  }

  if (name === 'Haircut rate') {
    return null;
  }

  return <span className="service-price is-muted">Price to be confirmed</span>;
}

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
  const [openCategory, setOpenCategory] = useState('');

  const toggleCategory = (title) => {
    setOpenCategory((current) => (current === title ? '' : title));
  };

  return <main className="page-main"><PageIntro eyebrow="A MENU OF POSSIBILITIES" title={<>Services, <em>made personal.</em></>} text="From a fresh cut to a change in color or texture, tell us what you’re considering. We’ll help you inquire about the right service for your hair." />
    <section className="services-menu section-shell"><div className="menu-aside"><span className="eyebrow">THE JESS MENU</span><p>Select a category below to explore the full list of services and pricing information.</p></div>
      <div className="service-list">
        {serviceCategories.map((category) => {
          const isOpen = openCategory === category.title;
          return <article className={`service-category ${isOpen ? 'is-open' : ''}`} key={category.title}>
            <button type="button" className="service-category-header" onClick={() => toggleCategory(category.title)} aria-expanded={isOpen}>
              <h3>{category.title}</h3>
              <span className="accordion-icon" aria-hidden="true">+</span>
            </button>
            <div className={`accordion-panel ${isOpen ? 'is-open' : ''}`}>
              <div className="accordion-inner">
                {category.groups.map((group) => (
                  <div className="category-group" key={group.heading}>
                    <h4>{group.heading}</h4>
                    <ul className="service-item-list">
                      {group.services.map((serviceName) => (
                        <li key={serviceName} className="service-item-row">
                          <span>{serviceName}</span>
                          {serviceName === 'Basic Hair Color' || serviceName === 'Fashion Color' || serviceName === 'Deep Treatment' || serviceName === 'Hair Rebonding' || serviceName === 'Hair Perming' || serviceName === 'Rebond + Color + Keratin' || serviceName === 'Hair Color Correction'
                            ? renderServiceInfo(serviceName)
                            : serviceName === 'Haircut for Busy Moms' || serviceName === 'Kids\' Haircut' || serviceName === 'Haircut for Busy Professionals' || serviceName === 'Haircut for Senior Citizens' || serviceName === 'Haircut for Basketball Players' || serviceName === 'Haircut for Persons with Disabilities (PWD)' || serviceName === 'Haircut for Persons with Special Needs' || serviceName === 'Classic Haircut' || serviceName === 'Modern Haircut' || serviceName === 'Pixie Cut' || serviceName === 'Bob Cut' || serviceName === 'Bixie Cut' || serviceName === 'Wolf Cut' || serviceName === 'Layered Cut' || serviceName === 'Curtain Bangs' || serviceName === 'Haircut and Hairstyling for Toupee Hair' || serviceName === 'Hair Blending' || serviceName === 'Special Hair Color' || serviceName === 'Hot Oil Treatment' || serviceName === 'Hair Mask Treatment' || serviceName === 'Keratin Treatment' || serviceName === 'Brazilian Botox Treatment' || serviceName === 'Collagen Treatment' || serviceName === 'Brazilian Hair Treatment' || serviceName === 'Hair Straightening' || serviceName === 'Full Body Massage' || serviceName === 'Swedish Massage' || serviceName === 'Back Massage' || serviceName === 'Hand and Foot Massage' || serviceName === 'Hand and Foot Reflexology' || serviceName === 'Modern Ventosa'
                              ? <span className="service-price is-muted">Price to be confirmed</span>
                              : null}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                {category.title === 'Haircuts' && (
                  <div className="category-group">
                    <h4>Haircut pricing</h4>
                    <ul className="service-price-list">
                      {haircutPricing.map((item) => (
                        <li key={item.label}><span>{item.label}</span><strong>{item.value}</strong></li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </article>;
        })}
      </div>
    </section>
    <section className="service-note section-shell"><img src={img('stylist-at-work')} alt="Stylist applying color during an at-home appointment" loading="lazy" /><div><p className="eyebrow">BEFORE WE BEGIN</p><h2>Let’s talk about<br/><em>your hair first.</em></h2><p>Share your current hair length, color history and a reference photo when you inquire. We can discuss the service details and pricing before you book.</p><BookingLink href={MSG}>Message JESS</BookingLink></div></section><BookingBand />
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
      <div id="booking" className="booking-panel">
        <p className="eyebrow">BOOKING & PAYMENT</p>
        <h3>Reservation instructions</h3>
        <p>To reserve your appointment, pay the applicable reservation fee through GCash. After payment, send your booking details and payment screenshot through Facebook Messenger. Your appointment will be confirmed manually after the payment has been verified.</p>
        <div className="booking-fees">
          <p><strong>Haircut bookings:</strong> ₱500 reservation fee</p>
          <p><strong>Major service bookings:</strong> ₱1,500 reservation fee</p>
        </div>
        <figure className="payment-placeholder">
          <img src={gcashQrPlaceholder} alt="Temporary GCash QR code placeholder for reservation payment. Replace with the official QR code image when provided by the owner." />
          <figcaption>GCash Reservation Payment</figcaption>
        </figure>
        <div className="booking-details">
          <h4>Send these details through Messenger</h4>
          <ul>
            <li>Name</li>
            <li>Contact Number</li>
            <li>Exact Service Location</li>
            <li>Service Requested</li>
            <li>Preferred Date</li>
            <li>Preferred Time</li>
            <li>Payment Screenshot</li>
          </ul>
        </div>
        <p className="reservation-policy">The reservation fee is deducted from the final service bill. Reservations are non-refundable for cancellations made within 24 hours of the appointment to protect the reserved time slot.</p>
      </div>
      <a className="facebook-link" href={FB} target="_blank" rel="noreferrer">Visit JESS on Facebook <Arrow diagonal /></a>
    </div></section>
  </main>;
}

export default function App() {
  return <><ScrollToTop/><Header/><Routes><Route path="/" element={<Home/>}/><Route path="/services" element={<Services/>}/><Route path="/inspiration" element={<Inspiration/>}/><Route path="/contact" element={<Contact/>}/><Route path="*" element={<Home/>}/></Routes><Footer/><Link className="mobile-booking" to="/contact#booking">Book a visit <Arrow diagonal /></Link></>;
}
