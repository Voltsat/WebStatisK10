const quizData = [
        {
          question: "HTML <div> itu ibarat apa?",
          options: [
            "Kotak kosong isi terserah 📦",
            "Tempat nongkrong JS 😎",
            "Button hack NASA 🛰️",
            "Kulkas ❄️",
          ],
          answer: 0,
        },
        {
          question: "CSS position: absolute; tanpa parent relative =",
          options: [
            "Anak kost nyasar 🏚️",
            "Nempel pojok browser",
            "Jadi flexbox",
            "Sticky note",
          ],
          answer: 0,
        },
        {
          question: "console.log(typeof NaN) hasilnya?",
          options: ['"number" 🤯', '"undefined"', '"NaN"', "Error merah gede"],
          answer: 0,
        },
        {
          question: "HTML <input type='password'> gunanya?",
          options: [
            "Sembunyiin rahasia 🕵️",
            "Text jadi bintang ****",
            "Nyimpen password di server 😬",
            "Meme generator",
          ],
          answer: 1,
        },
        {
          question: "JavaScript + CSS bisa bikin…",
          options: [
            "Website interaktif 🎮",
            "Excel 2.0",
            "Hack wifi tetangga 📶",
            "Roti bakar 🍞",
          ],
          answer: 0,
        },
      ];

      const memes = [
        "https://i.imgflip.com/30zz5g.jpg", // success kid
        "https://i.imgflip.com/26am.jpg", // y u no
        "https://i.imgflip.com/1bij.jpg", // distracted bf
        "https://i.imgflip.com/4/9ehk.jpg", // grumpy cat
        "https://i.imgflip.com/3vzej.jpg", // fry not sure
      ];

      let currentQuestion = 0;
      let score = 0;
      let timer = 10;
      let timerInterval;

      const quizEl = document.getElementById("quiz");
      const timerEl = document.getElementById("timer");
      const resultEl = document.getElementById("result");

      function loadQuestion() {
        if (currentQuestion >= quizData.length) {
          endQuiz();
          return;
        }
        const q = quizData[currentQuestion];
        quizEl.innerHTML = `
        <div class="question">${q.question}</div>
        ${q.options
          .map(
            (opt, i) =>
              `<div class="option" onclick="selectOption(${i})">${opt}</div>`
          )
          .join("")}
      `;
        timer = 10;
        timerEl.textContent = `⏳ ${timer}`;
        clearInterval(timerInterval);
        timerInterval = setInterval(updateTimer, 1000);
      }

      function updateTimer() {
        timer--;
        timerEl.textContent = `⏳ ${timer}`;
        if (timer <= 0) {
          nextQuestion();
        }
      }

      function selectOption(i) {
        if (i === quizData[currentQuestion].answer) {
          score++;
        }
        nextQuestion();
      }

      function nextQuestion() {
        clearInterval(timerInterval);
        currentQuestion++;
        loadQuestion();
      }

      function endQuiz() {
        quizEl.innerHTML = "";
        timerEl.innerHTML = "";
        const randomMeme = memes[Math.floor(Math.random() * memes.length)];
        resultEl.innerHTML = `
        🎉 Quiz Selesai! <br>
        Skor kamu: ${score} / ${quizData.length} <br>
        <img src="${randomMeme}" alt="meme">
      `;
      }

      loadQuestion();