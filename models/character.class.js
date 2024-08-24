class Character extends MovableObject {
    height = 250;
    width = 125;
    y = 80;
    speed = 6;
    coins = 0;
    bottles = 0;
    isMuted = false;
    timeBetweenHits = 1000;
    energy = 100;
    world;
    isSleeping = false;
    idleTimeout = 0;
    lastHit = 0;
    walking_sound = new Audio('audio/walk.mp3');
    jumping_sound = new Audio('audio/jump.mp3');
    hurt_sound = new Audio('audio/get-hurt.mp3');
    kill_chicken_sound = new Audio('audio/chicken_dead.mp3');
    sleeping_sound = new Audio('audio/sleeping.mp3');
    keyboardInterval;
    animateInterval;
    sleepingInterval;
    sleepingIntervalImages;
    lastThrowTime = 0; 
    isThrowing = false;
    standingInterval = null;

    offset = {
        top: 100,
        left: 15,
        right: 30,
        bottom: 10,
    }

    IMAGES_WALKING = [
        'img/img/2_character_pepe/2_walk/W-21.png',
        'img/img/2_character_pepe/2_walk/W-22.png',
        'img/img/2_character_pepe/2_walk/W-23.png',
        'img/img/2_character_pepe/2_walk/W-24.png',
        'img/img/2_character_pepe/2_walk/W-25.png',
        'img/img/2_character_pepe/2_walk/W-26.png',
    ]

    IMAGES_JUMPING = [
        'img/img/2_character_pepe/3_jump/J-31.png',
        'img/img/2_character_pepe/3_jump/J-32.png',
        'img/img/2_character_pepe/3_jump/J-33.png',
        'img/img/2_character_pepe/3_jump/J-34.png',
        'img/img/2_character_pepe/3_jump/J-35.png',
        'img/img/2_character_pepe/3_jump/J-36.png',
        'img/img/2_character_pepe/3_jump/J-37.png',
        'img/img/2_character_pepe/3_jump/J-38.png',
        'img/img/2_character_pepe/3_jump/J-39.png',
    ]

    IMAGES_DEAD = [
        'img/img/2_character_pepe/5_dead/D-51.png',
        'img/img/2_character_pepe/5_dead/D-52.png',
        'img/img/2_character_pepe/5_dead/D-53.png',
        'img/img/2_character_pepe/5_dead/D-54.png',
        'img/img/2_character_pepe/5_dead/D-55.png',
        'img/img/2_character_pepe/5_dead/D-56.png',
        'img/img/2_character_pepe/5_dead/D-57.png',
    ]

    IMAGES_HURT = [
        'img/img/2_character_pepe/4_hurt/H-41.png',
        'img/img/2_character_pepe/4_hurt/H-42.png',
        'img/img/2_character_pepe/4_hurt/H-43.png',
    ]

    IMAGES_SLEEPING = [
        'img/img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/img/2_character_pepe/1_idle/long_idle/I-20.png',
    ]

    IMAGES_STANDING = [
        'img/img/2_character_pepe/1_idle/idle/I-1.png',
        'img/img/2_character_pepe/1_idle/idle/I-2.png',
        'img/img/2_character_pepe/1_idle/idle/I-3.png',
        'img/img/2_character_pepe/1_idle/idle/I-4.png',
        'img/img/2_character_pepe/1_idle/idle/I-5.png',
        'img/img/2_character_pepe/1_idle/idle/I-6.png',
        'img/img/2_character_pepe/1_idle/idle/I-7.png',
        'img/img/2_character_pepe/1_idle/idle/I-8.png',
        'img/img/2_character_pepe/1_idle/idle/I-9.png',
        'img/img/2_character_pepe/1_idle/idle/I-10.png',
    ]

    /**
    * Creates a new character and loads its images for the different animations and starts the applyGravity function.
    */
    constructor() {
        super().loadImage('img/img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_SLEEPING);
        this.loadImages(this.IMAGES_STANDING);
        this.applyGravity();
       
    }

    /**
     * Animates the character by setting intervals for its different movements and stati.
     */
    animate() {
        this.keyboardInterval = setInterval(() => {
            this.movingCharacter();
        }, 1000 / 60);

        this.animateInterval = setInterval(() => {
            this.checkCharacterStatus();
        }, 100);
    }

    /**
    * Checks if the game is over and starts all animations for the movement of the character.
    */
    movingCharacter() {
        if (!gameOver) {
            this.walking_sound.pause();
            this.walkingRight();
            this.walkingLeft();
            this.jumping();
            this.stopWalkingSoundWhileJumping();
            this.settingCameraPosition();
        }
    }

    /**
    * Checks if the right button on the keyboard is pressend and if the character is still in the level. 
    * Let the character move right by stopping the sleeping animation and playing the walking sound. 
    */
    walkingRight() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            clearInterval(this.sleepingIntervalImages);
            this.moveRight();
            this.otherDirection = false;
            if (!isMuted) {
                this.walking_sound.play();
            }
        }
    }

    /**
    * Checks if the right button on the keyboard is pressend and if the character is still in the level. 
    * Let the character move left by stopping the sleeping animation and playing the walking sound. 
    */
    walkingLeft() {
        if (this.world.keyboard.LEFT && this.x > 0) {
            clearInterval(this.sleepingIntervalImages);
            this.moveLeft();
            this.otherDirection = true;
            if (!isMuted) {
                this.walking_sound.play();
            }
        }
    }

    /**
    * Checks if the right button on the keyboard is pressend and if the character is touching the ground. 
    * Let the character jump by stopping the sleeping animation and playing the jumping sound. 
    */
    jumping() {
        if (this.world.keyboard.UP && !this.isAboveGround()) {
            clearInterval(this.sleepingIntervalImages);
            this.jump();
            if (!isMuted) {
                this.jumping_sound.play();
            }
        }
    }

    /**
    * Checks if the right/left button and the up button on the keyboard are pressend at the same time and stops the walking sound. 
    */
    stopWalkingSoundWhileJumping() {
        if (this.world.keyboard.UP && (this.world.keyboard.LEFT || this.world.keyboard.RIGHT)) {
            this.walking_sound.pause();
        }
    }

    /**
    * Sets the camera position. 
    */
    settingCameraPosition() {
        this.world.camera_x = -this.x + 100;
    }

    /**
    * Checks if the character is dead, hurt or abovegroud and starts the according animations. 
    */
    checkCharacterStatus() {
        if (!gameOver) {
            if (this.isDead()) {
                this.characterDies();
            } else if (this.isHurt()) {
                this.characterHurt();
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else {
                this.startSleepingAnimation();
                this.walking();
            }
        } else {
            this.stopSleepingAnimation();
        }
    }

    /**
    * Plays the dieing animation of the character und starts the according GameOver funktion. 
    */
    characterDies() {
        this.playAnimation(this.IMAGES_DEAD);
        gameOverLosing();
    }

    /**
    * Plays hurt animation by stopping the sleeping animation and playing the hurt sound. 
    */
    characterHurt() {
        if (this.isSleeping) {
            this.stopSleepingAnimation();
        }
        this.playAnimation(this.IMAGES_HURT);
        if (!isMuted) {
            this.hurt_sound.play();
        }
    }

    /**
    * Checks if the left and right button on the keyboard are pressed and plays the walking animation. 
    */
    walking() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            clearInterval(this.standing);
            this.playAnimation(this.IMAGES_WALKING);
        }
    }

    /**
    * Runs the standing animation. 
    */
    standing() {
        if (!this.isThrowing && !this.standingInterval) {
            this.standingInterval = setInterval(() => {
                this.playAnimation(this.IMAGES_STANDING);
            }, 300); 
        }
    }

    /**
    * Stops the standing animation by clearing the interval. 
    */
    stopStanding() {
        if (this.standingInterval) {
            clearInterval(this.standingInterval);
            this.standingInterval = null;
        }
    }

    /**
    * Checks if the game is still running and that no buttons are pressed and starts the according animations. 
    */
    startSleepingAnimation() {
        if (!isStopped && !this.world.keyboard.LEFT && !this.world.keyboard.RIGHT && !this.world.keyboard.UP && !this.world.keyboard.D) {
            this.turnStandingToSleeping();
        } else {
            this.isSleeping = false;
            this.wakeup();
        }
    }
    
    /**
    * Checks the time when a button was pressed the last time, plays the standing animation first before playing the sleeping animation.  
    */
    turnStandingToSleeping() {
        if (!this.idleTimeout && !this.isSleeping) {
            this.standing();
            this.idleTimeout = setTimeout(() => {
                if (!isStopped && !this.isSleeping) {
                    this.stopStanding();
                    this.isSleeping = true;
                    this.sleepingAnimation();
                }
            }, 7000);
        }
    }

    /**
    * Checks if the game is still running and plays the sleeping animation and the according sound. 
    */
    sleepingAnimation() {
        if (!this.isStopped && this.isSleeping) {
            clearInterval(this.sleepingIntervalImages); // Sicherstellen, dass keine doppelten Intervalle existieren
            this.sleepingIntervalImages = setInterval(() => {
                this.playAnimation(this.IMAGES_SLEEPING);
                if (!isMuted) {
                    this.sleeping_sound.play();
                    this.sleeping_sound.volume = 0.2;
                }
            }, 200);
        }
    }
    
    /**
    * Stops the sleeping animation by checking the sleeping status and the clearing the timeout of teh last time a button was pressed.
    */
    stopSleepingAnimation() {
        if (this.isSleeping) {
            this.isSleeping = false;
            clearTimeout(this.idleTimeout);
            this.idleTimeout = 0;
            clearInterval(this.sleepingIntervalImages);
            this.sleeping_sound.pause();
        }
    }

    /**
    * Wakes the character up by checking the sleeping status and the clearing the timeout of teh last time a button was pressed.
    * Plays the animation of the character standing. 
    */
    wakeup() {
        this.isSleeping = false;
        clearTimeout(this.idleTimeout);
        this.idleTimeout = 0;
        clearInterval(this.sleepingIntervalImages);
        this.sleeping_sound.pause(); 
    }

    /**
    * Pauses all sounds of the character itself and of the sounds caused by the character.
    */
    pauseSounds() {
        if (isMuted) {
            this.sleeping_sound.pause();
            this.walking_sound.pause();
            this.jumping_sound.pause();
            this.hurt_sound.pause();
            this.kill_chicken_sound.pause();
        }
    }

    /**
    * Pauses all intervals of the character.
    */
    pauseIntervals() {
        if (isStopped) {
            clearInterval(this.sleepingIntervalImages);
            clearInterval(this.sleepingInterval);
            clearInterval(this.keyboardInterval);
            clearInterval(this.animateInterval);
            clearInterval(this.gravityInterval);
            clearInterval(this.standingInterval);
        }
    }

    /**
    * Reduces the energy of a character by beeing hit, sets a new Timer of the last Hit and stops the sleepin animation by getting hit. 
    */
    hit() {
        const currentTime = new Date().getTime();
        if (currentTime - this.lastHit > this.timeBetweenHits) {
            this.energy -= 20;
        } if (this.energy <= 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
        this.stopSleepingAnimation();
        this.stopStanding();
    }
}
