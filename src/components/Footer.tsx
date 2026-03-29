const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p style={styles.copyright}>
        © 2026 Igor Michels. Todos os direitos reservados.
      </p>
    </footer>
  );
};

const styles = {
  footer: {
    padding: '32px 24px',
    textAlign: 'center' as const,
  },
  copyright: {
    fontSize: '0.875rem',
    color: 'hsl(var(--muted-foreground) / 0.6)',
    margin: 0,
    fontWeight: 400,
    letterSpacing: '0.02em',
  },
};

export default Footer;
