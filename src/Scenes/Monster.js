// Tien Le <ticale@ucsc.edu>

class Monster extends Phaser.Scene {
    constructor() {
        super("monsterScene");
        this.my = {sprite: {}};  // Create an object to hold sprite bindings

        //Create constants for the monster location
        this.bodyX = 300;
        this.bodyY = 350;

        this.leftArmX = 200;
        this.leftArmY = 330;
        
        this.rightArmX = 400;
        this.rightArmY = 330;

        this.headY = 200;

        this.eyeY = 160;

        this.counter = 0;

        this.currEye;

        this.mouth1Y = 215;

        this.mouth2Y = 260;

        this.leftLegX = 225;
        this.leftLegY = 470;

        this.rightLegX = 375;
        this.rightLegY = 470;

        this.hornY = 125;
        this.rightHornX = 350;
        this.leftHornX = 250;

        // key vars for polling
        this.aKey = null;
        this.dKey = null;
    }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        // Assets from Kenny Assets pack "Monster Builder Pack"
        // https://kenney.nl/assets/monster-builder-pack
        this.load.setPath("./assets/");

        // Load sprite atlas
        this.load.atlasXML("monsterParts", "spritesheet_default.png", "spritesheet_default.xml");
        
        // update instruction text
        document.getElementById('description').innerHTML = '<h2>Monster.js<br>S - smile // F - show fangs<br>A - move left // D - move right</h2>'
    }

    create() {
        let my = this.my;   // create an alias to this.my for readability

        // Create the main body sprite
        //
        // this.add.sprite(x,y, "{atlas key name}", "{name of sprite within atlas}")
        //
        // look in spritesheet_default.xml for the individual sprite names
        // You can also download the asset pack and look in the PNG/default folder.
        my.sprite.body = this.add.sprite(this.bodyX, this.bodyY, "monsterParts", "body_greenD.png");

        // arms
        my.sprite.leftArm = this.add.sprite(this.leftArmX, this.leftArmY, "monsterParts", "arm_greenC.png");
        my.sprite.leftArm.flipX = true;
        my.sprite.leftArm.setAngle(30);

        my.sprite.rightArm = this.add.sprite(this.rightArmX, this.rightArmY, "monsterParts", "arm_redA.png");
        my.sprite.rightArm.setAngle(-30);

        // head
        my.sprite.head = this.add.sprite(this.bodyX, this.headY, "monsterParts", "body_greenF.png");
        my.sprite.head.setScale(0.9);

        // face
        my.sprite.eye = this.add.sprite(this.bodyX, this.eyeY, "monsterParts", "eye_human.png");
        my.sprite.eye1 = this.add.sprite(this.bodyX, this.eyeY, "monsterParts", "eye_cute_light.png");
        my.sprite.closedEye = this.add.sprite(this.bodyX, this.eyeY, "monsterParts", "eye_closed_happy.png");
        my.sprite.closedEye.setScale(1.4);
        my.sprite.eye1.visible = false;
        my.sprite.closedEye.visible = false;

        this.currEye = my.sprite.eye;

        my.sprite.mouth1Open = this.add.sprite(this.bodyX, this.mouth1Y, "monsterParts", "mouthC.png");
        my.sprite.mouth1Closed = this.add.sprite(this.bodyX, this.mouth1Y, "monsterParts", "mouth_closed_happy.png");
        my.sprite.mouth1Closed.visible = false;

        my.sprite.mouth2Open = this.add.sprite(this.bodyX, this.mouth2Y, "monsterParts", "mouthF.png");
        my.sprite.mouth2Closed = this.add.sprite(this.bodyX, this.mouth2Y, "monsterParts", "mouth_closed_fangs.png");
        my.sprite.mouth2Open.visible = false;

        // legs
        my.sprite.leftLeg = this.add.sprite(this.leftLegX, this.leftLegY, "monsterParts", "leg_greenA.png");
        my.sprite.leftLeg.flipX = true;

        my.sprite.rightLeg = this.add.sprite(this.rightLegX, this.rightLegY, "monsterParts", "leg_greenA.png");

        //horns
        my.sprite.rightHorn = this.add.sprite(this.rightHornX, this.hornY, "monsterParts", "detail_dark_horn_large.png");

        my.sprite.leftHorn = this.add.sprite(this.leftHornX, this.hornY, "monsterParts", "detail_white_horn_large.png");
        my.sprite.leftHorn.flipX = true;

        // event handling for expressions

        this.input.keyboard.on("keydown-S", (e) => {
            my.sprite.mouth1Open.visible = true;
            my.sprite.mouth1Closed.visible = false;
            my.sprite.mouth2Open.visible = false;
            my.sprite.mouth2Closed.visible = true;
        });

        this.input.keyboard.on("keydown-F", (e) => {
            my.sprite.mouth1Open.visible = false;
            my.sprite.mouth1Closed.visible = true;
            my.sprite.mouth2Open.visible = true;
            my.sprite.mouth2Closed.visible = false;
        });

        // key objects for polling
        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    
    }

    update() {
        let my = this.my;    // create an alias to this.my for readability

        ++this.counter;
        if (this.counter > 130) {
            this.currEye.visible = false;
            my.sprite.closedEye.visible = true;
        }
        if (this.counter > 145) {
            this.currEye.visible = true;
            my.sprite.closedEye.visible = false;
            this.counter = 0;
        }

        if (this.aKey.isDown) {
            for (let key in my.sprite) {
                //console.log(key);
                if (my.sprite.body.x > 0) {
                    --my.sprite[key].x;
                }
            }
        }

        if (this.dKey.isDown) {
            for (let key in my.sprite) {
                if (my.sprite.body.x < 800) {
                    ++my.sprite[key].x;
                }
            }
        }
       
    }

}