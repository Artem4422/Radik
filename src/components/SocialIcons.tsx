const socialLinks = [
  { href: "https://www.threads.net/@jugglershow", icon: "/icon/soj/threads-app-black-square-logo-22060 (1).svg", alt: "Threads" },
  { href: "https://www.instagram.com/jugglershow", icon: "/icon/soj/instagram-2-1-logo-svgrepo-com.svg", alt: "Instagram" },
  { href: "https://rutube.ru/u/jugglershow/", icon: "/icon/soj/rutube-sign-logo.svg", alt: "Rutube" },
  { href: "https://t.me/juggler_show", icon: "/icon/soj/telegram-svgrepo-com.svg", alt: "Telegram" },
  { href: "https://vk.com/juggler_show", icon: "/icon/soj/icons8-vk (2).svg", alt: "VK" },
  { href: "https://www.youtube.com/@jugglershow", icon: "/icon/soj/youtube-svgrepo-com.svg", alt: "YouTube" },
];

export function SocialIcons({
  spread = false,
  className = "",
}: {
  spread?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`contact-social-icons${spread ? " contact-social-icons--spread" : ""}${className ? ` ${className}` : ""}`}
    >
      {socialLinks.map((item) => (
        <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer">
          <img src={item.icon} alt={item.alt} loading="lazy" decoding="async" />
        </a>
      ))}
    </div>
  );
}
