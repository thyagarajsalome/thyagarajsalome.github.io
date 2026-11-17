// Theme toggle
const toggleBtns = document.querySelectorAll('.theme-toggle');
toggleBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const html = document.documentElement;
    const isDark = html.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
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

document.addEventListener('DOMContentLoaded', () => {
  setupCopyEmail();
  document.querySelectorAll('.animate-on-scroll').forEach((el) => {
    observer.observe(el);
  });
});
