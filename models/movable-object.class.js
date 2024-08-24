class MovableObject extends DrawableObject {
    speed = 0.2;
    otherDirection = false;
    speedY = 0; // Geschwindigkeit, wie schnell das Objekt nach unten fällt
    acceleration = 2.5; // Beschleunigung während des Falls
    energy = 100;
    lastHit = 0;

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }

   /**
    * Gives the gravity to the objects so that the objects fall down.
    */
    applyGravity() {
        this.gravityInterval = setInterval(() => {
            if (!isStopped && (this.isAboveGround() || this.speedY > 0)) {
                this.y -= this.speedY; // minus, da das Objekt nach unten fällt
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25); 
    }

   /**
    * Checks if the object is above the ground level.
    * 
    * @returns {boolean} If the object is above the ground i returns true, otherwise returns false.
    */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true
        } else {
            return this.y < 160;
        }
    }

    /**
    * Moves the object to the right side. 
    */
    moveRight() {
        this.x += this.speed;
    }

    /**
    * Moves the object to the left side. 
    */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
    * Moves the object up. 
    */
    jump() {   
        this.speedY = 30; 
    }

    /**
    * Plays the animation using the images from the array.
    * 
    * @param {Array} images - The array of image paths to the image files.
    */
    playAnimation(images) {
        let i = this.currentImage % images.length; 
        let path = images[i]; 
        this.img = this.imageCache[path]; 
        this.currentImage++;
    }

    /**
    * Checks if the object is colliding with another object.
    * 
    * @param {MovableObject} mo The other movable object with which the collision is checked.
    * @returns {boolean} If the object is colliding i returns true, otherwise it returns false.
    */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    /**
    * Sets the amount of collected coins with a maximum.  
    */
    collectingCoins() {
            this.coins += 20;
            if (this.coins > 100) {
                this.coins = 100; 
            }     
    }

    /**
    * Sets the amount of collected bottles with a maximum.  
    */
    collectingBottles() {
        this.bottles += 20;
            if (this.bottles > 100) {
                this.bottles = 100; 
            }   
    }

    /**
    * Sets the amount of thrown bottles with a minimum.  
    */
    throwBottles() {
        this.bottles -= 20;
            if (this.bottles < 0) {
                this.bottles = 0; 
            }
    }

    /**
    * Checks if the object is dead.
    * 
    * @returns {boolean} Returns true when the energy of the object is 0, otherwise returns false.
    */
    isDead() {
        return this.energy == 0;
    }

    /**
    * Checks if the object was hurt during a certain period of time.
    * 
    * @returns {boolean} Returns true if the object was hurt within the last second (1000ms), otherwise returns false. 
    */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit 
        timepassed = timepassed / 1000 
        return timepassed < 1;
    }   
}

