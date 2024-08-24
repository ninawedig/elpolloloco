class ThrowableObject extends MovableObject {
    throw_sound = new Audio('audio/throw.mp3');
    throwAnimation;
    throwImages;
    splashAnimation;
    splashAnimationImages;
    soundPlayed = false;
    direction;

    IMAGES_BOTTLES = [
        'img/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ]

    IMAGES_BOTTLES_SPLASH = [
        'img/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ]

    /**
    * Creates a new object (throwable bottle), loads its rotation and splash images, sets its coordinates, height and width and starts the animation.
    * 
    * @param {number} x The x coordinate from where the throwable object starts.
    * @param {number} y The y coordinate from where the throwable object starts.
    */
    constructor(x, y) {
        super().loadImage('img/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_BOTTLES);
        this.loadImages(this.IMAGES_BOTTLES_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 50;
        this.width = 50;
        this.direction = world.character.otherDirection;
        this.throw();
    }

    /**
    * Creates the throw animation of an throwable object.
    */
    throw() {
        if (!isStopped) {
            this.speedY = 30;
            this.applyGravity();
            this.throwAnimation = setInterval(() => {
                this.checkThrowingDirection();
                this.checkCollision();
            }, 50);
            this.throwImages = setInterval(() => {
                this.playAnimation(this.IMAGES_BOTTLES);
            }, 100);
        }
    }

    /**
    * Creates the direction the object should be thrown to.
    */
    checkThrowingDirection() {
        if (this.direction === false) { // Use the captured direction
            this.x += 10;
        } else {
            this.x -= 10;
        }
    }

    /**
    * Checks if the bottle is colliding with the other objects or ground.
    */
    checkCollision() {
        this.checkBottleCollidingGround();
        this.checkBottleCollidingChicken();
        this.checkBottleCollidingBabyChicken();
        this.checkBottleCollidingEndboss();
    }

    /**
    * Checks if the bottle is colliding with the ground and runs the splashing animation.
    */
    checkBottleCollidingGround() {
        if (this.y > 340) {
            this.splash();
            this.checkPlaySound();
            clearInterval(this.throwAnimation);
        }
    }

    /**
    * Checks if the bottle is colliding with the chickens and runs the splashing animation.
    */
    checkBottleCollidingChicken() {
        world.level.enemies.forEach(enemy => {
            if (this.isColliding(enemy)) {
                this.splash();
                this.checkPlaySound();
                clearInterval(this.throwAnimation);
            }
        });
    }

    /**
    * Checks if the bottle is colliding with the babychickens and runs the splashing animation.
    */
    checkBottleCollidingBabyChicken() {
        world.level.babychicken.forEach(babychicken => {
            if (this.isColliding(babychicken)) {
                this.splash();
                this.checkPlaySound();
                clearInterval(this.throwAnimation);
            }
        });
    }

    /**
    * Checks if the bottle is colliding with the endboss and runs the splashing animation.
    */
    checkBottleCollidingEndboss() {
        world.level.endboss.forEach(endboss => {
            if (this.isColliding(endboss)) {
                this.splash();
                this.checkPlaySound();
                clearInterval(this.throwAnimation);
            }
        });
    }

    /**
    * Animates the splash animation of the throwable object by setting interval for its splash images animation.
    */
    splash() {
        clearInterval(this.throwAnimation);
        clearInterval(this.throwImages);
        this.splashAnimationImages = setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLES_SPLASH);
            setTimeout(() => {
                this.x = -100;
            }, 300);
        }, 50);
    }

    /**
    * Checks if the sound of the splashed bottle should be played or paused.
    */
    checkPlaySound() {
        if (!isMuted && !this.soundPlayed) {
            this.throw_sound.play();
            this.soundPlayed = true;
        }
    }

    /**
    * Pauses all intervals of the thrown object.
    */
    pauseIntervals() {
        clearInterval(this.throwAnimation);
        clearInterval(this.throwImages);
        clearInterval(this.splashAnimation);
        clearInterval(this.splashAnimationImages);
        clearInterval(this.gravityInterval);
    }

    /**
    * Continues all intervals of the thrown object animation. 
    */
    continueIntervals() {
        this.applyGravity();
        this.throwAnimation = setInterval(() => {
            this.checkThrowingDirection();
            this.checkCollision();
        }, 50);
        this.throwImages = setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLES);
        }, 100);
    }
}
