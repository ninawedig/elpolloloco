class Endboss extends MovableObject {
    height = 300;
    width = 300;
    y = 120;
    energy = 100;
    lastHit = 0;
    timeBetweenHits = 1000;
    angry_chicken_sound = new Audio('audio/angry-chicken.mp3');
    chicken_dies_sound = new Audio('audio/chicken-dies.mp3');
    angry_chicken_sound_time = 0;
    wasHitWhenPaused = false;  
    isStopped = false;
    isMuted = false;
    world;
    walkingAnimation = null;
    walkingImages = null;
    alertImages = null;
    attackImages = null;
    hurtImages = null;
    deadImages = null;

    offset = {
        top: 120,
        left: 30,
        right: 20,
        bottom: 70,
    }

    IMAGES_WALKING = [
        'img/img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/img/4_enemie_boss_chicken/1_walk/G4.png',
    ]

    IMAGES_ALERT = [
        'img/img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/img/4_enemie_boss_chicken/2_alert/G12.png',
    ]

    IMAGES_ATTACK = [
        'img/img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/img/4_enemie_boss_chicken/3_attack/G20.png',
    ]

    IMAGES_HURT = [
        'img/img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/img/4_enemie_boss_chicken/4_hurt/G23.png',
    ]

    IMAGES_DEAD = [
        'img/img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/img/4_enemie_boss_chicken/5_dead/G26.png',
    ]

    /**
    * Creates a new endboss, loads its walking, alert, attack, hurt and dead images, sets its x-coordinate and speed and starts the animation.
    *
    * @param {string} world Sets the connection to the world.
    */
    constructor(world) {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.world = world;
        this.speed = 0.2;
        this.x = 2200;
        this.animate();
    }

    /**
   * Animates the endboss by setting intervals for its different animations.
   */
    animate() {
        this.pauseIntervals();
        if (!this.isStopped) {
            this.walking();
            this.attack();
            this.dead();
        }
    }

    /**
    * Animates the endboss by setting intervals for its movement and walking images animation.
    */
    walking() {
        this.walkingAnimation = setInterval(() => {
            if (world.character.x > 1000) {
                if (this.energy > 0 && this.energy <= 100) {
                    this.moveLeft();
                }
            }
        }, 1000 / 60);
        this.walkingImages = setInterval(() => {
            if (this.energy > 60) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 100);
    }

    /**
    * Animates the endboss by setting interval for its attack images animation and gives it a higher speed.
    */
    attack() {
        this.attackImages = setInterval(() => {
            if (this.energy >= 20 && this.energy <= 60) {
                this.playAnimation(this.IMAGES_ATTACK);
                this.speed = 0.8;
            }
        }, 100);  
    }

    /**
    * Animates the dead of the endboss by setting interval for its dead images animation and plays the dead sound.
    */
    dead() {
        this.deadImages = setInterval(() => {
            if (this.energy === 0) {
                this.playAnimation(this.IMAGES_DEAD);
                if (!isMuted) {
                    this.angry_chicken_sound.pause();
                    this.chicken_dies_sound.play();
                }
                setTimeout(() => {
                    gameOverWinning();
                }, 1500);
            }
        }, 150);
    }

    /**
    * Pauses all intervals of the endboss.
    */
    pauseIntervals() {
        clearInterval(this.walkingAnimation);
        clearInterval(this.walkingImages);
        clearInterval(this.alertImages);
        clearInterval(this.attackImages);
        clearInterval(this.hurtImages);
        clearInterval(this.deadImages);
    }

    /**
     * Subtracts the energy level and plays the hurt images animation when endboss is hit.
     *
     * @constant currentTime Gives the current time.
     */
    hit() {
        const currentTime = new Date().getTime();
        if (currentTime - this.lastHit > this.timeBetweenHits) {
            this.energy -= 20;
            this.lastHit = currentTime;
            this.wasHitWhenPaused = this.isStopped; // Speichert den Zustand, ob der Endboss getroffen wurde, als das Spiel angehalten wurde
            this.playHurtAnimation();
        }
    }
    /**
    * Animates the hurt animation of the endboss by setting interval for its hurt images animation and plays the hurt sound by checking if muted or stopped.
    */
    playHurtAnimation() {
        this.pauseIntervals();
        this.hurtImages = setInterval(() => {
            if (!isStopped) {
                this.playAnimation(this.IMAGES_HURT);
                if (!isMuted) {
                    this.angry_chicken_sound.play();
                }
            } else {
                this.angry_chicken_sound.pause();
            }
        }, 150);
        setTimeout(() => {
            clearInterval(this.hurtImages);
            this.animate();
        }, 500);
    }

    /**
    * Pauses all sound when the game is stopped and saves the current time of the sound.
    */
    pauseSounds() {
        this.angry_chicken_sound.pause();
        this.chicken_dies_sound.pause();
    }

}
