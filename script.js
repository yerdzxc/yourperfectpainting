const questions = [
    {
        question: "It’s a great day to visit the museum! You get your ticket and a map. Do you…",
        options: ["Carefully plan your route so you can see all the exhibits!", "Let your curiosity guide you through the museum!"],
        type: "J/P"
    },
    {
        question: "As you walk, you notice a guided tour about to start! What do you do?",
        options: ["Perfect timing! You join the tour and get excited to chat with the other visitors.", "Hmm, you think you’ll explore by yourself at your own pace!"],
        type: "E/I"
    },
    {
        question: "You get to the first exhibit, featuring both realistic paintings and abstract art. Which do you go to first?",
        options: ["The abstract art! You ponder the deeper meanings behind the pieces.", "The realistic paintings! The fine details and craftsmanship are awesome."],
        type: "N/S"
    },
    {
        question: "Each piece has a detailed description of the artist and their work. Do you…",
        options: ["Analyze the description and focus on the artist’s technique!", "Focus on your emotions as you look at the art!"],
        type: "T/F"
    },
    {
        question: "As you leave the first exhibit, you see a live art performance in the hall. What do you do?",
        options: ["You join the crowd. What a lively atmosphere!", "You watch the performance from a distance!"],
        type: "E/I"
    },
    {
        question: "You keep walking and find a new, temporary exhibit that wasn’t on the map. It seems pretty cool…",
        options: ["You adjust your plan to include this new exhibit. You can make it work!", "You dive into the new exhibit, excited to explore something unexpected."],
        type: "J/P"
    },
    {
        question: "This exhibit includes an interactive display. Do you…",
        options: ["Think about the conceptual possibilities of the display. It can represent so many ideas!", "Play with the different aspects of the display. It’s a sensory experience!"],
        type: "N/S"
    },
    {
        question: "Next, you enter a historical exhibit featuring artifacts from a big historical event. What do you do?",
        options: ["Analyze the historical context and facts. It’s cool to see how each artifact fits in the timeline!", "Reflect on the human stories behind each artifact. You wonder how they felt about it back then!"],
        type: "T/F"
    },
    {
        question: "The museum is offering a popular hands-on workshop at this exhibit. Do you join?",
        options: ["Yes! You’re excited to participate with everyone.", "No thanks! You’d rather continue exploring by yourself."],
        type: "E/I"
    },
    {
        question: "The next exhibit features some provocative art that challenges conventional ideas.",
        options: ["You wonder about the implications of the display. What’s the broader message here?", "You look at each piece closely, focusing on the details."],
        type: "N/S"
    },
    {
        question: "You’ve made it through all the exhibits. Time to purchase a souvenir at the gift shop!",
        options: ["You pick an item that will go perfectly with your home decor!", "You select an item that catches your eye. You’ll figure out what to do with it later!"],
        type: "J/P"
    },
    {
        question: "What a great day! What are you left thinking about?",
        options: ["The amazing art techniques and facts you learned!", "The art pieces that resonated with you emotionally!"],
        type: "T/F"
    },

];

let currentQuestionIndex = 0;
let selectedAnswer = null;
const resultCounts = {
    "E": 0,
    "I": 0,
    "N": 0,
    "S": 0,
    "T": 0,
    "F": 0,
    "J": 0,
    "P": 0
};

function showQuestion() {
    const questionContainer = document.getElementById('question-container');
    const question = questions[currentQuestionIndex];
    questionContainer.innerHTML = `
        <h2>${question.question}</h2>
        <div class="button-container">
            ${question.options.map((option, index) => `
                <button onclick="handleAnswer('${question.type}', ${index}, this)">
                    ${option}
                </button>
            `).join('')}
        </div>
    `;
}


function handleAnswer(type, index, button) {
    selectedAnswer = { type, index };

    // Clear previous selections
    const buttons = document.querySelectorAll('#question-container button');
    buttons.forEach(btn => btn.classList.remove('selected'));

    // Highlight the selected button
    button.classList.add('selected');
}

function handleNext() {
    if (selectedAnswer === null) {
        alert("Please select an answer before proceeding.");
        return;
    }

    // Update result counts based on the answer
    if (selectedAnswer.type === "E/I") {
        if (selectedAnswer.index === 0) {
            resultCounts["E"]++;
        } else {
            resultCounts["I"]++;
        }
    } else if (selectedAnswer.type === "N/S") {
        if (selectedAnswer.index === 0) {
            resultCounts["N"]++;
        } else {
            resultCounts["S"]++;
        }
    } else if (selectedAnswer.type === "T/F") {
        if (selectedAnswer.index === 0) {
            resultCounts["T"]++;
        } else {
            resultCounts["F"]++;
        }
    } else if (selectedAnswer.type === "J/P") {
        if (selectedAnswer.index === 0) {
            resultCounts["J"]++;
        } else {
            resultCounts["P"]++;
        }
    }

    // Reset selectedAnswer for the next question
    selectedAnswer = null;

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function calculateMBTI() {
    const result = 
        (resultCounts["E"] > resultCounts["I"] ? "E" : "I") +
        (resultCounts["N"] > resultCounts["S"] ? "N" : "S") +
        (resultCounts["T"] > resultCounts["F"] ? "T" : "F") +
        (resultCounts["J"] > resultCounts["P"] ? "J" : "P");

    return result;
}

function showResults() {
    const result = calculateMBTI();
    // Redirect to a result page based on the MBTI type
    window.location.href = `results.html?type=${result}`;
}

// Initially show the first question
showQuestion();

// Attach the next button to handleNext function
document.getElementById('next-btn').addEventListener('click', handleNext);

