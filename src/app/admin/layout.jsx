import './admin.css';

/**
 * Admin segment layout. Because the root layout is now minimal, this is all
 * the admin panel loads: its own stylesheet and the shared brand fonts.
 * (Previously every admin page also rendered the public site's footer, cart
 * providers, branch modal, analytics and the 5-family Google Fonts @import.)
 */
export const metadata = {
  title: { default: 'Admin', template: '%s | Lucky Sushi Admin' },
  description: 'Lucky Sushi & Chinese — staff admin panel.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
  alternates: { canonical: '/admin' },
};

export default function AdminRootLayout({ children }) {
  return (
    <div className="admin-root" lang="en" dir="ltr">
      {children}
    </div>
  );
}
