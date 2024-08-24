class StatusBarBottles extends DrawableObject {
    percentage = 0;

    IMAGES_STATUSBAR_BOTTLES = [
        'img/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
    ]

    /**
    * Creates a new bottle status bar, loads its status animation images, sets its height, width and coordinates.
    */
    constructor() {
        super().loadImage('img/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png');
        this.loadImages(this.IMAGES_STATUSBAR_BOTTLES);
        this.setPercentage(0);
        this.height = 50;
        this.width = 200;
        this.x = 10;
        this.y = 90;
    };

    /**
    * Sets the percentage of the collected bottles and loads the according status images.
    * @param {number} percentage Sets the percentage of the collected bottles.
    */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_STATUSBAR_BOTTLES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
    * Returns the image number based on the percentage output.
    */
    resolveImageIndex() {
        if (this.percentage >= 100) {
            return 5
        } else if (this.percentage >= 80) {
            return 4
        } else if (this.percentage >= 60) {
            return 3
        } else if (this.percentage >= 40) {
            return 2
        } else if (this.percentage >= 20) {
            return 1
        } else {
            return 0
        }
    }
}