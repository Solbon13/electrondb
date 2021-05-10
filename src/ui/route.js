function gamesClick() {
    windowMain.style.display = "none"
    windowLevel.style.display = "flex"
}

function setupClick() {
    windowMain.style.display = "none"
    windowSetup.style.display = "flex"
}

function mainClick() {
    windowMain.style.display = "flex"
    windowLevel.style.display = "none"
    windowSetup.style.display = "none"
    windowGames.style.display = "none"
}
