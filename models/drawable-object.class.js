class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 330;
    height = 150;
    width = 100;

    /**
     * Loads an image from the defined path.
     * 
     * @param {string} path - The path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
    * Draws the loaded image into the canvas context.
    * 
    * @param {CanvasRenderingContext2D} ctx - The canvas context in which the image is drawn.
    */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
    * Loads images from an array of paths and stores them in the image cache.
    * 
    * @param {Array} array - The array of the paths to image files.
    */
    loadImages(array) {
        array.forEach(path => {
            let img = new Image();
            img.src = path,
                this.imageCache[path] = img;
        });
    }

    /**
    * Draws frames into the canvas context.
    * 
    * @param {CanvasRenderingContext2D} ctx - The canvas context in which the frames are drawn.
    */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof BabyChicken || this instanceof Coin || this instanceof Bottle) { //so gilt die Funktion nur für Character und Chicken
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'rgba(0, 0, 0, 0)';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    /**
    * Draws offset-frames into the canvas context.
    * 
    * @param {CanvasRenderingContext2D} ctx - The canvas context in which the offset-frames are drawn.
    */
    drawOffsetFrame(ctx) {
        if (this instanceof Character || this instanceof Coin || this instanceof Bottle || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'rgba(0, 0, 0, 0)';
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top - this.offset.bottom, this.width - this.offset.right, this.height - this.offset.top);
            ctx.stroke();
        }
    }
}