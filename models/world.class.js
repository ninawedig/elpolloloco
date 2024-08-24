class World {
    character = new Character();
    endboss = new Endboss();
    level = Level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar_Energy = new StatusBarEnergy();
    statusBar_Coins = new StatusBarCoins();
    statusBar_Bottles = new StatusBarBottles();
    statusBar_Endboss = new StatusBarEndboss();
    throwableObject = [];
    collectedCoins = [];
    collectedBottles = [];
    collecting_bottle_sound = new Audio('audio/collecting-bottle.mp3');
    collecting_coin_sound = new Audio('audio/collecting-coin.mp3');
    chicken_dead_sound = new Audio('audio/chicken_dead.mp3');

    /**
    * Creates a new instance of the world.
    * @param {HTMLCanvasElement} canvas The canvas to which the world is drawn.
    * @param {object} keyboard The keyboard for playing the game.
    */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    };

    /**
    * Sets the character to the world and runs the animation.
    */
    setWorld() {
        this.character.world = this;
        this.character.animate();
    }

    /**
    * Checks handlings of the game continuously by setting an interval.
    */
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkCollectingCoins();
            this.checkCollectingBottles();
            this.checkBottleHitsEnemy();
            this.checkBottleHitsBabyChicken();
            this.checkBottleHitsEndboss();
        }, 50);
    }

    /**
    * Sums up the checks if the character is colliding an enemy.
    */
    checkCollisions() {
        this.checkCollisionWithBabyChicken();
        this.checkCollisionWithChicken();
        this.checkCollisionWithEndboss();
    }

    /**
    * Checks the collision with the babychicken, runs the according animation and sets the new percentage for the character energy. 
     * @param {object} enemy The object the character is colliding with.
    */
    checkCollisionWithBabyChicken() {
        this.level.babychicken.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                if (this.character.isAboveGround() && this.character.speedY < 0) {
                    this.enemyDeadAnimation(enemy);
                } else {
                    this.characterHitAnimation(enemy);
                }
                this.statusBar_Energy.setPercentage(this.character.energy);
            }
        });
    }

    /**
    * Checks the collision with the chicken, runs the according animation and sets the new percentage for the character energy.
    * @param {object} enemy The object the character is colliding with.
    */
    checkCollisionWithChicken() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                if (this.character.isAboveGround() && this.character.speedY < 0) {
                    this.enemyDeadAnimation(enemy);
                } else {
                    this.characterHitAnimation(enemy);
                }
                this.statusBar_Energy.setPercentage(this.character.energy);
            }
        });
    }

    /**
    * Checks the collision with the endboss, runs the according animation and sets the new percentage for the character energy.. 
    * @param {object} enemy The object the character is colliding with.
    */
    checkCollisionWithEndboss() {
        this.level.endboss.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                clearInterval(this.character.sleepingInterval);
                this.character.hit();
            }
            this.statusBar_Energy.setPercentage(this.character.energy);
        });
    }

    /**
    * Runs the animation that the dying enemy including the sound and sets the energy status of the enemy to 0.  
    * @param {object} enemy The object the character is colliding with.
    */
    enemyDeadAnimation(enemy) {
        enemy.dead();
        enemy.energy = 0;
        if (!isMuted) {
            this.chicken_dead_sound.play();
        }
    }

    /**
    * Checks the energy level of the enemy and runs the hit animation of the character.
    * @param {object} enemy The object the character is colliding with.
    */
    characterHitAnimation(enemy) {
        if (enemy.energy > 0) {
            clearInterval(this.character.sleepingInterval);
            this.character.hit();
        }
    }

    /**
    * Checks if the bottle is colliding the baby chicken and runs the according animation.
    * @param {object} enemy The object the bottle is colliding with.
    */
    checkBottleHitsBabyChicken() {
        this.level.babychicken.forEach((enemy) => {
            this.throwableObject.forEach((bottle) => {
                if (bottle.isColliding(enemy)) {
                    this.enemyDeadAnimation(enemy);
                }
            });
        });
    }

    /**
    * Checks if the bottle is colliding the chicken and runs the according animation.
    * @param {object} enemy The object the bottle is colliding with.
    */
    checkBottleHitsEnemy() {
        this.level.enemies.forEach((enemy) => {
            this.throwableObject.forEach((bottle) => {
                if (bottle.isColliding(enemy)) {
                    this.enemyDeadAnimation(enemy);
                }
            });
        });
    }

    /**
    * Checks if the bottle is colliding the endboss and runs the according animation.
    * @param {object} endboss The object the bottle is colliding with.
    */
    checkBottleHitsEndboss() {
        this.throwableObject.forEach((bottle) => {
            this.level.endboss.forEach((endboss) => {
                if (bottle.isColliding(endboss)) {
                    endboss.hit();
                    this.statusBar_Endboss.setPercentage(endboss.energy);
                }
            });
        });
    }

    /**
    * Checks if the character is colliding the coins and runs the according animations.
    * @param {object} coin The object the character is colliding with.
    * @param {indexCoins} indexCoins The index of the coin object in the array.
    */
    checkCollectingCoins() {
        this.level.coins.forEach((coin, indexCoins) => {
            if (this.character.coins < 100 && this.character.isColliding(coin)) {
                this.character.collectingCoins();
                this.statusBar_Coins.setPercentage(this.character.coins);
                this.collectedCoins.push(coin);
                this.level.coins.splice(indexCoins, 1)
                if (!isMuted) {
                    this.collecting_coin_sound.play();
                }
            }
        });
    }

    /**
    * Checks if the character is colliding the bottles and runs the according animations.
    * @param {object} bottle The object the character is colliding with.
    * @param {indexBottles} indexBottles The index of the bottle object in the array.
    */
    checkCollectingBottles() {
        this.level.bottles.forEach((bottle, indexBottles) => {
            if (this.character.bottles < 100 && this.character.isColliding(bottle)) {
                this.character.collectingBottles();
                this.statusBar_Bottles.setPercentage(this.character.bottles);
                this.collectedBottles.push(bottle);
                this.level.bottles.splice(indexBottles, 1);
                if (!isMuted) {
                    this.collecting_bottle_sound.play();
                }
            }
        });
    }
    
    /**
    * Checks if a bottle is thrown and runs the according animation. 
    */
    checkThrowObjects() {
        const currentTime = new Date().getTime();
        if (!isStopped && this.keyboard.D && this.character.bottles >= 20 && currentTime - this.character.lastThrowTime >= 1000) {
            this.character.isThrowing = true; 
            let bottle = new ThrowableObject(this.character.x + 60, this.character.y + 150);
            this.throwableObject.push(bottle);
            this.keyboard.D = false; 
            this.character.stopStanding(); 
            this.character.wakeup();
            this.character.throwBottles();
            this.statusBar_Bottles.setPercentage(this.character.bottles);
            this.character.lastThrowTime = currentTime; 
            setTimeout(() => {
                this.character.isThrowing = false; 
                if (!this.keyboard.D) {
                    this.character.standing();
                }
            }, 100); 
        }
    }
    /**
    * Clears all shown images and shows the following images that an animation can be created. 
    * Draws all objects to the world and manages the camera section. 
    */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); 
        this.ctx.translate(this.camera_x, 0); 
        this.drawStaticObjects();
        this.drawMovableObjects();
        this.ctx.translate(-this.camera_x, 0); 
        let self = this; 
        requestAnimationFrame(function () { 
            self.draw();
        })
    };

    /**
    * Draws all background and static objects to the world and manages the camera section. 
    */
    drawStaticObjects() {
        this.addObjectsToMap(this.level.backgroundObjects); 
        this.addObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.camera_x, 0); 
        this.addToMap(this.statusBar_Energy);
        this.addToMap(this.statusBar_Coins);
        this.addToMap(this.statusBar_Bottles);
        this.addToMap(this.statusBar_Endboss);
        this.ctx.translate(this.camera_x, 0); 
    }

    /**
    * Draws all foreground and movable objects to the world. 
    */
    drawMovableObjects() {
        this.addObjectsToMap(this.throwableObject);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.babychicken);
        this.addToMap(this.character);
    }

    /**
    * Adds objects to the world.
    * @param {Array} objects The array of all objects that are supposed to be added to the world.
    */
    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    /**
    * Adds a new object to the world.
    * Checks in which direction the object is supposed to be added to the world. 
    * @param {object} mo The new object that is supposed to be added to the world.
    */
    addToMap(mo) {
        this.checkFlipping(mo);
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        mo.drawOffsetFrame(this.ctx);
        this.checkFlipping(mo);
    }

    /**
     * Checks if images have to be flipped due to the direction of the object.
     * @param {object} mo The object that is supposed to be flipped.
     */
    checkFlipping(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
    }

    /**
     * Flips the images of an object horizontally.
     * @param {object} mo The flipped object.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
   * Undoes the flipping of the images of an object.
   * @param {object} mo The flipped object.
   */
    flipImageBack(mo) {
        this.ctx.restore();
        mo.x = mo.x * -1;
    }
}

