// Button Cover
const btnOpen = document.getElementById("btnOpen");
const invContent = document.getElementById("content");
const music = document.getElementById("music");
const musicToggle = document.getElementById("musicToggle");

btnOpen.addEventListener("click", function () {
  invContent.classList.remove("hidden");
  music.play();
  music.muted = false;
  btnOpen.style.display = "none";
  AOS.refresh();
});

musicToggle.addEventListener("click", function () {
  if (music.paused) {
    music.play();
    musicToggle.innerHTML = '<img src="assets/pause.png" alt="Pause">';
  } else {
    music.pause();
    musicToggle.innerHTML = '<img src="assets/play-button.png" alt="Pause">';
  }
  setTimeout(() => {
    AOS.init();
  }, 100); // kasih jeda sedikit
});
1;

// Countdown
// Tentukan tanggal acara
const weddingDate = new Date("March 9, 2026 08:00:00").getTime();

const timer = setInterval(function () {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  // Hitung waktu tersisa
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Tampilkan di HTML
  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = hours;
  document.getElementById("minutes").innerText = minutes;
  document.getElementById("seconds").innerText = seconds;

  // Kalau sudah lewat
  if (distance < 0) {
    clearInterval(timer);
    document.getElementById("timer").innerHTML = "Acara sudah dimulai 🎉";
  }
}, 1000);

// Galeri
const modal = document.getElementById("galeriModal");
const modalImg = document.getElementById("previewImg");
const closeBtn = document.querySelector(".close");
const galeriImages = document.querySelectorAll(".galeri-img img");
const leftBtn = document.querySelector(".nav-button.left");
const rightBtn = document.querySelector(".nav-button.right");

let currentIndex = 0;
const images = Array.from(galeriImages).map((img) => img.src);

galeriImages.forEach((img, index) => {
  img.addEventListener("click", () => {
    currentIndex = index;
    showImage();
    modal.classList.remove("hidden");
  });
});

function showImage() {
  modalImg.src = images[currentIndex];
}

closeBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

leftBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage();
});

rightBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  showImage();
});

// Tutup modal kalau klik di luar gambar
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
});

// Rsvp
const form = document.getElementById("rsvpForm");
const results = document.getElementById("rsvpResults");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Ambil nilai input
  const nama = document.getElementById("nama").value.trim();
  const grup = document.getElementById("grup").value.trim();
  const kehadiran = document.getElementById("kehadiran").value;
  const komentar = document.getElementById("komentar").value.trim();

  // Validasi (basic)
  if (!nama || !grup || !kehadiran) {
    alert("Mohon isi semua kolom wajib.");
    return;
  }

  // Buat elemen kartu hasil RSVP
  const entry = document.createElement("div");
  entry.classList.add("rsvp-card");

  entry.innerHTML = `
      <h4>${nama} (${grup})</h4>
      <p><strong>Kehadiran:</strong> ${kehadiran}</p>
      <p><strong>Ucapan:</strong> ${komentar || "(Tidak ada ucapan)"}</p>
    `;

  // Masukkan ke container hasil
  results.appendChild(entry);

  // Reset form
  form.reset();
});
