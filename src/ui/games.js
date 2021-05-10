function keyClick(i) {
    // alert(question[0].solutionOption[i])
    for (var j = 0; j < secretCell.length; j++) {
        if (secretCell[j].value === '') {
            answerUser += question[questionNumber].solutionOption[i]
            secretCell[j].value = question[questionNumber].solutionOption[i]
            if (j === secretCell.length - 1) {
                if (answerUser == question[questionNumber].answer) {
                    alert('ВЫИГРЫШ')
                    let success = Math.floor((Math.random() * 100) + 1);
                    success < 61 && ++coin
                    ++rating
                    coinsElement.innerHTML = coin
                    ratingElement.innerHTML = rating
                    skipClick()
                } else {
                    alert('ПРОИГРЫШ')
                }
            }
            break
        }
    }
}

async function getQuestion() {
    question = await electronMain.getQuestion()
    renderQuestion()
}

function renderQuestion() {
    answerUser = ''
    fieldSecret.innerHTML = ''
    for (let char of question[questionNumber].answer) {
        fieldSecret.innerHTML += `
        <input
        type="text"
        class="secretSymbol secretCell"
        >`
    }
    secretCell = document.querySelectorAll('.secretCell');
    fieldQuestion.innerHTML = question[questionNumber].question
    fieldKey.innerHTML = ''
    for (let i = 0; i < question[questionNumber].solutionOption.length; i++) {
        fieldKey.innerHTML += `
        <input
        type="text"
        class="secretSymbol"
        onclick="keyClick(${i})" value=${question[questionNumber].solutionOption[i]}>`
    }
}

document.addEventListener('keydown', function (event) {
    console.log(windowGames.style.display)
    if (event.code == 'Escape' && windowGames.style.display === "flex") {
        fieldQuestionESC.style.display = "flex"
        fieldQuestionKey.style.display = "none"
    }
});

function proceedClick() {
    fieldQuestionESC.style.display = "none"
    fieldQuestionKey.style.display = "flex"
}

function skipClick() {
    question.length - 1 > questionNumber
    ? ++questionNumber
    : questionNumber = 0
    renderQuestion()
}