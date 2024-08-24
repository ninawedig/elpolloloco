let world;
let canvas;
let keyboard = new Keyboard();
game_over_sound = new Audio('audio/game-over.mp3');
winning_sound = new Audio('audio/winning-music.mp3');
background_music = new Audio('audio/background-music.mp3');
background_music.volume = 0.05;
background_music.loop = true;
let isMuted = false;
let isStopped = false;
let isRestarted = false;
let gameOverSoundPlayed = false;
let winningSoundPlayed = false;
let gameOver = false;

/**
* Initializes the game by setting up the canvas and creating a new world instance.
*/
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

/**
 * Starts the game by initializing the level, setting the functions for the mobile buttons, playing the backgroundmusic and hiding the startscreen elements. 
 */
function start() {
    initLevel();
    init();
    showMuteButton();
    pressMobileButtons();
    releaseMobileButtons();
    playBackgroundMusicAtStart();
    hideElements();
}

/**
 * Plays the according sounds in a function and checks that the sound is not played in a loop. 
* @param {string} sound The sounds played in a function. 
*/
function playSound(sound) {
    if (!isMuted) {
        sound.loop = false;
        sound.play();
    }
}

/**
 * Plays the background music at the start of the game and sets a timeout that it starts when the game is fully loaded.  
*/
function playBackgroundMusicAtStart() {
    setTimeout(() => {
        background_music.play();
    }, 2000);
}

/**
 * Checks if the mute button in pressed, shows the button image and plays/pauses the sound according to the status. 
*/
function toggleMute() {
    isMuted = !isMuted;
    if (isMuted) {
        document.getElementById('image-muted').src = "./img/img/muted.png";
        pauseAllSounds();
    } else {
        document.getElementById('image-muted').src = "./img/img/notmuted.png";
        background_music.play();
    }
}

/**
 * Sums up all the paused sounds of the game. 
*/
function pauseAllSounds() {
    background_music.pause();
    game_over_sound.pause();
    winning_sound.pause();
    world.character.pauseSounds();
    world.level.endboss.forEach(endboss => {
        endboss.pauseSounds();
    });
}

/**
 * Pauses the character animation. 
*/
function pauseCharacterAnimation() {
    world.character.stopStanding();
    world.character.pauseIntervals();
}

/**
 * Pauses the babychicken animation. 
*/
function pauseBabyChickenAnimation() {
    world.level.babychicken.forEach(babyChicken => {
        babyChicken.isStopped = true;
        babyChicken.pauseIntervals();
    });
}

/**
 * Pauses the chicken animation. 
*/
function pauseChickenAnimation() {
    world.level.enemies.forEach(enemy => {
        enemy.isStopped = true;
        enemy.pauseIntervals();
    });
}

/**
 * Pauses the coin animation. 
*/
function pauseCoinAnimation() {
    world.level.coins.forEach(coin => {
        coin.isStopped = true;
        coin.pauseIntervals();
    });
}

/**
 * Pauses the clouds animation. 
*/
function pauseCloudsAnimation() {
    world.level.clouds.forEach(cloud => {
        cloud.isStopped = true;
        cloud.pauseIntervals();
    });
}

/**
 * Pauses the endboss animation. 
*/
function pauseEndbossAnimation() {
    world.level.endboss.forEach(endboss => {
        endboss.isStopped = true;
        endboss.pauseIntervals();
        endboss.pauseSounds();
    });
}

/**
 * Pauses the thrown bottle animation. 
*/
function pauseBottleAnimation() {
    world.throwableObject.forEach(bottle => {
        bottle.isStopped = true;
        bottle.pauseIntervals();
    });
}

/**
 * Pauses the game by summarizing the pause functions of all objects. 
*/
function stopGame() {
    background_music.pause();
    pauseCharacterAnimation();
    pauseBabyChickenAnimation();
    pauseChickenAnimation();
    pauseCoinAnimation();
    pauseCloudsAnimation();
    pauseEndbossAnimation();
    pauseBottleAnimation();
}

/**
 * When the game is lost the according endscreen is shown, the losing sound is played and the game is stopped.  
*/
function gameOverLosing() {
    stopGame();
    gameOver = true;
    document.getElementById('endscreen').classList.remove('endscreen-hide');
    document.getElementById('endscreen').classList.add('endscreen-losing-shown');
    if (!isRestarted && !gameOverSoundPlayed) {
        playSound(game_over_sound);
        gameOverSoundPlayed = true;
    }
   
}

/**
 * When the game is won the according endscreen is shown, the winning sound is played and the game is stopped.  
*/
function gameOverWinning() {
    stopGame();
    gameOver = true;
    document.getElementById('endscreen').classList.remove('endscreen-hide');
    document.getElementById('endscreen').classList.add('endscreen-winning-shown');
    if (!isRestarted && !winningSoundPlayed) {
        playSound(winning_sound);
        winningSoundPlayed = true;
    }
}

/**
 * Restarts the game by reloading the window. 
*/
async function restartGame() {
    isRestarted = true;
    if (isRestarted) {
        window.location.reload();
    }
}

/**
 * Hides the startscreen. 
*/
function hideElements() {
    document.getElementById('startscreen').style.display = 'none';
}

/**
 * Hides the rotate warning screen. 
*/
function hideRotateWarning() {
    document.getElementById('rotate-warning').style.display = 'none';
}

/**
 * Opens the instruction for the game. 
*/
function openHowToPlay() {
    document.getElementById('howToPlay').classList.remove('how-to-play-hide');
    document.getElementById('howToPlay').classList.add('how-to-play-shown');
}

/**
 * Closes the instruction for the game. 
*/
function closeHowToPlay() {
    document.getElementById('howToPlay').classList.remove('how-to-play-shown');
    document.getElementById('howToPlay').classList.add('how-to-play-hide');
}

/**
 * Shows the mute button. 
*/
function showMuteButton() {
    document.getElementById('mutebutton').classList.remove('mutebutton-hide');
    document.getElementById('mutebutton').classList.add('mutebutton-shown');
}

/**
 * Opens a new impressum page. 
*/
function openImpressum() {
    window.open("impressum.html", "_blank");
}

/**
 * Opens a new data protection page. 
*/
function openDatenschutz() {
    window.open("datenschutz.html", "_blank");
}

/**
 * Event listener for setting keydown events.
 * @param {KeyboardEvent} event The keyboard event object.
 */
window.addEventListener("keydown", (event) => {
    if (gameOver) return;
    if (event.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (event.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (event.keyCode == 38) {
        keyboard.UP = true;
    }
    if (event.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (event.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (event.keyCode == 68) {
        keyboard.D = true;
    }
    console.log(event)
});

/**
 * Event listener for setting keyup events.
 * @param {KeyboardEvent} event The keyboard event object.
 */
window.addEventListener("keyup", (event) => {
    if (gameOver) return;
    if (event.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (event.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (event.keyCode == 38) {
        keyboard.UP = false;
    }
    if (event.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (event.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (event.keyCode == 68) {
        keyboard.D = false;
    }
    console.log(event)
});

/**
 * Sets the function for pressing the touch buttons.
 */
function pressMobileButtons() {
    if (gameOver) return;
    const buttonLeft = document.getElementById('button-left');
    buttonLeft.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });
    const buttonRight = document.getElementById('button-right');
    buttonRight.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });
    const buttonUp = document.getElementById('button-up');
    buttonUp.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.UP = true;
    });
    const buttonBottle = document.getElementById('button-bottle');
    buttonBottle.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;
    });
}

/**
 * Sets the function for releasing the touch buttons.
 */
function releaseMobileButtons() {
    if (gameOver) return;
    const buttonLeft = document.getElementById('button-left');
    buttonLeft.addEventListener('touchend', () => {
        keyboard.LEFT = false;
    });
    const buttonRight = document.getElementById('button-right');
    buttonRight.addEventListener('touchend', () => {
        keyboard.RIGHT = false;
    });
    const buttonUp = document.getElementById('button-up');
    buttonUp.addEventListener('touchend', () => {
        keyboard.UP = false;
    });
    const buttonBottle = document.getElementById('button-bottle');
    buttonBottle.addEventListener('touchend', () => {
        keyboard.D = false;
    });
}

