// =====================================
// 1. COLOR PLAYGROUND
// =====================================

const palettes = [
  ["#6C4CF1", "#FF875B", "#FFD166", "#F7F3EA", "#24212D"],
  ["#143D59", "#1D7A8C", "#BFDBF7", "#F1FAEE", "#FF6B6B"],
  ["#386641", "#6A994E", "#A7C957", "#F2E8CF", "#BC4749"],
  ["#FF70A6", "#FF9770", "#FFD670", "#70D6FF", "#6C4CF1"],
  ["#4F359B", "#7353BA", "#A78BFA", "#DDD6FE", "#FFF7ED"]
];

const paletteElement = document.getElementById("palette");
const generateButton = document.getElementById("generateColor");

function generatePalette() {
  const randomIndex = Math.floor(
    Math.random() * palettes.length
  );

  const selectedPalette = palettes[randomIndex];

  paletteElement.innerHTML = "";

  selectedPalette.forEach(function(color) {
    const swatch = document.createElement("div");

    swatch.className = "swatch";
    swatch.style.backgroundColor = color;
    swatch.textContent = color;

    // Warna teks agar kode tetap terbaca
    if (color === "#F7F3EA" || color === "#FFF7ED") {
      swatch.style.color = "#24212D";
      swatch.style.textShadow = "none";
    }

    // Klik swatch untuk menyalin kode warna
    swatch.title = "Klik untuk menyalin " + color;

    swatch.addEventListener("click", function() {
      copyColor(color);
    });

    paletteElement.appendChild(swatch);
  });
}

async function copyColor(color) {
  try {
    await navigator.clipboard.writeText(color);
    alert("Kode warna " + color + " berhasil disalin!");
  } catch (error) {
    // Alternatif untuk browser yang membatasi clipboard
    prompt("Salin kode warna berikut:", color);
  }
}

generateButton.addEventListener("click", generatePalette);


// =====================================
// 2. DKV QUIZ
// =====================================

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const feedbackElement = document.getElementById("quizFeedback");
const scoreElement = document.getElementById("score");
const nextButton = document.getElementById("nextQuestion");

const quizQuestions = [
  {
    question: "Apa tujuan utama hierarki visual?",
    answers: [
      "Membuat semua elemen sama besar",
      "Mengatur urutan perhatian audiens",
      "Menggunakan sebanyak mungkin warna",
      "Menghilangkan ruang kosong"
    ],
    correct: 1,
    explanation: "Hierarki visual membantu audiens mengetahui informasi yang paling penting."
  },
  {
    question: "Apa fungsi kontras dalam desain?",
    answers: [
      "Membuat semua elemen sama",
      "Menghilangkan judul",
      "Menonjolkan perbedaan dan informasi penting",
      "Membuat desain tanpa warna"
    ],
    correct: 2,
    explanation: "Kontras bisa dibuat melalui perbedaan warna, ukuran, atau ketebalan."
  },
  {
    question: "Apa yang dimaksud dengan tipografi?",
    answers: [
      "Seni dan pengaturan huruf",
      "Teknik memotret",
      "Teknik menggambar perspektif",
      "Cara mengedit suara"
    ],
    correct: 0,
    explanation: "Tipografi membahas pemilihan dan pengaturan huruf dalam komunikasi visual."
  },
  {
    question: "Apa fungsi alignment?",
    answers: [
      "Membuat teks selalu miring",
      "Menambahkan banyak warna",
      "Memperbesar semua gambar",
      "Membuat elemen teratur dan sejajar"
    ],
    correct: 3,
    explanation: "Alignment membantu menciptakan keteraturan dalam layout."
  },
  {
    question: "Apa arti repetisi dalam prinsip desain?",
    answers: [
      "Menghapus elemen desain",
      "Mengulang elemen untuk menciptakan konsistensi",
      "Membuat semua objek berbeda",
      "Memusatkan seluruh teks"
    ],
    correct: 1,
    explanation: "Repetisi mengulang elemen visual untuk membangun konsistensi."
  }
];

let currentQuestion = 0;
let score = 0;
let hasAnswered = false;

function showQuestion() {
  const item = quizQuestions[currentQuestion];

  questionElement.textContent = item.question;
  answersElement.innerHTML = "";
  feedbackElement.textContent = "";
  nextButton.disabled = true;
  hasAnswered = false;

  item.answers.forEach(function(answer, index) {
    const button = document.createElement("button");

    button.className = "answer";
    button.textContent = answer;

    button.addEventListener("click", function() {
      checkAnswer(index, button);
    });

    answersElement.appendChild(button);
  });

  nextButton.textContent =
    currentQuestion === quizQuestions.length - 1
      ? "Lihat Hasil"
      : "Pertanyaan Berikutnya →";
}

function checkAnswer(selectedIndex, selectedButton) {
  if (hasAnswered) return;

  hasAnswered = true;

  const item = quizQuestions[currentQuestion];
  const answerButtons = answersElement.querySelectorAll("button");

  answerButtons.forEach(function(button) {
    button.disabled = true;
  });

  if (selectedIndex === item.correct) {
    score++;
    selectedButton.classList.add("correct");
    feedbackElement.textContent = "Benar! " + item.explanation;
    feedbackElement.style.color = "#2f7b3d";
  } else {
    selectedButton.classList.add("wrong");
    answerButtons[item.correct].classList.add("correct");
    feedbackElement.textContent = "Belum tepat. " + item.explanation;
    feedbackElement.style.color = "#a34d31";
  }

  scoreElement.textContent = "Skor: " + score;
  nextButton.disabled = false;
}

nextButton.addEventListener("click", function() {
  if (!hasAnswered) return;

  currentQuestion++;

  if (currentQuestion < quizQuestions.length) {
    showQuestion();
  } else {
    questionElement.textContent = "Kuis selesai! 🎉";
    answersElement.innerHTML = "";

    const percentage = Math.round(
      (score / quizQuestions.length) * 100
    );

    feedbackElement.textContent =
      "Nilai kamu: " + percentage + "/100. " +
      (percentage >= 80
        ? "Hebat! Kamu memahami dasar desain."
        : "Tetap semangat! Coba pelajari materi DKV lagi.");

    nextButton.textContent = "Ulangi Kuis";
    nextButton.disabled = false;

    // Setelah selesai, tombol digunakan untuk mengulang
    nextButton.onclick = function() {
      currentQuestion = 0;
      score = 0;
      scoreElement.textContent = "Skor: 0";
      nextButton.onclick = null;
      nextButton.addEventListener("click", handleNextQuestion);
      showQuestion();
    };
  }
});

// Handler utama tombol pertanyaan berikutnya
function handleNextQuestion() {
  if (!hasAnswered) return;

  currentQuestion++;

  if (currentQuestion < quizQuestions.length) {
    showQuestion();
  }
}


// =====================================
// 3. MINI POSTER STUDIO
// =====================================

const titleInput = document.getElementById("posterTitleInput");
const subtitleInput = document.getElementById("posterSubtitleInput");
const backgroundInput = document.getElementById("posterBg");
const textColorInput = document.getElementById("posterFg");

const posterPreview = document.getElementById("posterPreview");
const posterTitle = document.getElementById("posterTitle");
const posterSubtitle = document.getElementById("posterSubtitle");

function updatePoster() {
  posterTitle.textContent =
    titleInput.value || "JUDUL POSTER";

  posterSubtitle.textContent =
    subtitleInput.value || "Pesan pendukung poster";

  posterPreview.style.backgroundColor =
    backgroundInput.value;

  posterPreview.style.color =
    textColorInput.value;
}

titleInput.addEventListener("input", updatePoster);
subtitleInput.addEventListener("input", updatePoster);
backgroundInput.addEventListener("input", updatePoster);
textColorInput.addEventListener("input", updatePoster);


// =====================================
// 4. TAHUN OTOMATIS DI FOOTER
// =====================================

console.log("KreArt Lab berhasil dijalankan!");
