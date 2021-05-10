const audio = document.getElementById('audio')
const windowMain = document.getElementById('main')
const windowLevel = document.getElementById('level')
const windowSetup = document.getElementById('setup')
const windowGames = document.getElementById('games')

const fieldSecret = document.getElementById('fieldSecret')
const fieldQuestion = document.getElementById('fieldQuestion')
const fieldKey = document.getElementById('fieldKey')

const fieldQuestionESC = document.getElementById('fieldQuestionESC')
const fieldQuestionKey = document.getElementById('fieldQuestionKey')

const coinsElement = document.getElementById('coins')
const ratingElement = document.getElementById('rating')

coinsElement.innerHTML = coin
ratingElement.innerHTML = rating
let secretCell

const newLevel = document.getElementById('newLevel')
const newQuestion = document.getElementById('newQuestion')
const newAnswer = document.getElementById('newAnswer')
const newSolutionOption = document.getElementById('newSolutionOption')

function soundClick() {
    if (audio.muted){
        audio.muted = false
        audio.play()
    }else{
        audio.muted = true
        audio.pause()
    }    
}

function closeClick() {
    console.log('dsf')
}

