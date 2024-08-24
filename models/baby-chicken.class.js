class BabyChicken extends MovableObject {
    height = 50;
    width = 50;
    isStopped = false;
    walkingAnimation;
    walkingAnimationImages;

    IMAGES_WALKING = [
        'img/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ]

    IMAGES_DEAD = [
        'img/img/3_enemies_chicken/chicken_small/2_dead/dead.png',
    ]

   /**
   * Creates a new babychicken enemy, loads its walking and dead images, sets its random coordinates and random speed and starts the animation.
   */
    constructor() {
        super().loadImage('img/img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.y = 362;
        this.x = 500 + Math.random() * 2300
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    }

   /**
   * Animates the babychicken enemy by setting intervals for its movement and walking images animation.
   */
    animate() {
        if (!this.isStopped) {
            this.walkingAnimation = setInterval(() => {
                this.moveLeft();
            }, 1000 / 60);
            this.walkingAnimationImages = setInterval(() => {
                this.playAnimation(this.IMAGES_WALKING);
            }, 100);
        }
    }

   /**
   * Animates the dead of the babychicken enemy by first stopping the walking animation and then plays the dead animation.
   */
    dead() {
        clearInterval(this.walkingAnimationImages);
        this.playAnimation(this.IMAGES_DEAD);
        setTimeout(() => {
            this.x = -100;
        }, 300)
    }

   /**
   * Pauses all intervals of the babychicken.
   */
    pauseIntervals() {
        clearInterval(this.walkingAnimation);
        clearInterval(this.walkingAnimationImages);
    }
}

