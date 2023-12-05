class Carta {
    constructor(name, life) {
        this.name = name;
        this.life = life;
    }

    die() {
        console.log("Carta destruida!");
    }

    takeDamage(damage) {
        this.life = this.life - damage;

        if(this.life <= 0){
            this.die();
        }
    }
}