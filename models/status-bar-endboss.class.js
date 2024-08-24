class StatusBarEndboss extends DrawableObject {
    percentage = 100;

    IMAGES_STATUSBAR_ENDBOSS = [
        'img/img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        'img/img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        'img/img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        'img/img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        'img/img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        'img/img/7_statusbars/2_statusbar_endboss/blue/blue100.png',
    ]

    /**
    * Creates a endboss energy status bar, loads its status animation images, sets its height, width and coordinates.
    */
    constructor() {
        super().loadImage('img/img/7_statusbars/2_statusbar_endboss/blue/blue0.png');
        this.loadImages(this.IMAGES_STATUSBAR_ENDBOSS);
        this.setPercentage(100);
        this.height = 50;
        this.width = 200;
        this.x = 510;
        this.y = 5;
    };

    /**
    * Sets the percentage of the endboss energy and loads the according status images.
    * @param {number} percentage Sets the percentage of the endboss energy.
    */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_STATUSBAR_ENDBOSS[this.resolveImageIndex()];
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