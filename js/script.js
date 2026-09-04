gsap.registerPlugin(ScrollTrigger);

/*========================================HERO ANIMATION========================================*/

gsap.from(".hero-content > *", {
  opacity: 0,

  y: 40,

  duration: 1.2,

  stagger: 0.15,

  ease: "power3.out",
});

/*========================================HERO ORB========================================*/

gsap.to(".hero-orb", {
  scale: 1.4,

  opacity: 0.5,

  duration: 4,

  repeat: -1,

  yoyo: true,

  ease: "sine.inOut",
});

/*========================================SECTION REVEALS========================================*/

document.querySelectorAll(".reveal").forEach((section) => {
  const elements = section.querySelectorAll(
    ".eyebrow, .date, h2, h3, p, .photo, .timeline, .memory-card, .stats"
  );

  gsap.from(elements, {
    opacity: 0,

    y: 45,

    duration: 1,

    stagger: 0.08,

    ease: "power3.out",

    scrollTrigger: {
      trigger: section,

      start: "top 75%",

      toggleActions: "play none none reverse",
    },
  });
});

/*========================================TIMELINE LINE========================================*/

document.querySelectorAll(".timeline").forEach((timeline) => {
  gsap.fromTo(
    timeline,

    {
      "--line-progress": "0%",
    },

    {
      "--line-progress": "100%",

      scrollTrigger: {
        trigger: timeline,

        start: "top 70%",

        end: "bottom 60%",

        scrub: true,
      },
    }
  );
});

/*========================================IMAGE PARALLAX========================================*/

document.querySelectorAll(".photo").forEach((photo) => {
  gsap.to(photo, {
    y: -15,

    scrollTrigger: {
      trigger: photo,

      start: "top bottom",

      end: "bottom top",

      scrub: true,
    },
  });
});

/*========================================FINAL HEART========================================*/

gsap.from(".final-heart", {
  scale: 0,

  rotation: -20,

  scrollTrigger: {
    trigger: ".final-heart",

    start: "top 80%",

    toggleActions: "play none none reverse",
  },

  duration: 1.2,

  ease: "elastic.out(1,0.5)",
});

/*========================================CONFETTI========================================*/

function createConfetti() {
  const symbols = ["✦", "♡", "✧", "•", "✿", "⋆"];
  const count = 55;

  const fragment = document.createDocumentFragment();
  const pieces = [];

  for (let i = 0; i < count; i++) {
    const piece = document.createElement("div");

    piece.className = "confetti";
    piece.textContent = gsap.utils.random(symbols);

    // Start position
    const startX = gsap.utils.random(0, window.innerWidth);
    const startY = gsap.utils.random(-80, -10);

    piece.style.left = `${startX}px`;
    piece.style.top = `${startY}px`;
    piece.style.fontSize = `${gsap.utils.random(10, 24)}px`;
    piece.style.color = `hsl(${gsap.utils.random(320, 350)}, 75%, 75%)`;

    fragment.appendChild(piece);
    pieces.push(piece);
  }

  // Add everything to DOM at once
  document.body.appendChild(fragment);

  pieces.forEach((piece) => {
    const fallDistance = window.innerHeight + 150;

    gsap.fromTo(
      piece,
      {
        y: 0,
        x: 0,
        rotation: gsap.utils.random(-30, 30),
        rotationX: gsap.utils.random(-90, 90),
        rotationY: gsap.utils.random(-90, 90),
        scale: gsap.utils.random(0.7, 1.3),
        opacity: 0,
      },
      {
        y: fallDistance,
        x: gsap.utils.random(-250, 250),
        rotation: gsap.utils.random(-720, 720),
        rotationX: gsap.utils.random(-720, 720),
        rotationY: gsap.utils.random(-720, 720),
        scale: gsap.utils.random(0.8, 1.2),
        opacity: 1,
        duration: gsap.utils.random(4.5, 7),
        ease: "none",

        onComplete: () => {
          piece.remove();
        },
      }
    );

    // Small fade near the end
    gsap.to(piece, {
      opacity: 0,
      delay: gsap.utils.random(3.5, 5),
      duration: 1.5,
      ease: "power1.out",
    });
  });
}

/* =================================BIRTHDAY COUNTDOWN================================= */

// DON'T FORGET TO CHANGE DATE
const birthday = new Date("2026-09-07T00:00:00+05:30").getTime();

const storyContent = document.getElementById("story-content");
const countdown = document.getElementById("countdown");

let celebrationStarted = false;

// Initially hide the story
gsap.set(storyContent, {
  autoAlpha: 0,
  display: "none",
  y: 40,
  scale: 0.98,
});

const countdownTimer = setInterval(updateCountdown, 1000);

updateCountdown();

function updateCountdown() {
  const now = new Date().getTime();
  const difference = birthday - now;

  /* ---------------------------------BIRTHDAY HASN'T ARRIVED--------------------------------- */

  if (difference > 0) {
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );

    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = String(days).padStart(2, "0");

    document.getElementById("hours").textContent = String(hours).padStart(
      2,
      "0"
    );

    document.getElementById("minutes").textContent = String(minutes).padStart(
      2,
      "0"
    );

    document.getElementById("seconds").textContent = String(seconds).padStart(
      2,
      "0"
    );
  } else if (!celebrationStarted) {
    /* ---------------------------------BIRTHDAY HAS ARRIVED --------------------------------- */
    celebrationStarted = true;

    // Stop checking the timer
    clearInterval(countdownTimer);

    startBirthdayCelebration();
  }
}

/* =================================BIRTHDAY CELEBRATION================================= */

function startBirthdayCelebration() {
  // Create a master timeline
  const tl = gsap.timeline();

  /* ---------------------------------1. COUNTDOWN EXIT--------------------------------- */

  if (countdown) {
    tl.to(countdown, {
      opacity: 0,
      scale: 0.85,
      y: -40,
      duration: 1,
      ease: "power3.in",
    });

    tl.set(countdown, {
      display: "none",
    });
  }

  /* ---------------------------------2. CONFETTI --------------------------------- */

  tl.call(() => {
    createConfetti();
  });

  /* ---------------------------------3. STORY REVEAL--------------------------------- */

  tl.set(storyContent, {
    display: "block",
  });

  tl.fromTo(
    storyContent,

    {
      autoAlpha: 0,
      y: 60,
      scale: 0.96,
    },

    {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: 1.4,
      ease: "power3.out",
    }
  );

  /* ---------------------------------4. LITTLE EXTRA POP --------------------------------- */

  // Refresh ScrollTrigger after story becomes visible
  tl.call(() => {
    ScrollTrigger.refresh();
  });
}

/* =================================START COUNTDOWN================================= */

gsap.from(".memory-photo", {
  opacity: 0,
  y: -80,
  rotation: -8,
  scale: 0.8,
  duration: 1.2,
  ease: "back.out(1.5)",
  scrollTrigger: {
    trigger: ".memory-photo",
    start: "top 80%",
    toggleActions: "play none none reverse",
  },
});

// FLAOTING ANIMATIONS

const decorationContainer = document.querySelector(".floating-decorations");

const decorations = [
  "💌",
  "💗",
  "💕",
  "💖",
  "✨",
  "💫",
  "🌸",
  "🪽",
  "🍬",
  "🥂",
];

function createDecoration() {
  const item = document.createElement("span");

  item.className = "floating-item";
  item.textContent =
    decorations[Math.floor(Math.random() * decorations.length)];

  item.style.left = Math.random() * 100 + "vw";
  item.style.fontSize = 18 + Math.random() * 22 + "px";

  item.style.setProperty("--drift", `${-100 + Math.random() * 200}px`);

  item.style.setProperty("--rotation", `${-30 + Math.random() * 60}deg`);

  const duration = 6 + Math.random() * 5;

  item.style.animationDuration = `${duration}s`;

  decorationContainer.appendChild(item);

  setTimeout(() => {
    item.remove();
  }, duration * 1000);
}

setInterval(createDecoration, 700);

gsap.registerPlugin(ScrollTrigger);

const videoSection = document.querySelector(".video-section");

const videoTl = gsap.timeline({
  scrollTrigger: {
    trigger: videoSection,
    start: "top 75%",
    toggleActions: "play none none reverse",
  },
});

/* Intro */

videoTl.from(".video-intro .eyebrow", {
  y: 20,
  opacity: 0,
  duration: 0.5,
});

videoTl.from(".video-intro h2", {
  y: 40,
  opacity: 0,
  duration: 0.7,
  ease: "power3.out",
});

videoTl.from(".video-intro-text", {
  y: 25,
  opacity: 0,
  duration: 0.6,
});

/* Movie card */

videoTl.from(".movie-container", {
  y: 100,
  scale: 0.85,
  rotationX: 12,
  opacity: 0,
  duration: 1.2,
  ease: "power3.out",
});

/* Label */

videoTl.from(
  ".movie-label",
  {
    scale: 0,
    rotation: -10,
    opacity: 0,
    duration: 0.5,
    ease: "back.out(2)",
  },
  "-=0.6"
);

/* Caption */

videoTl.from(
  ".movie-caption",
  {
    y: 15,
    opacity: 0,
    duration: 0.5,
  },
  "-=0.3"
);

/* Ending */

videoTl.from(".video-ending", {
  y: 20,
  opacity: 0,
  duration: 0.5,
});
