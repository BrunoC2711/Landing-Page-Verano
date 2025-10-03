'use client'

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// 
// ATENÇÃO: Este arquivo usa APENAS React + Vite + shadcn/ui.
// • Nenhuma dependência de Tailwind nas classes do usuário
// • Nenhuma dependência de Framer Motion ou ícones externos
// • Layout e animações simples feitos com CSS puro abaixo
//

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
.brand-badge{font-size:12px; padding:.25rem .5rem; border:1px solid rgba(0,0,0,.1); border-radius:999px; background:#f3e1e1; color:#6b3f3f}
.links{display:none; gap:20px; opacity:.85}
@media (min-width: 900px){ .links{display:flex} }
.links a{color:inherit; text-decoration:none}
.links a:hover{opacity:1}

/* HERO */
.hero {
  position: relative;
  min-height: 70svh;
  display: grid;
  align-items: end;
  overflow: hidden;
  background: var(--sand);
}

/* Imagem com blur no fundo (expandida) */
.hero{position:relative; min-height:70svh; display:grid; align-items:end; background:
  linear-gradient(to bottom, rgba(255,255,255,.2), var(--sand) 80%);}
.hero-wrap{padding:72px 10px 24px}
.badge{width:110px;height:110px;border-radius:50%;backdrop-filter:blur(6px);background:rgba(255,255,255,.7);border:1px solid rgba(255,255,255,.8);display:grid;place-items:center;box-shadow:0 10px 30px rgba(0,0,0,.12);transform:translateY(-20px)}
.badge span{letter-spacing:.35em;color:#6b3f3f}
.hero h1{font-family: ui-serif, Georgia, serif; font-size:44px; line-height:1.12; margin:10px 0 6px; color:#6b3f3f}
.hero p{max-width:740px; opacity:.85; margin:0}
.hero-actions{display:flex; gap:10px; margin:16px 0 6px; flex-wrap:wrap}

/* SEÇÕES */
.section{padding:54px 0}
.section h2{font-family: ui-serif, Georgia, serif; font-size:34px; margin:0 0 8px}
.section .lead{opacity:.9; max-width:760px; margin:0 0 20px}

.grid{display:grid; grid-template-columns:1fr; gap:16px}
@media (min-width: 760px){ .grid{grid-template-columns:repeat(3, 1fr)} }

.product-img{height:240px; overflow:hidden}
.product-img img{width:100%; height:100%; object-fit:cover; transition:transform .45s}
.card-hover:hover .product-img img{transform:scale(1.04)}

/* FAQ */
.table{display:grid; grid-template-columns:repeat(4, 1fr); gap:10px; font-size:14px; opacity:.9}
.table .head{font-weight:600}

/* FOOTER */
.footer{padding:28px 0 48px; border-top:1px solid rgba(0,0,0,.08); background:rgba(255,255,255,.6); backdrop-filter:blur(6px)}
.footer-row{display:flex; align-items:center; justify-content:space-between; gap:16px; flex-wrap:wrap}

/* Micro-interações básicas (sem libs) */
.fadeup{opacity:0; transform:translateY(12px); animation:fadeup .55s ease forwards}
.fadeup.d2{animation-delay:.08s} .fadeup.d3{animation-delay:.16s}
@keyframes fadeup{to{opacity:1; transform:none}}
`;

const produtos = [
  { id: 1, nome: "Maiô Tulum - Reggae", preco: "R$ 55", preco_com_desconto: "R$ 53", img: "/imgs/reggae.jpeg" },
  { id: 2, nome: "Biquíni Ibiza - Preto", preco: "R$ 51,9", preco_com_desconto: "R$ 49,9", img: "/imgs/ibiza.jpeg" },
  { id: 3, nome: "Biquíni Tulum - Chocolate com marrom", preco: "R$ 64", preco_com_desconto: "R$ 62", img: "/imgs/tulum.jpeg" },
];

function Nav(){
  return (
    <div className="nav">
      <div className="container inner">
        <div className="brand">
          <span>VERANO</span>
        </div>
        <div className="links">
          <a href="#colecoes">Coleções</a>
          <a href="#guia">Guia</a>
          {/* <a href="#contato">Contato</a> */}
        </div>
        <Button asChild>
          <a href="https://wa.me/5585997056311" target="_blank" rel="noreferrer">Comprar no WhatsApp</a>
        </Button>
      </div>
    </div>
  );
}

function Hero(){
  return (
    <section className="hero">
      <div className="container hero-wrap">
        {/* <div className="badge"><span>VERANO</span></div> */}
        <img src="/imgs/verano.jpeg" alt="Logo Verano" style={{height:90, marginTop:-40, marginBottom:10, borderRadius: '50%'}} />
        <h1 className="fadeup">Beachwear atemporal, conforto que abraça.</h1>
        <p className="fadeup d2">Biquínis com modelagens pensadas para diferentes corpos. Proteção UV50+, forro duplo e cartela de cores inspirada no litoral.</p>
        <div className="hero-actions fadeup d3">
          <Button asChild>
            <a href="https://wa.me/5585997056311" target="_blank" rel="noreferrer">Comprar agora</a>
          </Button>
          <Button variant="secondary" asChild>
            <a href="#colecoes">Ver coleções</a>
          </Button>
        </div>
      </div>
    </section>
  );
}

function Colecoes(){
  return (
    <section id="colecoes" className="section" style={{background:"var(--sand2)"}}>
      <div className="container">
        <h2>Coleções</h2>
        <p className="lead">Peças lisas e texturizadas em tons naturais. Combine tamanhos, cores e modelos para o seu ajuste perfeito.</p>
        <div className="grid">
{produtos.map((p, i) => (
  <Card 
    key={p.id} 
    className="group card-hover fadeup overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300" 
    style={{animationDelay: `${i * 80}ms`}}
  >
    {/* Imagem do Produto com Overlay */}
    <div className="relative overflow-hidden aspect-square bg-gradient-to-br from-gray-50 to-gray-100">
      <img 
        src={p.img} 
        alt={p.nome}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
    </div>

    {/* Conteúdo do Card */}
    <div className="p-5 space-y-4">
      {/* Header com Nome e Preços */}
      <div className="space-y-2">
        <h3 className="font-semibold text-lg leading-tight text-gray-900 line-clamp-2">
          {p.nome}
        </h3>
        
        {/* Preços */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-baseline gap-2">
            <span className="text-xs text-gray-500 line-through">
              {p.preco}
            </span>
            <Badge className="bg-black hover:bg-gray-900 text-white font-bold px-3 py-1 text-sm shadow-md">
              {p.preco_com_desconto}
            </Badge>
          </div>
          <span className="text-xs text-gray-600 font-medium">
            💰 à vista/dinheiro
          </span>
        </div>
      </div>

      {/* Tamanhos */}
      <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          Tamanhos:
        </span>
        <div className="flex gap-1.5">
          {['PP', 'P', 'M', 'G'].map(tamanho => (
            <span 
              key={tamanho}
              className="text-xs font-semibold text-gray-700 bg-gray-100 px-2 py-1 rounded"
            >
              {tamanho}
            </span>
          ))}
        </div>
      </div>

      {/* Botão de Compra */}
      <Button 
        asChild 
        className="w-full bg-black hover:bg-gray-900 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
      >
        <a 
          href={`https://wa.me/5585997056311?text=Oi%2C%20quero%20o%20${encodeURIComponent(p.nome)}`} 
          target="_blank" 
          rel="noreferrer"
          className="flex items-center justify-center gap-2"
        >
          <svg 
            className="w-5 h-5 transition-transform group-hover:scale-110" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Comprar no WhatsApp
        </a>
      </Button>
    </div>
  </Card>
))}
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

        <div style={{display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:16}}>
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
        </Accordion>
      </div>
    </section>
  );
}

// function Contato(){
//   const [open, setOpen] = useState(false);
//   return (
//     <section id="contato" className="section">
//       <div className="container" style={{maxWidth:760}}>
//         <h2>Contato</h2>
//         <Card>
//           <CardContent style={{paddingTop:20}}>
//             <div style={{display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:12}}>
//               <Input placeholder="Seu nome" />
//               <Input placeholder="Seu e-mail" type="email" />
//               <Input placeholder="Assunto" style={{gridColumn:"1 / -1"}} />
//               <Textarea placeholder="Mensagem" rows={4} style={{gridColumn:"1 / -1"}} />
//               <div style={{display:"flex", gap:10, gridColumn:"1 / -1"}}>
//                 <Button>Enviar</Button>
//                 <Button variant="secondary" asChild>
//                   <a href="https://wa.me/5585997056311" target="_blank" rel="noreferrer">WhatsApp</a>
//                 </Button>
//                 <Dialog open={open} onOpenChange={setOpen}>
//                   <DialogTrigger asChild>
//                     <Button variant="ghost">Política</Button>
//                   </DialogTrigger>
//                   <DialogContent>
//                     <DialogHeader>
//                       <DialogTitle>Política de Privacidade</DialogTitle>
//                       <DialogDescription>Usamos suas informações apenas para contato e suporte. Não compartilhamos dados com terceiros.</DialogDescription>
//                     </DialogHeader>
//                   </DialogContent>
//                 </Dialog>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </section>
//   );
// }

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
        <div style={{display:"flex", gap:14}}>
          <a href="#guia" style={{opacity:.8, textDecoration:"none", color:"inherit"}}>Guia</a>
          {/* <a href="#contato" style={{opacity:.8, textDecoration:"none", color:"inherit"}}>Contato</a> */}
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
      <Hero />
      <Colecoes />
      <Guia />
      {/* <Contato /> */}
      <Footer />
    </div>
  );
}
