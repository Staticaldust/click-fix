import React from "react";
import "./HomePage.css";

const RegisterPage: React.FC = () => {
  return (
    <div className="home-page" dir="rtl" lang="he">
      <header className="header">
        <div className="container">
          <h1 className="site-title">הרשמה כנותן שירות</h1>
          <p className="tagline">צור פרופיל, עדכן שירותים ותתחיל לקבל פניות.</p>
        </div>
      </header>

      <main className="main-content container">
        <section className="section-card">
          <p>טופס הרשמה — כאן יופיע טופס רישום נותן השירות.</p>
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

export default RegisterPage;
