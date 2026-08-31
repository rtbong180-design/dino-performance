"use client";

import { useState } from "react";

const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

const slides = [
  { image: "/dino-campaign-gym-stronger-v3.png", mobileImage: "/dino-mobile-wall-stronger-v1.png", title: "", className: "challengeSlide" },
  { image: "/dino-oldschool-gym.png", mobileImage: null, title: "GROWTH", className: "growthSlide" },
  { image: "/dino-stronger-back-v1.png", mobileImage: null, title: "STRONG", className: "strongSlide" },
];

const subCategories = ["전체상품", "상의", "하의", "아우터", "짐웨어", "언더웨어"];
const tickerWords = ["CHALLENGE", "GROWTH", "STRONG"];

function CategoryMenu({ activeMenu, setActiveMenu, onProducts }: {
  activeMenu: "MEN" | "WOMEN" | null;
  setActiveMenu: (menu: "MEN" | "WOMEN" | null) => void;
  onProducts: () => void;
}) {
  const toggle = (menu: "MEN" | "WOMEN") => setActiveMenu(activeMenu === menu ? null : menu);
  return (
    <nav className="categoryNav" aria-label="상품 카테고리">
      <button onClick={onProducts}>ALL</button>
      <div className={activeMenu === "MEN" ? "category active" : "category"}>
        <button onClick={() => toggle("MEN")} aria-expanded={activeMenu === "MEN"}>MEN</button>
        {activeMenu === "MEN" && <div className="subMenu">{subCategories.map((item) => <button key={item} onClick={onProducts}>{item}</button>)}</div>}
      </div>
      <div className={activeMenu === "WOMEN" ? "category active" : "category"}>
        <button onClick={() => toggle("WOMEN")} aria-expanded={activeMenu === "WOMEN"}>WOMEN</button>
        {activeMenu === "WOMEN" && <div className="subMenu">{subCategories.map((item) => <button key={item} onClick={onProducts}>{item}</button>)}</div>}
      </div>
      <button onClick={onProducts}>ACC</button>
    </nav>
  );
}

function Ticker() {
  const Group = () => <div className="tickerGroup" aria-hidden="true">{tickerWords.map((word) => <span key={word}>{word}<i /></span>)}</div>;
  return <div className="ticker" aria-label="Challenge, Growth, Strong"><div className="tickerTrack"><Group /></div></div>;
}

function InstagramMark() {
  return <button className="instagramMark" aria-label="Instagram"><span><img src={asset("/instagram-icon.png")} alt="" /></span></button>;
}

export default function Home() {
  const [view, setView] = useState<"home" | "products">("home");
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeMenu, setActiveMenu] = useState<"MEN" | "WOMEN" | null>(null);
  const openProducts = () => {
    setView("products");
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  if (view === "products") {
    return (
      <main className="shopPage">
        <header className="shopHeader">
          <InstagramMark />
          <button className="shopLogo" onClick={() => setView("home")} aria-label="홈으로 이동"><img src={asset("/dino-logo-black.png")} alt="DINO 심볼" /><span>DINO</span></button>
          <div className="shopTools"><button>ABOUT</button><button>PRODUCTS</button><button>BAG / 0</button><button aria-label="검색">⌕</button></div>
        </header>
        <div className="breadcrumb">Home / ALL</div>
        <aside className="shopSidebar"><CategoryMenu activeMenu={activeMenu} setActiveMenu={setActiveMenu} onProducts={openProducts} /></aside>
        <section className="comingSoon" aria-label="DINO 제품 출시 예정">
          <h1>COMING<br />SOON.</h1>
        </section>
      </main>
    );
  }

  return (
    <main className="homePage">
      <header className="homeHeader">
        <InstagramMark />
        <div className="homeTools"><button>ABOUT</button><button onClick={openProducts}>PRODUCTS</button><button>BAG / 0</button><button aria-label="검색">⌕</button></div>
      </header>
      <aside className="homeSidebar"><CategoryMenu activeMenu={activeMenu} setActiveMenu={setActiveMenu} onProducts={openProducts} /></aside>
      <div className="slideDeck" onScroll={(event) => {
        const element = event.currentTarget;
        setActiveSlide(Math.min(slides.length - 1, Math.max(0, Math.round(element.scrollTop / element.clientHeight))));
      }}>
        {slides.map((slide) => (
          <section className={`heroSlide ${slide.className}`} key={slide.image} onClick={openProducts} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") openProducts(); }} role="button" tabIndex={0} aria-label={`DINO ${slide.title || "STRONGER STARTS HERE"} 제품 보기`}>
            <picture>
              {slide.mobileImage && <source media="(max-width: 900px)" srcSet={asset(slide.mobileImage)} />}
              <img src={asset(slide.image)} alt={`DINO ${slide.title || "STRONGER STARTS HERE"}`} />
            </picture>
            <div className="slideShade" />
            <div className="slideCopy">
              {slide.title && <h1>{slide.title}</h1>}
              <button onClick={openProducts}>SHOP NOW</button>
            </div>
          </section>
        ))}
      </div>
      <nav className="slideIndicator" aria-label="홈 이미지 선택">
        {slides.map((slide, index) => <button key={slide.title} className={activeSlide === index ? "active" : ""} onClick={() => document.querySelector(".slideDeck")?.scrollTo({ top: index * window.innerHeight, behavior: "smooth" })} aria-label={`${index + 1}번 이미지`} />)}
      </nav>
      <Ticker />
    </main>
  );
}
