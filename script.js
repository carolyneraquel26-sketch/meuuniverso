document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab-btn');
  const contents = document.querySelectorAll('.payment-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.add('hidden'));

      // Add active to clicked
      tab.classList.add('active');
      const targetId = tab.getAttribute('data-tab') + '-content';
      document.getElementById(targetId).classList.remove('hidden');
    });
  });

  // Modal Logic
  const modal = document.getElementById('reviewModal');
  const btnOpen = document.getElementById('openReviewModal');
  const btnClose = document.getElementById('closeReviewModal');

  if (btnOpen && modal) {
    btnOpen.addEventListener('click', () => modal.classList.remove('hidden'));
  }
  if (btnClose && modal) {
    btnClose.addEventListener('click', () => modal.classList.add('hidden'));
  }
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.add('hidden');
    });
  }

  // Star Rating Logic
  const stars = document.querySelectorAll('.star');
  const ratingInput = document.getElementById('ratingValue');
  
  stars.forEach(star => {
    star.addEventListener('click', function() {
      const value = parseInt(this.getAttribute('data-value'));
      ratingInput.value = value;
      stars.forEach(s => {
        if (parseInt(s.getAttribute('data-value')) <= value) {
          s.classList.add('selected');
        } else {
          s.classList.remove('selected');
        }
      });
    });
  });

  // Review Form Submission Logic
  const reviewForm = document.getElementById('reviewForm');
  if (reviewForm) {
    reviewForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const inputs = reviewForm.querySelectorAll('.review-input');
      const name = inputs[0].value;
      const email = inputs[1].value;
      const comment = inputs[2].value;
      const rating = parseInt(ratingInput.value) || 5;
      
      if (name && comment) {
        // Hide empty state box
        const noReviewsBox = document.getElementById('noReviewsBox');
        if (noReviewsBox) noReviewsBox.style.display = 'none';

        // Update tab count
        const tab = document.querySelector('.review-tab.active');
        if (tab) {
          const currentCount = parseInt(tab.textContent.match(/\d+/)[0]) || 0;
          tab.textContent = `AVALIAÇÕES (${currentCount + 1})`;
        }

        // Add the comment
        const container = document.getElementById('comments-list');
        const reviewEl = document.createElement('div');
        reviewEl.style.background = 'white';
        reviewEl.style.padding = '1.5rem';
        reviewEl.style.borderRadius = '12px';
        reviewEl.style.marginBottom = '1.5rem';
        reviewEl.style.border = '1px solid #e5e7eb';
        reviewEl.style.textAlign = 'left';
        
        let starsHtml = '';
        for(let i=1; i<=5; i++) {
          starsHtml += i <= rating ? '<span style="color: #fbbf24;">★</span>' : '<span style="color: #d1d5db;">★</span>';
        }

        reviewEl.innerHTML = `
          <div style="font-weight: 700; color: #1f2937; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-size: 1.2rem;">${starsHtml}</span>
            ${name}
          </div>
          <p style="color: #4b5563; font-size: 0.95rem; line-height: 1.6; margin:0;">${comment}</p>
        `;
        
        container.prepend(reviewEl);
        
        // Reset form and close modal
        reviewForm.reset();
        stars.forEach(s => s.classList.add('selected'));
        ratingInput.value = 5;
        modal.classList.add('hidden');
      }
    });
  }
});
