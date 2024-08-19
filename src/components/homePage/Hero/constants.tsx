import { FaGithub, FaLinkedin, FaPenAlt } from "react-icons/fa";

export const links = [
  {
    icon: <FaGithub className="w-10 h-10" />,
    title: "GitHub",
    url: "https://github.com/Bart3kL",
  },
  {
    icon: <FaLinkedin className="w-10 h-10" />,
    title: "Linkedin",
    url: "https://www.linkedin.com/in/bartosz-lewandowski-458130266/",
  },
  {
    icon: <FaPenAlt className="w-10 h-10" />,
    title: "Blog",
    url: "https://www.bartoszlewandowski.dev",
    isStatic: true,
    imageSrc:
      "https://uploads-ssl.webflow.com/66b3a19edb9040c92f7ec8aa/66c3b4acb380a00ff0956226_Zrzut%20ekranu%202024-08-19%20230929.png",
  },
];
