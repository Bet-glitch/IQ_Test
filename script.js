const questionSets = {
    outstanding: [
        {
            question:"Who wrote Half Of A Yellow sun?",
            choices: ["Wole Soyinka", "Chimamanda Adichie", "Fela Kuti", "Tayo Akinwure"],
            answer: "Chimamanda Adichie"
        },
        {
            question: "Which element has the atomic number 1?",
            choices: ["Oxygen", "Hydrogen", "Helium", "Carbon"],
            answer: "Hydrogen"
        },
        {
            question: "What is the capital city of Nigeria?",
            choices: ["Lagos", "Abuja", "Ondo", "Lokoja"],
            answer: "Abuja"
        },
        {
            question: "What is the derivative of x^2?",
            choices: ["x", "2x", "x^2", "2x^2"],
            answer: "2x"
        },
        {
            question: "Who developed the theory of relativity?",
            choices: ["Isaac Newton", "Albert Einstein", "Niels Bohr", "Galileo Galilei"],
            answer: "Albert Einstein"
        }
    ],
    good: [
        {
            question: "What is the largest ocean on Earth?",
            choices: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
            answer: "Pacific Ocean"
        },
        {
            question: "Who wrote '1984'?",
            choices: ["J.K Rowling", "Aldous Huxley", "George Orwell", "Ernest Hemingway"],
            answer: "George Orwell"
        },
        {
            question: "What is the speed of light in a vacuum?",
            choices: ["1,000,000 km/s", "150,000 km/s", "500,000 km/s", "300,000 km/s"],
            answer: "300,000 km/s"
        },
        {
            question: "In what year did the Titanic sink?",
            choices: ["1912", "1905", "1898", "1923"],
            answer: "1912"
        },
        {
            question: "What is the chemical symbol for water?",
            choices: ["NaCl", "CO2", "H2O", "O2"],
            answer: "H2O"
        }
    ],
    average: [
        {
            question: "What is 10 + 5?",
            choices: ["12", "15", "20", "25"],
            answer: "15"
        },
        {
            question: "Which planet is closest to the sun?",
            choices: ["Mercury", "Venus", "Earth", "Mars"],
            answer: "Mercury"
        },
        {
            question: "Who discorvered the gravity?",
            choices: ["Bobrisky", "Nelson Mandela", "Isaac Newton", "Neil Armstrong"],
            answer: "Isaac Newton"
        },
        {
            question: "Who was the 16th President of the United States?",
            choices: ["George Washington ", "Abraham Lincon", "Thomas Jefferson", "John Adams"],
            answer: "Abraham Lincoln"
        },
        {
            question: "When did Nigeria Civil War begin",
            choices: ["2012","1960","1967","1999"],
            answer: "1967"
        }
    ]
};

const encouragingQuotes = {
    outstanding: "Fantastic job! Keep up the amazing work!",
    good: "Well done! You're doing great, keep pushing!",
    average: "Good effort! Keep practicing and you'll improve!",
};

let currentQuestionIndex = 0;
let score = 0;
let currentQuestions = [];
let difficultyLevel = '';

function showHomePage() {
    document.getElementById('home').style.display = 'block';
    document.getElementById('instructions').style.display = 'none';
    document.getElementById('selectLevel').style.display = 'none';
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('result').style.display = 'none';
}

function showInstructions() {
    document.getElementById('home').style.display = 'none';
    document.getElementById('instructions').style.display = 'block';
    document.getElementById('selectLevel').style.display = 'none';
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('result').style.display = 'none';
}

function showLevelSelection() {
    document.getElementById('home').style.display = 'none';
    document.getElementById('instructions').style.display = 'none';
    document.getElementById('selectLevel').style.display = 'block';
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('result').style.display = 'none';
}

function showQuestion() {
    const questionContainer = document.getElementById('quiz');
    const question = currentQuestions[currentQuestionIndex];
    
    questionContainer.innerHTML = `
        <h2>${question.question}</h2>
        ${question.choices.map((choice, index) => `
            <button class="btn choice">${choice}</button>
        `).join('')}
    `;

    document.querySelectorAll('.choice').forEach(button => {
        button.addEventListener('click', () => {
            if (button.textContent === question.answer) {
                score++;
            }
            currentQuestionIndex++;
            if (currentQuestionIndex < currentQuestions.length) {
                showQuestion();
            } else {
                showResult();
            }
        });
    });
}

function showResult() {
    document.getElementById('quiz').style.display = 'none';
    const resultContainer = document.getElementById('result');
    
    let resultMessage = `You scored ${score} out of ${currentQuestions.length}. `;
    if (score === currentQuestions.length) {
        resultMessage += `Congratulations! ${encouragingQuotes[difficultyLevel]}`;
    } else {
        resultMessage += "Nice try! Keep practicing!";
    }

    document.getElementById('feedback').innerHTML = resultMessage;
    resultContainer.style.display = 'block';
}

document.getElementById('startQuiz').addEventListener('click', showLevelSelection);
document.getElementById('viewInstructions').addEventListener('click', showInstructions);
document.getElementById('backHome').addEventListener('click', showHomePage);

document.querySelectorAll('#selectLevel .btn').forEach(button => {
    button.addEventListener('click', () => {
        difficultyLevel = button.getAttribute('data-level');
        document.getElementById('selectLevel').style.display = 'none';
        document.getElementById('quiz').style.display = 'block';
        currentQuestions = questionSets[difficultyLevel]; // Load questions based on selected level
        currentQuestionIndex = 0;
        score = 0;
        showQuestion();
    });
});

document.getElementById('restart').addEventListener('click', showHomePage);

// Initial call to show the home page
showHomePage();





