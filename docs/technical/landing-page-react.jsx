import React, { useState, useEffect } from "react";
import "./index.css"; // شامل Tailwind و design-tokens.css

/**
 * Play and Pay Landing Page
 * Production Version
 * Features: Light/Dark Mode, Bilingual (FA/EN), Responsive
 */

export default function LandingPage() {
  const [lang, setLang] = useState("fa");
  const [dark, setDark] = useState(false);

  // Translations
  const t = {
    fa: {
      heroTitle: "هر ثانیه مهم است — منصفانه بپرداز، آزاد پخش کن.",
      heroDesc: "تجربه‌ای منصفانه و شفاف از تماشا، بر پایه بلاک‌چین الگوراند و توکن پلی‌کوین (PLY).",
      ctaBtn: "شروع کنید",
      f1Title: "منصفانه و شفاف",
      f1Desc: "پرداخت به ازای دقیقه، نه اشتراک ماهانه.",
      f2Title: "بدون تبلیغ، با کنترل کامل",
      f2Desc: "از محتوای دلخواه، بدون مزاحمت تبلیغاتی لذت ببرید.",
      f3Title: "تسویه لحظه‌ای",
      f3Desc: "توسط قراردادهای هوشمند الگوراند انجام می‌شود.",
      ctaTitle: "به انقلاب تماشای منصفانه بپیوندید",
      ctaDesc: "همین حالا ثبت‌نام کنید و ۱۰ یورو پلی‌کوین هدیه بگیرید!",
      ctaBtn2: "ثبت‌نام رایگان",
      footer: "کلیه حقوق محفوظ است.",
      langBtn: "EN",
      themeBtn: "تیره",
    },
    en: {
      heroTitle: "Every second counts — pay fair, play free.",
      heroDesc: "Experience fair, transparent streaming powered by Algorand and PlayCoin (PLY).",
      ctaBtn: "Get Started",
      f1Title: "Fair & Transparent",
      f1Desc: "Pay per minute, not per month.",
      f2Title: "No Ads, Full Control",
      f2Desc: "Enjoy pure content with your own pace.",
      f3Title: "Instant Settlement",
      f3Desc: "Powered by Algorand Smart Contracts.",
      ctaTitle: "Join the Fair Streaming Revolution",
      ctaDesc: "Sign up today and get €10 worth of PlayCoins!",
      ctaBtn2: "Sign Up Free",
      footer: "All rights reserved.",
      langBtn: "فا",
      themeBtn: "Dark",
    },
  };

  const currentText = t[lang];

  // Set direction and theme on mount/change
  useEffect(() => {
    document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  }, [lang, dark]);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        dark
          ? "bg-bg-dark text-text-dark"
          : "bg-bg-light text-text-light"
      } ${lang === "fa" ? "font-persian" : "font-body"}`}
    >
      {/* Header */}
      <header className="flex justify-between items-center px-4 md:px-6 py-4 shadow-elev-1 bg-surface-light dark:bg-surface-dark transition-colors">
        <h1 className="text-2xl md:text-3xl font-bold text-gradient-primary">
          Play and Pay
        </h1>
        <div className="flex items-center gap-2 md:gap-3">
          <button
            onClick={() => setLang(lang === "fa" ? "en" : "fa")}
            className="px-3 py-1.5 border border-brand-start dark:border-brand-end rounded-md text-sm font-medium hover:bg-brand-start/10 dark:hover:bg-brand-end/10 transition-colors"
          >
            {currentText.langBtn}
          </button>
          <button
            onClick={() => setDark(!dark)}
            className="px-3 py-1.5 border border-brand-start dark:border-brand-end rounded-md text-sm font-medium hover:bg-brand-start/10 dark:hover:bg-brand-end/10 transition-colors"
          >
            {currentText.themeBtn}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="text-center py-12 md:py-16 lg:py-20 px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 md:mb-6 text-gradient-primary max-w-4xl mx-auto">
          {currentText.heroTitle}
        </h2>
        <p className="max-w-2xl mx-auto text-base md:text-lg text-text-secondary dark:text-text-secondary mb-6 md:mb-8">
          {currentText.heroDesc}
        </p>
        <button className="btn-primary mt-6 md:mt-8 px-6 md:px-8 py-3 md:py-4 rounded-md text-white text-base md:text-lg font-semibold shadow-elev-2 hover:shadow-elev-3 transition-all">
          {currentText.ctaBtn}
        </button>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 px-4 md:px-6 py-8 md:py-12 max-w-6xl mx-auto">
        {[
          {
            title: currentText.f1Title,
            desc: currentText.f1Desc,
          },
          {
            title: currentText.f2Title,
            desc: currentText.f2Desc,
          },
          {
            title: currentText.f3Title,
            desc: currentText.f3Desc,
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="card p-6 md:p-8 bg-surface-light dark:bg-surface-dark transition-all"
          >
            <h3 className="text-xl md:text-2xl font-semibold mb-3 text-brand-start dark:text-brand-end">
              {feature.title}
            </h3>
            <p className="text-base text-text-secondary dark:text-text-secondary">
              {feature.desc}
            </p>
          </div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="text-center py-12 md:py-16 lg:py-20 px-4 md:px-6 bg-gradient-primary text-white">
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
          {currentText.ctaTitle}
        </h3>
        <p className="mb-6 md:mb-8 text-base md:text-lg max-w-2xl mx-auto opacity-90">
          {currentText.ctaDesc}
        </p>
        <button className="bg-white text-brand-start dark:text-brand-end px-8 md:px-10 py-3 md:py-4 rounded-md font-semibold text-base md:text-lg shadow-elev-3 hover:shadow-elev-4 transition-all hover:scale-105">
          {currentText.ctaBtn2}
        </button>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 md:py-8 text-sm md:text-base text-text-secondary dark:text-text-secondary">
        © {new Date().getFullYear()} Play and Pay — {currentText.footer}
      </footer>
    </div>
  );
}

