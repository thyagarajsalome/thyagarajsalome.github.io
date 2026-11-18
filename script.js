// Theme toggle with standard <meta name="color-scheme"> sync
function updateColorSchemeMeta(theme) {
  let meta = document.querySelector('meta[name="color-scheme"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = 'color-scheme';
    document.head.appendChild(meta);
  }
  meta.content = theme === 'dark' ? 'dark' : theme === 'light' ? 'light' : 'light dark';
}

const toggleBtns = document.querySelectorAll('.theme-toggle');
toggleBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const html = document.documentElement;
    const isDark = html.classList.toggle('dark');
    const newTheme = isDark ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    updateColorSchemeMeta(newTheme);
  });
});

// Copy primary email with feedback
function setupCopyEmail() {
  const copyBtn = document.getElementById('copy-email-btn');
  const copyText = document.getElementById('copy-email-text');
  const email = 'thyagarajsalome@gmail.com';

  if (copyBtn && copyText) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(email);
        const original = copyText.textContent;
        copyText.textContent = 'Copied!';
        setTimeout(() => {
          copyText.textContent = original;
        }, 2000);
      } catch (err) {
        window.location.href = `mailto:${email}`;
      }
    });
  }
}

// Subtle scroll reveal
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.05, rootMargin: '0px 0px -30px 0px' }
);

// Modern Scrollspy: native CSS scroll-target-group: auto with aria-current sync & IntersectionObserver fallback
function setupScrollspy() {
  const supportsScrollTargetGroup = window.CSS && CSS.supports && CSS.supports('scroll-target-group: auto');
  const navLinks = document.querySelectorAll('nav .nav-link');
  const sections = document.querySelectorAll('main section[id]');

  if (supportsScrollTargetGroup) {
    const syncAriaCurrent = () => {
      const currentLink = document.querySelector('nav a:target-current');
      navLinks.forEach((link) => {
        const isActive = link === currentLink;
        if (isActive) {
          link.setAttribute('aria-current', 'page');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    };
    syncAriaCurrent();
    document.addEventListener('scrollend', syncAriaCurrent);
    return;
  }

  // Fallback for browsers without native scroll-target-group support
  if (!sections.length || !navLinks.length) return;
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            const isActive = href === `#${currentId}`;
            link.classList.toggle('active', isActive);
            if (isActive) {
              link.setAttribute('aria-current', 'page');
            } else {
              link.removeAttribute('aria-current');
            }
          });
        }
      });
    },
    { rootMargin: '-20% 0px -65% 0px' }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

// Fallback progress bar update for browsers without animation-timeline: scroll()
function setupScrollProgressFallback() {
  if (CSS.supports && CSS.supports('animation-timeline: scroll()')) {
    return; // Native compositor handles it with 0 JS
  }
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = docHeight > 0 ? scrollTop / docHeight : 0;
    progressBar.style.transform = `scaleX(${progress})`;
  }, { passive: true });
}

document.addEventListener('DOMContentLoaded', () => {
  setupCopyEmail();
  setupScrollspy();
  setupScrollProgressFallback();
  document.querySelectorAll('.animate-on-scroll').forEach((el) => {
    observer.observe(el);
  });
});
