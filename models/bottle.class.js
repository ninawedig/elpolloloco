class Bottle extends MovableObject {
    height = 70;
    width = 70;

    offset = {
        top: 20,
        left: 10,
        right: 20,
        bottom: 10,
    }

    IMAGES_BOTTLES = [
        'img/img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/img/6_salsa_bottle/2_salsa_bottle_on_ground.png',  
    ]

    /**
     * Creates new bottles, loads their images and gives them random coordinates.
     * @constant randomIndex Gives a random selection of the available images.
     * @constant randomImagePath Sets the path to the random Images. 
     */
    constructor() {
        super().loadImages(this.IMAGES_BOTTLES);
        const randomIndex = Math.floor(Math.random() * this.IMAGES_BOTTLES.length);
        const randomImagePath = this.IMAGES_BOTTLES[randomIndex];
        this.loadImage(randomImagePath);
        this.x = 200 + Math.random() * 2000; 
        this.y = 348; 
    }
}
