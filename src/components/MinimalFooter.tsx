import { GitBranch, Users, Mail } from 'lucide-react';

const MinimalFooter = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: GitBranch, href: 'https://github.com/igorxmath', label: 'GitHub' },
    { icon: Users, href: 'https://linkedin.com/in/igorxmath', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:igor.math@outlook.com', label: 'Email' },
  ];

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <p style={styles.copyright}>
          © {currentYear} Igor. All rights reserved.
        </p>
        
        <div style={styles.socials}>
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              style={styles.socialLink}
              className="footer-social"
            >
              <link.icon size={20} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    padding: '24px 0',
    background: 'hsl(var(--background))',
    borderTop: '1px solid rgba(34, 211, 238, 0.1)',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap' as const,
    gap: '16px',
  },
  copyright: {
    fontSize: '0.875rem',
    color: 'hsl(var(--muted-foreground))',
    margin: 0,
  },
  socials: {
    display: 'flex',
    gap: '16px',
  },
  socialLink: {
    color: 'hsl(var(--muted-foreground))',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    textDecoration: 'none',
  },
};

export default MinimalFooter;
