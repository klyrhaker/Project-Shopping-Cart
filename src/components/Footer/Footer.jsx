import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footerWrapper}>
      <p className={styles.footerText} data-testid="footer-text">
        @klyrh2026
      </p>
    </footer>
  );
}
export default Footer;
