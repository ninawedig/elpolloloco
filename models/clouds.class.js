class Clouds extends MovableObject {
    y = 30;
    height = 250;
    width = 500;
    slidingAnimation;

    /**
    * Creates new clouds, loads its images, sets its random coordinates and starts the animation.
    */
    constructor() {
        super().loadImage('img/img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 4000;
        this.animate();
    }

    /**
    * Animates the clouds by setting interval for its movement animation.
    */
    animate() {
        if (!this.isStopped) {
            this.slidingAnimation = setInterval(() => {
                this.moveLeft();
            }, 1000 / 60);
        }
    }

   /**
   * Pauses all intervals of the clouds.
   */
    pauseIntervals() {
        clearInterval(this.slidingAnimation);
    }
}