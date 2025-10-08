const quizData = [
  {
    question: "HTML <div> itu ibarat apa?",
    options: [
      "Kotak kosong isi terserah",
      "Tempat nongkrong JS",
      "Button hack NASA",
      "Kulkas",
    ],
    answer: 0,
  },
  {
    question: "CSS position: absolute; tanpa parent relative =",
    options: [
      "Anak kost nyasar",
      "Nempel pojok browser",
      "Jadi flexbox",
      "Sticky note",
    ],
    answer: 1,
  },
  {
    question: "console.log(typeof NaN) hasilnya?",
    options: ['"number"', '"undefined"', '"NaN"', "Error merah gede"],
    answer: 0,
  },
  {
    question: "HTML <input type='password'> gunanya?",
    options: [
      "Sembunyiin rahasia",
      "Text jadi bintang ****",
      "Nyimpen password di server",
      "Meme generator",
    ],
    answer: 1,
  },
  {
    question: "JavaScript + CSS bisa bikin…",
    options: [
      "Website interaktif",
      "Excel 2.0",
      "Hack wifi tetangga",
      "Roti bakar",
    ],
    answer: 0,
  },
];

const memes = [
  "https://media.tenor.com/KY2R1ke6RYAAAAAe/kelas-king-squidward-vntz.png",
  "https://stickercommunity.com/uploads/main/25-08-2023-09-24-59b9adi-sticker6.webp",
  "https://images.tokopedia.net/img/cache/700/aphluv/1997/1/1/9171097d6111487d9a6f076048c7f004~.jpeg",
  "https://i.pinimg.com/236x/1b/3f/af/1b3fafb89efd91a46dbd7323347e5a6a.jpg",
  "https://png.pngtree.com/png-vector/20250623/ourmid/pngtree-cute-duck-meme-sticker-vector-illustration-png-image_16581842.png",
];

// deklarasiin anu

let currentQuestion = 0;
let score = 0;
let timer = 30;
let timerInterval;

// deklarasiin element woi

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const timerEl = document.getElementById("timer");
const resultEl = document.getElementById("result");

function loadQuestion() {
  if (currentQuestion >= quizData.length) {
    endQuiz();
    return;
  }

  const q = quizData[currentQuestion];

  questionEl.textContent = q.question;

  optionsEl.innerHTML = "";

  q.options.forEach((opt, i) => {
    const btn = document.createElement("div");
    btn.classList.add("option");
    btn.textContent = opt;
    btn.onclick = () => selectOption(i);
    optionsEl.appendChild(btn);
  });

  timer = 30;
  timerEl.textContent = `⏳ ${timer}`;
  clearInterval(timerInterval);
  timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  timer--;
  timerEl.textContent = `⏳ ${timer}`;
  if (timer <= 0) nextQuestion();
}

function selectOption(i) {
  const options = document.querySelectorAll(".option");
  const correctIndex = quizData[currentQuestion].answer;

  options.forEach((btn) => (btn.style.pointerEvents = "none"));

  if (i === correctIndex) {
    options[i].style.background = "rgba(0, 255, 0, 0.5)";
    options[i].style.borderColor = "lime";
    score++;
  } else {
    options[i].style.background = "rgba(255, 0, 0, 0.5)";
    options[i].style.borderColor = "red";
    options[correctIndex].style.background = "rgba(0, 255, 0, 0.5)";
    options[correctIndex].style.borderColor = "lime";
  }

  setTimeout(() => {
    nextQuestion();
  }, 800);
}

function nextQuestion() {
  clearInterval(timerInterval);
  currentQuestion++;
  loadQuestion();
}

function endQuiz() {
  clearInterval(timerInterval);
  questionEl.textContent = "";
  optionsEl.innerHTML = "";
  timerEl.textContent = "";
  const randomMeme = memes[Math.floor(Math.random() * memes.length)];
  resultEl.innerHTML = `
    🎉 Quiz Selesai!<br>
    Skor kamu: ${score} / ${quizData.length}<br>
    <img src="${randomMeme}" alt="meme">
  `;
}

loadQuestion();
