import { Scene, Math} from 'phaser'

export class Overworld extends Scene {
    constructor() { 
        super({ key: 'Overworld' })
        this.VEL = 100
    }

    preload() {
        this.load.spritesheet('slime', 'slime.png', {
            frameWidth: 16,
            frameHeight: 16,
        })
        this.load.image('tilesetImage', 'tileset.png')
        this.load.tilemapTiledJSON('tilemapJSON', 'area01.json')
    }

    create() {
        const map = this.add.tilemap('tilemapJSON')
        const tileset = map.addTilesetImage('tileset', 'tilesetImage')

        const bgLayer = map.createLayer('background', tileset, 0, 0)
        const terrainLayer = map.createLayer('terrain', tileset, 0, 0)
        const treeLayer = map.createLayer('trees', tileset, 0, 0).setDepth(1)

        this.slime = this.physics.add.sprite(32, 32, 'slime', 0)
        this.anims.create({
            key: 'jiggle',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('slime', {
                start: 0,
                end: 1
            }),
        })
        this.slime.play('jiggle')
        this.slime.body.setCollideWorldBounds(true)
        this.slime.setSize(12,12)

        terrainLayer.setCollisionByProperty({ collides: true })
        treeLayer.setCollisionByProperty({ collides: true })
        this.physics.add.collider(this.slime, terrainLayer)
        this.physics.add.collider(this.slime, treeLayer)

        this.cameras.main.setBounds(0,0, map.widthInPixels, map.heightInPixels)
        this.cameras.main.startFollow(this.slime, true, 0.25, 0.25)
        this.physics.world.bounds.setTo(0, 0, map.widthInPixels, map.heightInPixels)

        this.cursors = this.input.keyboard.createCursorKeys()
    }
    

    update() {
        this.direction = new Math.Vector2(0)
        if (this.cursors.left.isDown) {
            this.direction.x -= 1
        } else if (this.cursors.right.isDown) {
            this.direction.x += 1
        }
        if (this.cursors.up.isDown) {
            this.direction.y -= 1
        } else if (this.cursors.down.isDown) {
            this.direction.y += 1
        }
        this.direction.normalize()
        this.slime.setVelocity(this.direction.x * this.VEL, this.direction.y * this.VEL)
    }
}