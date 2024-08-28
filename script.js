const questionSets = {
    outstanding: [
        {
            question: "What is the value of π (pi) to 2 decimal places?",
            choices: ["3.14", "3.15", "3.16", "3.17"],
            answer: "3.14"
        },
        {
            question: "Which element has the atomic number 1?",
            choices: ["Oxygen", "Hydrogen", "Helium", "Carbon"],
            answer: "Hydrogen"
        },
        {
            question: "What is the capital city of Australia?",
            choices: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
            answer: "Canberra"
        },
        {
            question: "What is the derivative of x^2?",
            choices: ["2x", "x", "x^2", "2x^2"],
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
            choices: ["George Orwell", "Aldous Huxley", "J.K. Rowling", "Ernest Hemingway"],
            answer: "George Orwell"
        },
        {
            question: "What is the speed of light in a vacuum?",
            choices: ["300,000 km/s", "150,000 km/s", "500,000 km/s", "1,000,000 km/s"],
            answer: "300,000 km/s"
        },
        {
            question: "In what year did the Titanic sink?",
            choices: ["1912", "1905", "1898", "1923"],
            answer: "1912"
        },
        {
            question: "What is the chemical symbol for water?",
            choices: ["H2O", "CO2", "NaCl", "O2"],
            answer: "H2O"
        }
    ],
    average: [
        {
            question: "What is 10 + 5?",
            choices: ["15", "12", "20", "25"],
            answer: "15"
        },
        {
            question: "Which planet is closest to the sun?",
            choices: ["Mercury", "Venus", "Earth", "Mars"],
            answer: "Mercury"
        },
        {
            question: "What is the main ingredient in guacamole?",
            choices: ["Tomato", "Pepper", "Avocado", "Onion"],
            answer: "Avocado"
        },
        {
            question: "Who was the 16th President of the United States?",
            choices: ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "John Adams"],
            answer: "Abraham Lincoln"
        },
        {
            question: "What is the boiling point of water?",
            choices: ["100°C", "90°C", "110°C", "80°C"],
            answer: "100°C"
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





