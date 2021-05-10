function wordsClick() {
    windowLevel.style.display = "none"
    windowGames.style.display = "flex"
    gamesLevel = 1
    getQuestion(gamesLevel)
}
//убрать переменную level
function lettersClick() {
    windowLevel.style.display = "none"
    windowGames.style.display = "flex"
    gamesLevel = 2
}

function endingsClick() {
    windowLevel.style.display = "none"
    windowGames.style.display = "flex"
    gamesLevel = 3
}