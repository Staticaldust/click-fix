import React from "react";
import "./HomePage.css";

const NotFoundPage: React.FC = () => {
  return (
    <div className="home-page" dir="rtl" lang="he">
      <header className="header">
        <div className="container">
          <h1 className="site-title">404 — לא נמצא</h1>
        </div>
      </header>

      <main className="main-content container">
        <section className="section-card">
          <p>העמוד שברצונך להגיע אליו לא נמצא.</p>
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

export default NotFoundPage;
