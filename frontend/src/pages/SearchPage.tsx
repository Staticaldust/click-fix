import React from "react";
import "./HomePage.css";

const SearchPage: React.FC = () => {
  return (
    <div className="home-page" dir="rtl" lang="he">
      <header className="header">
        <div className="container">
          <h1 className="site-title">חפש נותן שירות</h1>
          <p className="tagline">חפש לפי קטגוריה, מחיר, דירוג והתאמה למגדר</p>
        </div>
      </header>

      <main className="main-content container">
        <section className="section-card">
          <p>עמוד חיפוש — כאן תופיע אפשרות לסינון ותוצאות.</p>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <p>© {new Date().getFullYear()} אנשי שלומנו</p>
        </div>
      </footer>
    </div>
  );
};

export default SearchPage;
