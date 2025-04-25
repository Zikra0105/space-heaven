document.addEventListener('DOMContentLoaded', () => {

    // Add animation to fade-in sections when they come into view
    const fadeInSections = document.querySelectorAll('.fade-in');
  
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });
  
    fadeInSections.forEach(section => {
      observer.observe(section);
    });
  
    // Add functionality to the "Book Free Consultancy" button
    const bookButton = document.querySelector("a[href='#booking']");
    bookButton.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Thank you for your interest! A member of our team will reach out to you shortly to schedule your free consultation.');
    });
  
    // Add dynamic stats animation
    const statsSection = document.querySelector('#stats');
    const stats = document.querySelectorAll('.stat-card p');
    
    const animateStats = () => {
      stats.forEach(stat => {
        const target = +stat.textContent.replace('+', '');
        let count = 0;
  
        const increment = target / 100;
        const updateCounter = () => {
          count += increment;
          if (count < target) {
            stat.textContent = `${Math.ceil(count)}+`;
            requestAnimationFrame(updateCounter);
        } else {
            stat.textContent = `${target}+`;
          }
        };
        updateCounter();
      });
    };
  
    const statsObserver = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        animateStats();
        statsObserver.disconnect();
      }
    }, {
      threshold: 0.5
    });
  
    statsObserver.observe(statsSection);
  });
  
  
  const faders = document.querySelectorAll('.fade-in-up');

  const appearOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px"
  };

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, appearOptions);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });

