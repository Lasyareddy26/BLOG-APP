import React from 'react'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h4>📝 ArticleVerse</h4>
          <p>Your daily dose of tech and stories.</p>
        </div>
        
        <div className="footer-links">
          <a href="/about">About</a>
          <a href="/articles">Articles</a>
          <a href="/contact">Contact</a>
          <a href="/privacy">Privacy</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} ArticleVerse. All rights reserved.</p>
      </div>
    </footer>
  );
}
export default Footer