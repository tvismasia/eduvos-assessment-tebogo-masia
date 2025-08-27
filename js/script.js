
/* -- CAROUSEL -- */

const track = document.querySelector('.carousel-track'); // the moving container
const cards = Array.from(document.querySelectorAll('.course-card')); // all course cards
const nextBtn = document.getElementById('next'); // right arrow
const prevBtn = document.getElementById('prev'); // left arrow

// Global variables to control slider
let visibleCards = 3;   // number of cards showing at once
let currentIndex = 0;   // position tracker
let cardWidth;          // width each card should take
let autoSlide;          // for autoplay interval

/* --- RESPONSIVE HANDLING --- */
function updateVisibleCards() {
  // Decide how many cards to show based on screen width
  if (window.innerWidth <= 600) visibleCards = 1;
  else if (window.innerWidth <= 992) visibleCards = 2;
  else visibleCards = 3;

  // Each card takes equal share of the track
  cardWidth = 100 / visibleCards;
  document.querySelectorAll('.course-card').forEach(card => {
    card.style.flex = `0 0 ${cardWidth}%`;
  });

  // Setup cloned cards for infinite loop effect
  setupClones();

  // Re-align to current index (no animation on resize)
  moveToIndex(currentIndex, false);
}

/* -- CLONING FOR LOOP EFFECT -- */
function setupClones() {
  // Clear track to reset (avoids duplicate clones)
  track.innerHTML = '';

  // Clone last 'visibleCards' cards and put them in front
  const lastClones = cards.slice(-visibleCards).map(c => c.cloneNode(true));
  lastClones.forEach(clone => track.appendChild(clone));

  // Add the original set of cards
  cards.forEach(card => track.appendChild(card));

  // Clone first 'visibleCards' cards and put them at the end
  const firstClones = cards.slice(0, visibleCards).map(c => c.cloneNode(true));
  firstClones.forEach(clone => track.appendChild(clone));

  // Start view at the first real card, not a clone
  currentIndex = visibleCards;
}

/* --- MOVEMENT FUNCTION --- */
function moveToIndex(index, animate = true) {
  const totalCards = cards.length + visibleCards * 2; // real + clones

  // Turn animation on/off
  track.style.transition = animate ? 'transform 0.5s ease' : 'none';

  // Shift the track by multiplying index with card width
  const translateX = -index * cardWidth;
  track.style.transform = `translateX(${translateX}%)`;

  // If we are at a clone, quickly jump back to the real card
  if (animate) {
    setTimeout(() => {
      if (index >= cards.length + visibleCards) {
        // jumped past the last real card and reset to first real card
        currentIndex = visibleCards;
        track.style.transition = 'none';
        track.style.transform = `translateX(${-currentIndex * cardWidth}%)`;
      } else if (index < visibleCards) {
        // jumped before the first real card and reset to last real card
        currentIndex = cards.length + visibleCards - 1;
        track.style.transition = 'none';
        track.style.transform = `translateX(${-currentIndex * cardWidth}%)`;
      }
    }, 500); // matches transition time
  }
}

/* --- MOVE NEXT/PREV --- */
function moveSlide(step) {
  currentIndex += step;       // update index
  moveToIndex(currentIndex, true); 
}

// Buttons click events to move to forward or back
nextBtn.addEventListener('click', () => moveSlide(1));
prevBtn.addEventListener('click', () => moveSlide(-1));

/* --- AUTOPLAY --- */
function startAutoSlide() { 
  autoSlide = setInterval(() => moveSlide(1), 5000); // every 5s
}
function stopAutoSlide() { clearInterval(autoSlide); }

// Pause autoplay when user hovers over carousel
track.addEventListener('mouseenter', stopAutoSlide);
track.addEventListener('mouseleave', startAutoSlide);

// Run carousel setup
updateVisibleCards();
startAutoSlide();
window.addEventListener('resize', updateVisibleCards);

/* -- FORM VALIDATION -- */
// Capture form submission
document.getElementById('applyForm').addEventListener('submit', function(e) {
  e.preventDefault(); // prevent reload

  // If HTML5 validation fails, show alert
  if (!this.checkValidity()) {
    alert("⚠️ Please fill in all required fields correctly.");
    return;
  }

  // If valid, show success message and clear form
  this.insertAdjacentHTML('afterend', '<p class="success">✅ Thank you, your application has been submitted!</p>');
  this.reset();
});

  // Smooth scroll behavior to course and apply section

  function smoothCourse(){
    document.getElementById('courses').scrollIntoView({behavior:'smooth'});
  }

  function smoothApply(){
    document.getElementById('apply').scrollIntoView({behavior:'smooth'});
  }
