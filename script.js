let studentName = "";
let selectedSubject = "";
let questions = [];
let currentQuestion = 0;
let score = 0;
let timeLeft = 300;
let timer;

/* SUBJECTS */
let subjects = {
    ICT: [
        {
            question: "What is troubleshooting?",
            options: [
                "Identifying and solving computer problems",
                "Buying a new computer",
                "Installing games",
                "Formatting a flash drive"
            ],
            answer: 0
        },
        {
            question: "What does CPU stand for?",
            options: [
                "Central Process Unit",
                "Central Processing Unit",
                "Computer Personal Unit",
                "Control Processing Unit"
            ],
            answer: 1
        }
    ],

    Mathematics: [
        {
            question: "What is 5 × 6?",
            options: ["11", "30", "56", "60"],
            answer: 1
        }
    ]
};


/* START EXAM */
function startExam() {
    let nameInput = document.getElementById("studentName").value.trim();
    let subjectInput = document.getElementById("subjectSelect").value;

    if (nameInput === "") {
        alert("Please enter your name.");
        return;
    }

    if (subjectInput === "") {
        alert("Please select a subject.");
        return;
    }

    studentName = nameInput;
    selectedSubject = subjectInput;
    questions = subjects[selectedSubject];

    currentQuestion = 0;
    score = 0;
    timeLeft = 300;

    document.getElementById("startScreen").style.display = "none";
    document.getElementById("examScreen").style.display = "block";

    showQuestion();
    startTimer();
}


/* SHOW QUESTION */
function showQuestion() {
    let q = questions[currentQuestion];
    let container = document.getElementById("questionContainer");

    container.innerHTML = `
        <h2>${currentQuestion + 1}. ${q.question}</h2>
        ${q.options.map((opt, index) =>
            `<button onclick="selectAnswer(${index})">${opt}</button>`
        ).join("")}
    `;
}


/* SELECT ANSWER */
function selectAnswer(index) {
    if (index === questions[currentQuestion].answer) {
        score++;
    }
}


/* NAVIGATION */
function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
    }
}


/* TIMER */
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;

        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        let timerElement = document.getElementById("timer");

        timerElement.innerText = "Time: " + minutes + ":" + seconds;

        if (timeLeft <= 60) {
            timerElement.style.color = "red";
        }

        if (timeLeft <= 10) {
            timerElement.classList.add("flash");
        }

        if (timeLeft <= 0) {
            clearInterval(timer);
            submitExam();
        }

    }, 1000);
}


/* SUBMIT */
function submitExam() {
    clearInterval(timer);

    document.getElementById("examScreen").style.display = "none";
    document.getElementById("resultScreen").style.display = "block";

    document.getElementById("score").innerHTML =
        "Candidate: <strong>" + studentName + "</strong><br>" +
        "Subject: <strong>" + selectedSubject + "</strong><br><br>" +
        "Score: " + score + " / " + questions.length;
}