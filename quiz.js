const questions = [
    {
        question:"Who was the first American president?",
        answers:[
            {text:"George Washington", correct:'true'},
            {text:"Barack Obama", correct:'false'},
            {text:"John Adams", correct:'false'},
            {text:"John Tyler", correct:'false'}
        ]
    },
    {
        question:"How many countries are in Africa?",
        answers:[
            {text:"55", correct:'false'},
            {text:"52", correct:'false'},
            {text:"60", correct:'false'},
            {text:"54", correct:'true'}
        ]
    },
    {
        question:"In what year was Islam established?",
        answers:[
            {text:"611", correct:'false'},
            {text:"617", correct:'false'},
            {text:"610", correct:'true'},
            {text:"615", correct:'false'}
        ]
    },
    {
        question:"What is the difference between game and gamification?",
        answers:[
            {text:"a game is a normal game, and gamification is an app that represent the functionality of games", correct:'false'},
            {text:"a game is a normal game, and gamification is the process of making a game", correct:'false'},
            {text:"something else", correct:'true'},
            {text:"there is no difference", correct:'false'}
        ]
    },
    {
        question:"Which city is considered the birthplace of the Renaissance?",
        answers:[
            {text:"Venice", correct:'false'},
            {text:"Florence", correct:'true'},
            {text:"Rome", correct:'false'},
            {text:"Milan", correct:'false'}
        ]
    },
    {
        question:"What is the name of the genre characterized by its origins in the African American communities of New Orleans, Louisiana, and is often associated with brass and percussion instruments?"
        ,
        answers:[
            {text:"pop", correct:'false'},
            {text:"rock n roll", correct:'false'},
            {text:"jazz", correct:'true'},
            {text:"hiphop", correct:'false'}
        ]
    }
];

        const questionElement = document.getElementById("question");
        const answerButtons = document.getElementById("answer-buttons");
        const nextButton = document.getElementById("next-btn");
        const timeCounter=document.getElementById("timer")
        var timer;
        var ele =document.getElementById("timer");
        let sec=29;

        let currentQuestionIndex = 0;
        let score = 0;
        function randomDelay() {
            const randomTime = Math.floor(Math.random() * (25 - 5 + 1)) + 5;
            console.log(`Random time: ${randomTime} seconds`);   
            setTimeout(function () {
              openPopup();
            }, randomTime * 1000);
          }
          function openPopup() {
            const randomPosition = (Math.random() < 0.5)
              ? Math.floor(Math.random() * (20 - 5 + 1)) + 1
              : Math.floor(Math.random() * (95 - 75 + 1)) + 75;  
            document.getElementById('popup').style.display = 'block';
            document.getElementById("popup").style.top = randomPosition + "%";
            document.getElementById("popup").style.left = randomPosition + "%";
            setTimeout(closePopup, 2000);
          }
          function closePopup() {
            document.getElementById('popup').style.display = 'none';
          }     
        randomDelay(openPopup);
        function addtime(){
            sec+=5;
            document.getElementById('popup').style.display = 'none';
        }
        function startQuiz() {
            currentQuestionIndex = 0;
            score = 0;
            nextButton.innerHTML = "Next";
            showQuestion();
        }

        function showQuestion() {
            randomDelay();
            resetState();
            handleTimer();
            let currentQuestion = questions[currentQuestionIndex];
            let questionNo = currentQuestionIndex + 1;
            questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
            currentQuestion.answers.forEach(answer => {
                const button = document.createElement("button");
                button.innerHTML = answer.text;
                button.classList.add("btn");
                answerButtons.appendChild(button);
                if (answer.correct) {
                    button.dataset.correct = answer.correct;
                }
                button.addEventListener("click", selectAnswer);
            });
        }
        function resetState() {
            nextButton.style.display="none";
            while (answerButtons.firstChild) {
                answerButtons.removeChild(answerButtons.firstChild)
            }
        }
        function selectAnswer(e) {
            closePopup();
            const selectedBtn = e.target;
            const isCorrect = selectedBtn.dataset.correct === "true";
            if(isCorrect){
                selectedBtn.classList.add("correct");
                score++;
            }else{
                selectedBtn.classList.add("incorrect");
            }
            Array.from(answerButtons.children).forEach(button => {
                if(button.dataset.correct === "true"){
                    button.classList.add("correct");
                }
                button.disabled="true"
            });
            clearInterval(timer);
            nextButton.style.display="block";
        }
        function showScore() {
            closePopup();
            resetState();
            timeCounter.innerHTML=""
            questionElement.innerHTML = `you scored ${score} out of ${questions.length}!`
            nextButton.innerHTML = "play again"
            nextButton.style.display = "block"
            
        }
        
        function handleTimer() {
            sec = 29;
            ele.innerHTML ='time left: '+ (sec+1)
            timer = setInterval( ()=> {
                if(sec>=0){
                ele.innerHTML ='time left: '+ sec; 
                }
                if (sec==0){
                    Array.from(answerButtons.children).forEach(button => {
                        if(button.dataset.correct === "true"){
                            button.classList.add("correct");
                        }
                        button.disabled="true"
                    });
                    nextButton.style.display="block";
                }
                sec=sec-1; 
            },1000)
        }
        function handleNextButton() {
            clearInterval(timer);
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                timeCounter.innerHTML = "30";
                showQuestion();
            } else {
                showScore();
            }
        }
        nextButton.addEventListener("click",() =>{
            if(currentQuestionIndex < questions.length){
                handleNextButton();
            }else{
                startQuiz();
            }
        })
        startQuiz();
