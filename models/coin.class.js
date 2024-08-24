class Coin extends MovableObject {
    height = 70;
    width = 70;
    speed = 0.2;
    coinIntervalImages;

    offset = {
        top: 40,
        left: 20,
        right: 40,
        bottom: 20,
    }

    IMAGES_COINS = [
        'img/img/8_coin/coin_1.png',
        'img/img/8_coin/coin_2.png',
    ]

    /**
    * Creates new coins, loads its images, sets its random coordinates and starts the animation.
    */
    constructor() {
        super().loadImage('img/img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COINS);
        this.x = 200 + Math.random() * 2000;
        this.y = 70 + Math.random() * 250;
        this.animate();
    }

    /**
    * Animates the coins by setting interval for its movement animation.
    */
    animate() {
        if (!this.isStopped) {
            this.coinIntervalImages = setInterval(() => {
                this.playAnimation(this.IMAGES_COINS);
            }, 100);
        }
    }

    /**
    * Pauses all intervals of the coins.
    */
    pauseIntervals() {
        clearInterval(this.coinIntervalImages);
    }
}