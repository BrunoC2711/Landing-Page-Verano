'use client'

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"
import { useRef } from "react";

const css = `
:root{
  --sand:#efe8df; --sand2:#f6f1ea; --ink:#4a2e2e; --accent:#7f5151;
}
*{box-sizing:border-box}
html,body,#root{height:100%}
body{margin:0; color:var(--ink); background:var(--sand)}
.container{max-width:1120px; margin:0 auto; padding:0 20px}

/* NAV */
.nav{position:sticky; top:0; z-index:10; backdrop-filter:saturate(120%) blur(6px); background:rgba(255,255,255,.7); border-bottom:1px solid rgba(0,0,0,.06)}
.nav .inner{display:flex; align-items:center; justify-content:space-between; height:68px}
.brand{display:flex; align-items:center; gap:10px; font-weight:600; letter-spacing:.35em; color:#6b3f3f}
.links{display:none; gap:20px; opacity:.85}
@media (min-width: 900px){ .links{display:flex} }
.links a{color:inherit; text-decoration:none}
.links a:hover{opacity:1}

/* HERO */
.hero{position:relative; min-height:45svh; display:grid; align-items:end; background:
  linear-gradient(to bottom, rgba(255,255,255,.2), var(--sand) 80%);}
.hero-wrap{padding:72px 10px 24px}
.hero h1{font-family: ui-serif, Georgia, serif; font-size:44px; line-height:1.12; margin:10px 0 6px; color:#6b3f3f}
.hero p{max-width:740px; opacity:.85; margin:0}
.hero-actions{display:flex; gap:10px; margin:16px 0 6px; flex-wrap:wrap}

/* SEÇÕES */
.section{padding:54px 0}
.section h2{font-family: ui-serif, Georgia, serif; font-size:34px; margin:0 0 8px}
.section .lead{opacity:.9; max-width:760px; margin:0 0 20px}

/* CAROUSEL */
.carousel-section {
  position: relative;
  padding: 40px 0;
}

.carousel-wrapper {
  position: relative;
  padding: 0 50px;
}

@media (max-width: 640px) {
  .carousel-wrapper {
    padding: 0 40px;
  }
}

@media (max-width: 480px) {
  .carousel-wrapper {
    padding: 0 35px;
  }
}

/* BENEFITS */
.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
  margin-top: 32px;
}

.benefit-card {
  text-align: center;
  padding: 24px;
  border-radius: 12px;
  background: rgba(255,255,255,.5);
  border: 1px solid rgba(0,0,0,.05);
  transition: all .3s ease;
  animation: fadeup .6s ease forwards;
  opacity: 0;
}

.benefit-card:nth-child(1) { animation-delay: 0s; }
.benefit-card:nth-child(2) { animation-delay: .08s; }
.benefit-card:nth-child(3) { animation-delay: .16s; }
.benefit-card:nth-child(4) { animation-delay: .24s; }

.benefit-card:hover {
  transform: translateY(-8px);
  background: rgba(255,255,255,.8);
  box-shadow: 0 12px 24px rgba(0,0,0,.08);
}

.benefit-icon {
  font-size: 40px;
  margin-bottom: 12px;
}

.benefit-card h3 {
  font-size: 18px;
  font-weight: 600;
  margin: 12px 0 8px;
  color: #6b3f3f;
}

.benefit-card p {
  font-size: 14px;
  opacity: .8;
  margin: 0;
}

/* COUNTER */
.stats-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 32px;
  margin: 40px 0;
  text-align: center;
}

.stat-item {
  animation: fadeup .6s ease forwards;
  opacity: 0;
}

.stat-item:nth-child(1) { animation-delay: 0s; }
.stat-item:nth-child(2) { animation-delay: .08s; }
.stat-item:nth-child(3) { animation-delay: .16s; }

.stat-number {
  font-family: ui-serif, Georgia, serif;
  font-size: 48px;
  font-weight: 700;
  color: #6b3f3f;
  margin: 0;
}

.stat-label {
  font-size: 14px;
  opacity: .8;
  margin-top: 8px;
  text-transform: uppercase;
  letter-spacing: .1em;
}

/* WHY US */
.why-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
  margin-top: 32px;
}

.why-item {
  padding: 28px;
  background: linear-gradient(135deg, rgba(255,255,255,.8), rgba(255,255,255,.5));
  border-radius: 12px;
  border: 1px solid rgba(0,0,0,.05);
  animation: fadeup .6s ease forwards;
  opacity: 0;
}

.why-item:nth-child(1) { animation-delay: 0s; }
.why-item:nth-child(2) { animation-delay: .08s; }
.why-item:nth-child(3) { animation-delay: .16s; }

.why-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0,0,0,.08);
}

.why-number {
  font-family: ui-serif, Georgia, serif;
  font-size: 36px;
  font-weight: 700;
  color: #7f5151;
  margin-bottom: 12px;
}

.why-item h3 {
  margin: 0 0 8px;
  font-size: 18px;
  color: #6b3f3f;
}

.why-item p {
  margin: 0;
  opacity: .85;
  font-size: 14px;
}

/* FAQq */
.table{display:grid; grid-template-columns:repeat(4, 1fr); gap:10px; font-size:14px; opacity:.9}
.table .head{font-weight:600}

/* FOOTER */
.footer{padding:28px 0 48px; border-top:1px solid rgba(0,0,0,.08); background:rgba(255,255,255,.6); backdrop-filter:blur(6px)}
.footer-row{display:flex; align-items:center; justify-content:space-between; gap:16px; flex-wrap:wrap}

/* ANIMATIONS */
.fadeup{opacity:0; transform:translateY(12px); animation:fadeup .55s ease forwards}
.fadeup.d2{animation-delay:.08s} .fadeup.d3{animation-delay:.16s}

@keyframes fadeup{to{opacity:1; transform:none}}

@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(127, 81, 81, .7); }
  50% { box-shadow: 0 0 0 8px rgba(127, 81, 81, 0); }
}

.pulse {
  animation: pulse 2s infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}

.float {
  animation: float 3s ease-in-out infinite;
}
`;

const produtos = [
  { id: 4, nome: "Verano", img: "/imgs/0.jpeg" },
  { id: 5, nome: "Verano", img: "/imgs/1.jpeg" },
  { id: 6, nome: "Verano", img: "/imgs/2.jpeg" },
  { id: 7, nome: "Verano", img: "/imgs/3.jpeg" },
  { id: 8, nome: "Verano", img: "/imgs/4.jpeg" },
  { id: 9, nome: "Verano", img: "/imgs/5.jpeg" },
  { id: 10, nome: "Verano", img: "/imgs/6.jpeg" },
  { id: 11, nome: "Verano", img: "/imgs/7.jpeg" },
  { id: 12, nome: "Verano", img: "/imgs/8.jpeg" },
  { id: 13, nome: "Verano", img: "/imgs/9.jpeg" },
  { id: 14, nome: "Verano", img: "/imgs/10.jpeg" },
  { id: 15, nome: "Verano", img: "/imgs/11.jpeg" },
  { id: 16, nome: "Verano", img: "/imgs/12.jpeg" },
  { id: 17, nome: "Verano", img: "/imgs/13.jpeg" },
  { id: 18, nome: "Verano", img: "/imgs/14.jpeg" },
  { id: 19, nome: "Verano", img: "/imgs/15.jpeg" },
  { id: 20, nome: "Verano", img: "/imgs/16.jpeg" },
  { id: 1, nome: "Maiô Tulum - Reggae", img: "/imgs/reggae.jpeg" },
  { id: 2, nome: "Biquíni Ibiza - Preto", img: "/imgs/ibiza.jpeg" },
  { id: 3, nome: "Biquíni Tulum - Chocolate com marrom", img: "/imgs/tulum.jpeg" },
  { id: 21, nome: "Verano", img: "/imgs/17.jpeg" }
];

const benefits = [
  { icon: "☀️", title: "Proteção UV50+", desc: "Protege sua pele nos dias ensolarados" },
  { icon: "🧵", title: "Forro Duplo", desc: "Conforto e segurança garantidos" },
  { icon: "🌊", title: "Resistente", desc: "Durável com cloro e água salgada" },
  { icon: "🎨", title: "Cores Naturais", desc: "Inspiradas no litoral" },
];

const why = [
  { num: "01", title: "Feito com ❤️", desc: "Cada peça é pensada com cuidado e atenção aos detalhes" },
  { num: "02", title: "Modelagens Inclusivas", desc: "Biquínis pensados para diferentes corpos e tipos" },
  { num: "03", title: "Sustentável", desc: "Materiais de qualidade que duram e respeitam o meio ambiente" },
];

function CountUp({ end = 0, duration = 2 }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isVisible) {
        setIsVisible(true);
      }
    }, { threshold: 0.5 });

    const el = document.querySelector(`[data-count="${end}"]`);
    if (el) observer.observe(el);

    return () => observer.disconnect();
  }, [end, isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const increment = end / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [isVisible, end, duration]);

  return <span>{count}</span>;
}

function Nav(){
  return (
    <div className="nav">
      <div className="container inner">
        <div className="brand">
          <span>VERANO</span>
        </div>
        <div className="links">
          <a href="#beneficios">Benefícios</a>
          <a href="#guia">Guia</a>
        </div>
        <Button asChild className="pulse">
          <a href="https://wa.me/5585997056311" target="_blank" rel="noreferrer">Comprar no WhatsApp</a>
        </Button>
      </div>
    </div>
  );
}

function Colecoes(){
  const plugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  return (
    <section className="carousel-section">
      <div className="carousel-wrapper">
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {produtos.map((p) => (
              <CarouselItem key={p.id} className="basis-full md:basis-1/2 lg:basis-1/3">
                <a 
                  href={`https://wa.me/5585997056311?text=${encodeURIComponent('Oi, gostaria de saber mais sobre os biquínis Verano')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="group overflow-hidden rounded-lg fadeup h-full block"
                >
                  <div className="relative overflow-hidden aspect-square bg-gradient-to-br from-gray-50 to-gray-100">
                    <img 
                      src={p.img} 
                      alt={p.nome}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                    <img 
                      src={p.img} 
                      alt={p.nome}
                      className="absolute inset-0 w-full h-full object-cover blur-lg scale-150 -z-10"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-12 hover:bg-black/10" />
          <CarouselNext className="hidden md:flex -right-12 hover:bg-black/10" />
        </Carousel>
      </div>
    </section>
  );
}

function Hero(){
  return (
    <section className="hero">
      <div className="container hero-wrap">
        <img src="/imgs/verano.jpeg" alt="Logo Verano" style={{height:90, marginTop:-40, marginBottom:10, borderRadius: '50%'}} />
        <h1 className="fadeup">Beachwear atemporal, conforto que abraça.</h1>
        <p className="fadeup d2">Biquínis com modelagens pensadas para diferentes corpos. Proteção UV50+, forro duplo e cartela de cores inspirada no litoral.</p>
        <div className="hero-actions fadeup d3">
          <Button asChild className="pulse">
            <a href="https://wa.me/5585997056311" target="_blank" rel="noreferrer">Comprar agora</a>
          </Button>
          <Button variant="secondary" asChild>
            <a href="#beneficios">Ver mais</a>
          </Button>
        </div>
      </div>
    </section>
  );
}

function Beneficios(){
  return (
    <section id="beneficios" className="section" style={{background:"var(--sand2)"}}>
      <div className="container">
        <h2>Por que Verano?</h2>
        <p className="lead">Qualidade, conforto e estilo em cada peça.</p>
        
        <div className="benefits-grid">
          {benefits.map((b, i) => (
            <div key={i} className="benefit-card">
              <div className="benefit-icon">{b.icon}</div>
              <h3>{b.title}</h3>
              <p>{b.desc}</p>
            </div>
          ))}
        </div>
        <div className="why-grid">
          {why.map((w, i) => (
            <div key={i} className="why-item">
              <div className="why-number">{w.num}</div>
              <h3>{w.title}</h3>
              <p>{w.desc}</p>
            </div>
          ))}
        </div>
        <div className="stats-section">
          <div className="stat-item" data-count="500">
            <p className="stat-number"><CountUp end={500} /> +</p>
            <p className="stat-label">Clientes felizes</p>
          </div>
          <div className="stat-item" data-count="48">
            <p className="stat-number"><CountUp end={48} /> h</p>
            <p className="stat-label">Entrega rápida</p>
          </div>
          <div className="stat-item" data-count="7">
            <p className="stat-number"><CountUp end={7} /> dias</p>
            <p className="stat-label">Garantia de troca</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Guia(){
  return (
    <section id="guia" className="section">
      <div className="container" style={{maxWidth:880}}>
        <h2>Guia de Tamanhos</h2>
        <p className="lead">Envie suas medidas e indicamos o melhor ajuste. Modelagens com forro duplo e elasticidade confortável.</p>

        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))", gap:16}}>
          <Card>
            <CardHeader><CardTitle>Como medir</CardTitle></CardHeader>
            <CardContent style={{opacity:.9, fontSize:14, lineHeight:1.6}}>
              • Busto: fita contorna a parte mais alta.<br/>
              • Cintura: parte mais fina do tronco.<br/>
              • Quadril: contorne a parte mais larga.<br/>
              Dica: mantenha a fita paralela ao chão.
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Tabela rápida</CardTitle></CardHeader>
            <CardContent>
              <div className="table">
                <div className="head">Tamanho</div><div>PP</div><div>P</div><div>M</div>
                <div className="head">Busto (cm)</div><div>78–84</div><div>85–90</div><div>91–96</div>
                <div className="head">Quadril (cm)</div><div>86–92</div><div>93–98</div><div>99–104</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Accordion type="single" collapsible style={{marginTop:16}}>
          <AccordionItem value="trocas">
            <AccordionTrigger>Trocas & envios</AccordionTrigger>
            <AccordionContent>Envio em até 48h úteis. 7 dias para troca sem uso, conforme CDC.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="cuidados">
            <AccordionTrigger>Cuidados com a peça</AccordionTrigger>
            <AccordionContent>Lave à mão com sabão neutro e seque à sombra. Evite contato prolongado com cloro.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="frete">
            <AccordionTrigger>Como é o frete?</AccordionTrigger>
            <AccordionContent>Frete grátis para Fortaleza. Outras cidades: valor calculado no WhatsApp. Entrega em até 48h úteis.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}

function Footer(){
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="footer">
      <div className="container footer-row">
        <small style={{opacity:.8}}>
          © {year ?? ""} Verano. Todos os direitos reservados.
        </small>
        <div style={{display:"flex", gap:20, alignItems:"center"}}>
          <a href="#beneficios" style={{opacity:.8, textDecoration:"none", color:"inherit"}}>Beneficios</a>
          <a 
            href="https://wa.me/5585997056311?text=Oi%2C%20gostaria%20de%20saber%20mais%20sobre%20Verano" 
            target="_blank" 
            rel="noreferrer"
            title="WhatsApp"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </a>
          <a 
            href="https://www.instagram.com/useverano.jt" 
            target="_blank" 
            rel="noreferrer"
            title="Instagram"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <circle cx="17.5" cy="6.5" r="1.5"></circle>
            </svg>
          </a>

        </div>
      </div>
    </footer>
  );
}

export default function App(){
  return (
    <div>
      <style>{css}</style>
      <Nav />
      <Colecoes />
      <Hero />
      <Beneficios />
      <Guia />
      <Footer />
    </div>
  );
}