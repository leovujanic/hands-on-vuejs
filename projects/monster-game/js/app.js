new Vue({
    el: "#app",
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: [],
    },
    methods: {
        startGame: function () {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack: function () {
            var damage = this.calculateDamage(3, 10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster for ' + damage,
            });
            if (this.checkWin()) {
                return;
            }

            this.monsterAttack()
        },
        specialAttack: function () {
            var damage = this.calculateDamage(10, 20);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster hard for ' + damage,
            });

            if (this.checkWin()) {
                return;
            }

            this.monsterAttack();
        },
        monsterAttack: function (minDamage, maxDamage) {
            var damage = this.calculateDamage(minDamage || 5, maxDamage || 12);
            this.playerHealth -= damage;
            this.checkWin();
            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hits Player for ' + damage,
            });
        },
        heal: function () {
            if (this.playerHealth >= 90) {
                this.playerHealth = 100;
            } else {
                this.playerHealth += 10;
            }
            this.monsterAttack();
        },
        giveUp: function () {
            this.gameIsRunning = false;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player gives up!',
            });
        },
        calculateDamage: function (minDamage, maxDamage) {
            return Math.max(Math.floor(Math.random() * maxDamage) + 1, minDamage)
        },
        checkWin: function () {
            if (this.monsterHealth <= 0) {
                this.confirmContinue("You won! New Game?");
                return true;
            }

            if (this.playerHealth <= 0) {
                this.confirmContinue("You lose! New Game?");
                return true;
            }

            return false;
        },
        confirmContinue: function (msg) {
            if (confirm(msg)) {
                this.startGame();
            }
            this.gameIsRunning = false;

        },
        log: function () {

        }
    }
});