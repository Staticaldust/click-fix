import React from "react";
import "./HomePage.css";

const HomePage: React.FC = () => {
  return (
    <div className="home-page" dir="rtl" lang="he">
      <header className="header">
        <div className="container">
          <h1 className="site-title">אנשי שלומנו</h1>
          <p className="tagline">
            מערכת למציאת נותני שירות טכניים אמינים, זולים ומתאימים לצורכי הקהילה
            החרדית
          </p>
          <div className="header-actions">
            <a href="/register" className="btn primary">
              הרשמה כנותן שירות
            </a>
            <a href="/search" className="btn">
              חיפוש נותן שירות
            </a>
          </div>
        </div>
      </header>

      <main className="main-content">
        <section className="hero container">
          <h2 className="hero-title">שקיפות, אמינות ונגישות לשירותים טכניים</h2>
          <p className="hero-sub">
            השוו מחירים, בדקו דירוגים ותאמו מקצוענים לפי מגדר, אמינות וכשרות —
            גם דרך משיבון סלולרי מותאם.
          </p>
          <div className="hero-ctas">
            <a href="/search" className="btn large">
              מצא נותן שירות עכשיו
            </a>
            <a href="tel:*1234" className="btn outline">
              גישה בשיבון סלולרי
            </a>
          </div>
        </section>

        <section className="features container">
          <h3>מה המערכת מציעה</h3>
          <ul>
            <li>
              <strong>התאמה לפי מגדר:</strong> אפשרות לבחור נותני שירות מתאימים
              לנורמות צניעות.
            </li>
            <li>
              <strong>שיבון סלולרי:</strong> גישה מלאה גם ללא גלישה לאינטרנט.
            </li>
            <li>
              <strong>השוואת מחירים ודירוגים:</strong> דירוגים שמשפיעים על
              המלצות האפליקציה.
            </li>
            <li>
              <strong>רישום ובקרת אמינות:</strong> מערכת ביקורת חכמה ותגובות
              מאומתות.
            </li>
          </ul>
        </section>

        <section className="how-it-works container">
          <h3>איך זה עובד</h3>
          <ol>
            <li>הלקוח מחפש או מתאר תקלה/שירות דרוש.</li>
            <li>
              מערכת משווה נותנים שירות לפי קריטריונים (מחיר, דירוג, מגדר).
            </li>
            <li>הלקוח בוחר ומזמין — אחרי השירות ניתן לדרג ולכתוב חוות דעת.</li>
            <li>אלגוריתמים מעדכנים המלצות ומקדמים נותנים אמינים.</li>
          </ol>
        </section>

        <section className="values container">
          <h3>עקרונות המערכת</h3>
          <p>
            עידוד שקיפות ואמינות, הורדת מחירים באמצעות שוק חופשי מבוקר, והתאמה
            מלאה לאורח החיים החרדי.
          </p>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <p>
            © {new Date().getFullYear()} אנשי שלומנו — מערכת למציאת נותני שירות
            טכניים. לכל שאלה:{" "}
            <a href="mailto:info@example.com">info@example.com</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
