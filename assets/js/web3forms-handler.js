document.addEventListener('DOMContentLoaded', function () {
  const forms = document.querySelectorAll('.footer-contact-form');

  forms.forEach((form) => {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      const btnSpan = submitBtn ? (submitBtn.querySelector('span') || submitBtn) : null;
      const originalText = btnSpan ? btnSpan.textContent : (submitBtn ? submitBtn.textContent : 'Submit Message');

      // Detect page source internally for email notification header
      let pageName = 'Home Page';
      const path = window.location.pathname.toLowerCase();
      if (path.includes('about')) {
        pageName = 'About Page';
      } else if (path.includes('portfolio')) {
        pageName = 'Portfolio Page';
      } else if (path.includes('contact')) {
        pageName = 'Contact Page';
      }

      const formData = new FormData(form);
      formData.set('access_key', '7f70c2b4-3c23-46f0-8213-1127639fb2af');
      formData.set('from_name', `Talha Portfolio - ${pageName}`);
      formData.set('subject', `Form Submission from ${pageName}`);
      formData.set('page_source', `${pageName}`);

      if (btnSpan) {
        btnSpan.textContent = 'Sending...';
      } else if (submitBtn) {
        submitBtn.textContent = 'Sending...';
      }
      if (submitBtn) submitBtn.disabled = true;

      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();

        if (response.ok && data.success) {
          showToast('Message sent successfully!', 'success');
          form.reset();
        } else {
          showToast(data.message || 'Could not send message. Please try again.', 'error');
        }
      } catch (error) {
        showToast('Something went wrong. Please try again.', 'error');
      } finally {
        if (btnSpan) {
          btnSpan.textContent = originalText;
        } else if (submitBtn) {
          submitBtn.textContent = originalText;
        }
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  });
});

function showToast(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.style.cssText = 'position: fixed; bottom: 24px; right: 24px; z-index: 99999; display: flex; flex-direction: column; gap: 12px; pointer-events: none;';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  const isSuccess = type === 'success';
  const accentColor = isSuccess ? '#10b981' : '#ef4444';
  const icon = isSuccess ? '✓' : '✕';

  toast.style.cssText = `
    pointer-events: auto;
    min-width: 280px;
    max-width: 380px;
    background: #ffffff;
    color: #0f172a;
    border: 1px solid #e2e8f0;
    border-left: 5px solid ${accentColor};
    padding: 14px 20px;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    font-family: inherit;
    font-size: 15px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 12px;
    opacity: 0;
    transform: translateX(50px) scale(0.95);
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  `;

  toast.innerHTML = `
    <span style="display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 50%; background: ${accentColor}; color: #ffffff; font-size: 14px; font-weight: bold; flex-shrink: 0; box-shadow: 0 2px 8px ${accentColor}40;">${icon}</span>
    <span style="flex-grow: 1; line-height: 1.4; color: #1e293b;">${message}</span>
  `;

  container.appendChild(toast);

  // Trigger smooth enter animation
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(0) scale(1)';
  });

  // Auto remove after 4.5 seconds
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(50px) scale(0.95)';
    setTimeout(() => {
      toast.remove();
    }, 400);
  }, 4500);
}
