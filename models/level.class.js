class Level {
    enemies;
    endboss;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    babychicken;
    level_end_x = 2200;

    /**
    * Creates a new instance of the level with all objects.
    * 
    * @param {Array} enemies An array of chicken enemy objects.
    * @param {string} endboss An endboss object.
    * @param {Array} clouds An array of cloud objects.
    * @param {Array} backgroundObjects An array of background objects.
    * @param {Array} coins An array of coin objects.
    * @param {Array} bottles An array of bottle objects.
    * @param {Array} babychicken An array of babychicken enemy objects.
    */
    constructor(enemies, endboss, clouds, backgroundObjects, coins, bottles, babychicken){
        this.enemies = enemies;
        this.endboss = endboss;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
        this.babychicken = babychicken;
    }
}