/* ==========================================
   THREADCRAFT STUDIO - INTERACTIVE LOGIC
   Pure ES6+ Vanilla Implementation
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initAnimatedCounters();
  initPortfolio();
  initEstimator();
  initTestimonials();
  initFileDropzone();
  initForms();
});

/* ------------------------------------------
   1. Navbar Scroll & Mobile Menu Toggle
   ------------------------------------------ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileMenuBtn.querySelector('i');
      if (navLinks.classList.contains('active')) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-bars';
      }
    });
  }

  // Close mobile nav on click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      if (mobileMenuBtn) {
        mobileMenuBtn.querySelector('i').className = 'fa-solid fa-bars';
      }
    });
  });
}

/* ------------------------------------------
   2. Hero Section - Animated Stat Counters
   ------------------------------------------ */
function initAnimatedCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  const animateStats = () => {
    const heroSection = document.getElementById('hero');
    const sectionPos = heroSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight;

    if (sectionPos < screenPos && !animated) {
      animated = true;
      statNumbers.forEach(stat => {
        const target = parseFloat(stat.getAttribute('data-target'));
        const duration = 2000; // ms
        const stepTime = 20;
        const steps = duration / stepTime;
        const inc = target / steps;
        let current = 0;

        const timer = setInterval(() => {
          current += inc;
          if (current >= target) {
            stat.textContent = target >= 1000 ? (target / 1000).toLocaleString('en-US') : target;
            clearInterval(timer);
          } else {
            if (target > 1000000) {
              stat.textContent = (current / 1000000).toFixed(1) + 'M';
            } else if (target > 1000) {
              stat.textContent = Math.floor(current).toLocaleString('en-US');
            } else {
              stat.textContent = current.toFixed(1);
            }
          }
        }, stepTime);
      });
    }
  };

  window.addEventListener('scroll', animateStats);
  animateStats(); // Run on load
}


/* ------------------------------------------
   3. Portfolio Filtering & Lightbox Modal
   ------------------------------------------ */
const portfolioData = {
  1: {
    title: "Apex Crest Tactical Patch",
    badge: "Custom Patches",
    desc: "Engineered with 100% thread coverage utilizing high-tensile 40wt polyester for rugged durability and metallic gold trim highlighting.",
    stitches: "28,400",
    thread: "Metallic Gold & Matte Poly"
  },
  2: {
    title: "Ronin Spirit Leather Backpiece",
    badge: "Outerwear",
    desc: "Ultra-dense jacket back design utilizing multi-angle satin stitching to reflect ambient light along the oriental wave pattern.",
    stitches: "112,000",
    thread: "Rayon Silk Threads"
  },
  3: {
    title: "Vanguard Executive Polo",
    badge: "Corporate Apparel",
    desc: "Crisp micro-embroidery designed to keep text sharp on stretchable pique knit cotton without puckering.",
    stitches: "8,200",
    thread: "Isacord Micro Satin"
  },
  4: {
    title: "Royal Heritage Monogram Cuff",
    badge: "Monograms",
    desc: "Bespoke initialing with elevated padding underlay to create an embossed relief effect on French dress cuffs.",
    stitches: "4,500",
    thread: "Pearl White Silk"
  },
  5: {
    title: "Cybernetic 3D Puff Badge",
    badge: "Custom Patches",
    desc: "High-density 3mm EVA foam embroidery creates a striking dimensional relief structure with laser-cut edges.",
    stitches: "35,000",
    thread: "3D EVA + Poly Blend"
  },
  6: {
    title: "Botanical Heavy Denim Jacket",
    badge: "Outerwear",
    desc: "Full back intricate floral embroidery blending 18 distinct thread colors with organic fill patterns.",
    stitches: "78,000",
    thread: "Multi-Tonal Poly"
  }
};

function initPortfolio() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.portfolio-card');
  const modal = document.getElementById('lightboxModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  // Filter Logic
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.9)';
          setTimeout(() => { card.style.display = 'none'; }, 300);
        }
      });
    });
  });

  // Modal Open Logic
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-id');
      const data = portfolioData[id];
      const imgSrc = card.querySelector('img').src;

      if (data) {
        document.getElementById('modalImg').src = imgSrc;
        document.getElementById('modalTitle').textContent = data.title;
        document.getElementById('modalBadge').textContent = data.badge;
        document.getElementById('modalDesc').textContent = data.desc;
        document.getElementById('modalStitchCount').textContent = data.stitches;
        document.getElementById('modalThreadType').textContent = data.thread;

        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
      }
    });
  });

  // Modal Close Logic
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    }
  });
}

/* ------------------------------------------
   4. Interactive Instant Cost Estimator App
   ------------------------------------------ */
function initEstimator() {
  const garmentCards = document.querySelectorAll('[data-type="garment"]');
  const quantitySlider = document.getElementById('quantitySlider');
  const qtyDisplay = document.getElementById('qtyDisplay');
  const locCheckboxes = document.querySelectorAll('.loc-check');
  const complexitySelect = document.getElementById('complexitySelect');

  // Summary Elements
  const summaryGarment = document.getElementById('summaryGarment');
  const summaryQty = document.getElementById('summaryQty');
  const summaryUnitPrice = document.getElementById('summaryUnitPrice');
  const summaryTurnaround = document.getElementById('summaryTurnaround');
  const summaryTotal = document.getElementById('summaryTotal');

  let state = {
    basePrice: 6.50,
    garmentName: 'T-Shirts',
    quantity: 25,
    placementsCost: 2.50,
    complexityFactor: 1.4
  };

  // Garment Selection
  garmentCards.forEach(card => {
    card.addEventListener('click', () => {
      garmentCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      state.basePrice = parseFloat(card.getAttribute('data-base'));
      state.garmentName = card.querySelector('.opt-title').textContent;
      calculateEstimate();
    });
  });

  // Quantity Slider Update
  quantitySlider.addEventListener('input', (e) => {
    state.quantity = parseInt(e.target.value);
    qtyDisplay.textContent = `${state.quantity} Units`;
    calculateEstimate();
  });

  // Checkbox Selection
  locCheckboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      calculatePlacements();
      calculateEstimate();
    });
  });

  function calculatePlacements() {
    let cost = 0;
    locCheckboxes.forEach(cb => {
      if (cb.checked) {
        cost += parseFloat(cb.getAttribute('data-cost'));
      }
    });
    state.placementsCost = cost;
  }

  // Complexity Select
  complexitySelect.addEventListener('change', (e) => {
    const selectedOpt = e.target.options[e.target.selectedIndex];
    state.complexityFactor = parseFloat(selectedOpt.getAttribute('data-factor'));
    calculateEstimate();
  });

  // Calculation Engine
  function calculateEstimate() {
    // Quantity Tier Discount Calculation
    let qtyDiscountMultiplier = 1.0;
    if (state.quantity >= 250) {
      qtyDiscountMultiplier = 0.65; // 35% off
    } else if (state.quantity >= 100) {
      qtyDiscountMultiplier = 0.75; // 25% off
    } else if (state.quantity >= 50) {
      qtyDiscountMultiplier = 0.85; // 15% off
    } else if (state.quantity >= 25) {
      qtyDiscountMultiplier = 0.95; // 5% off
    }

    // Unit Cost Formula
    const unitStitchCost = state.placementsCost * state.complexityFactor;
    const rawUnitPrice = (state.basePrice + unitStitchCost) * qtyDiscountMultiplier;
    const finalUnitPrice = Math.max(rawUnitPrice, 3.50); // Floor base cost
    const totalEstimate = finalUnitPrice * state.quantity;

    // Turnaround Estimation
    let turnaround = "5 - 7 Business Days";
    if (state.quantity > 200) {
      turnaround = "10 - 14 Business Days";
    } else if (state.quantity > 50) {
      turnaround = "7 - 9 Business Days";
    }

    // Update UI DOM
    summaryGarment.textContent = state.garmentName;
    summaryQty.textContent = `${state.quantity} Units`;
    summaryUnitPrice.textContent = `$${finalUnitPrice.toFixed(2)}`;
    summaryTurnaround.textContent = turnaround;
    summaryTotal.textContent = `$${totalEstimate.toFixed(2)}`;
  }

  // Initial Calculation Run
  calculatePlacements();
  calculateEstimate();

  // Redirect to Quote Form with pre-filled details
  const openQuoteModalBtn = document.getElementById('openQuoteModalBtn');
  if (openQuoteModalBtn) {
    openQuoteModalBtn.addEventListener('click', () => {
      const contactSection = document.getElementById('contact');
      const notesField = document.getElementById('projectNotes');
      
      const summaryText = `[AUTOMATED ESTIMATE SUMMARY]\nItem: ${state.garmentName}\nQuantity: ${state.quantity}\nEst. Unit Price: ${summaryUnitPrice.textContent}\nEst. Total: ${summaryTotal.textContent}\nTurnaround: ${summaryTurnaround.textContent}\n-------------------------------\nAdditional details: `;
      
      notesField.value = summaryText;
      contactSection.scrollIntoView({ behavior: 'smooth' });
    });
  }
}

/* ------------------------------------------
   5. Testimonial Smooth Carousel
   ------------------------------------------ */
function initTestimonials() {
  const track = document.getElementById('testimonialTrack');
  const dots = document.querySelectorAll('.dot');
  let currentIndex = 0;
  const totalSlides = dots.length;

  function goToSlide(index) {
    currentIndex = index;
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach(d => d.classList.remove('active'));
    dots[index].classList.add('active');
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.getAttribute('data-index'));
      goToSlide(index);
    });
  });

  // Auto Rotation
  setInterval(() => {
    currentIndex = (currentIndex + 1) % totalSlides;
    goToSlide(currentIndex);
  }, 6000);
}

/* ------------------------------------------
   6. Drag & Drop File Upload Mockup
   ------------------------------------------ */
function initFileDropzone() {
  const dropzone = document.getElementById('dropzone');
  const fileInput = document.getElementById('fileInput');
  const fileList = document.getElementById('fileList');

  if (!dropzone || !fileInput) return;

  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropzone.addEventListener(eventName, preventDefaults, false);
  });

  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  ['dragenter', 'dragover'].forEach(eventName => {
    dropzone.addEventListener(eventName, () => dropzone.classList.add('drag-over'), false);
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropzone.addEventListener(eventName, () => dropzone.classList.remove('drag-over'), false);
  });

  dropzone.addEventListener('drop', handleDrop, false);

  function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    handleFiles(files);
  }

  fileInput.addEventListener('change', (e) => {
    handleFiles(e.target.files);
  });

  function handleFiles(files) {
    fileList.innerHTML = '';
    const fileArray = Array.from(files);
    fileArray.forEach(file => {
      const item = document.createElement('div');
      item.innerHTML = `<i class="fa-solid fa-file-code"></i> ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`;
      fileList.appendChild(item);
    });
  }
}

/* ------------------------------------------
   7. Form Submission Handling
   ------------------------------------------ */
function initForms() {
  const contactForm = document.getElementById('mainContactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const origText = submitBtn.innerHTML;

      submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Processing Request...`;
      submitBtn.disabled = true;

      setTimeout(() => {
        alert('Thank you! Your embroidery project request has been transmitted. Our lead digitizer will review your specs and reach out within 24 hours.');
        contactForm.reset();
        document.getElementById('fileList').innerHTML = '';
        submitBtn.innerHTML = origText;
        submitBtn.disabled = false;
      }, 1800);
    });
  }
}
