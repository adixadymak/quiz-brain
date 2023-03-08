import React from "react";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className="footer">
      <p>
        &copy; {year} - QuizBrain v1.0 | All right reserved by Imran Yaqub G.
      </p>
      &nbsp;
      <a
        href="https://api.whatsapp.com/send?phone=2349061158820&text=Here%27s%20my%20feedback%20on%20QuizBrain...."
        target="_blank"
        rel="noreferrer"
      >
        Send Me Feedback on WhatsApp
      </a>
    </footer>
  );
};

export default Footer;
