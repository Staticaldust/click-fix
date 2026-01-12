import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary-800 text-secondary-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="text-2xl font-bold text-primary-400">
              אנשי שלומנו
            </Link>
            <p className="mt-4 text-sm">
              הפלטפורמה המובילה לחיבור בין בעלי מקצוע ללקוחות בקהילה החרדית
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">קישורים מהירים</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/search" className="text-sm hover:text-primary-400 transition-colors">
                  חיפוש בעלי מקצוע
                </Link>
              </li>
              <li>
                <Link to="/pro/register" className="text-sm hover:text-primary-400 transition-colors">
                  הצטרף כבעל מקצוע
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-sm hover:text-primary-400 transition-colors">
                  הרשמה כלקוח
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">קטגוריות פופולריות</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/search/electrician" className="text-sm hover:text-primary-400 transition-colors">
                  חשמלאי
                </Link>
              </li>
              <li>
                <Link to="/search/plumber" className="text-sm hover:text-primary-400 transition-colors">
                  אינסטלטור
                </Link>
              </li>
              <li>
                <Link to="/search/ac" className="text-sm hover:text-primary-400 transition-colors">
                  מזגנים
                </Link>
              </li>
              <li>
                <Link to="/search/painter" className="text-sm hover:text-primary-400 transition-colors">
                  צבעי
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">צור קשר</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-primary-400" />
                <span dir="ltr">03-1234567</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-primary-400" />
                <span>support@ansheishlomenu.co.il</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-primary-400" />
                <span>ישראל</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-secondary-700 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">
            © {currentYear} אנשי שלומנו. כל הזכויות שמורות.
          </p>
          <div className="flex gap-6">
            <Link to="/terms" className="text-sm hover:text-primary-400 transition-colors">
              תנאי שימוש
            </Link>
            <Link to="/privacy" className="text-sm hover:text-primary-400 transition-colors">
              מדיניות פרטיות
            </Link>
            <Link to="/accessibility" className="text-sm hover:text-primary-400 transition-colors">
              נגישות
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
