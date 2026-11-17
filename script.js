// Dark Mode Toggle
const toggleBtns = document.querySelectorAll('.theme-toggle');
toggleBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const html = document.documentElement;
    const isDark = html.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
});

// Copy Email to Clipboard with Feedback
function setupCopyEmail() {
  const copyBtn = document.getElementById('copy-email-btn');
  const copyText = document.getElementById('copy-email-text');
  const email = 'thyagaraja1983@gmail.com';

  if (copyBtn && copyText) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(email);
        const original = copyText.textContent;
        copyText.textContent = 'Copied! ✓';
        copyBtn.classList.add('bg-emerald-50', 'dark:bg-emerald-950/50', 'border-emerald-300', 'text-emerald-600', 'dark:text-emerald-400');
        
        setTimeout(() => {
          copyText.textContent = original;
          copyBtn.classList.remove('bg-emerald-50', 'dark:bg-emerald-950/50', 'border-emerald-300', 'text-emerald-600', 'dark:text-emerald-400');
        }, 2000);
      } catch (err) {
        window.location.href = `mailto:${email}`;
      }
    });
  }
}

// Scroll-triggered animations via IntersectionObserver
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
);

document.addEventListener('DOMContentLoaded', () => {
  setupCopyEmail();
  document.querySelectorAll('.animate-on-scroll').forEach((el) => {
    observer.observe(el);
  });
});
