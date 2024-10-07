import brandImg from "../images/jg-nobg-outlined-1px.svg";
import emailImg from "../images/envelope-f.svg";
import githubImg from "../images/github.svg";
import linkedinImg from "../images/linkedin.svg";

export default function footer() {
  const currentYear = new Date().getFullYear();
  const copyright = document.getElementById("copyright");
  if (copyright) {
    copyright.innerText = `Crafted with Love by Jomar Granada © ${currentYear}. All Rights Reserved.`;
  }

  return (
    <footer>
      <div>
        <a
          href="https://granada-jt.github.io/web-developer-portfolio/"
          target="_blank"
          rel="noreferrer"
          id="logo-a"
        >
          <img src={brandImg} alt="logo" id="logo" />
        </a>
        <a
          href="https://github.com/Granada-JT"
          target="_blank"
          rel="noreferrer"
        >
          <img src={githubImg} alt="github" />
        </a>
        <a
          href="https://www.linkedin.com/in/jomar-granada-a33604191/"
          target="_blank"
          rel="noreferrer"
        >
          <img src={linkedinImg} alt="linkedin" id="linkedin-img" />
        </a>
        <a
          href="mailto:jomart.granada@gmail.com"
          target="_blank"
          rel="noreferrer"
          id="email-img"
        >
          <img src={emailImg} alt="email" />
        </a>
      </div>
      <p id="copyright">
        Crafted with Love by Jomar Granada © 2024. All Rights Reserved.
      </p>
    </footer>
  );
}
