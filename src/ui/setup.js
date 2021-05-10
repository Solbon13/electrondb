 async function addClick() {
    const data = {
        level: newLevel.value,
        question: newQuestion.value,
        answer: newAnswer.value,
        solutionOption: newSolutionOption.value,
    }

    let res =await electronMain.createQuestion(data)
    console.log(res)
    if (!res.message) {
        newLevel.value = ''
        newQuestion.value = ''
        newAnswer.value = ''
        newSolutionOption.value = ''
    }
 }