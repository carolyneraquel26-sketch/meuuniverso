Fdocument.addEventListener('DOMContentLoaded', () => {
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

  // Navbar logic (if any) or other remaining logic can go here.
});
