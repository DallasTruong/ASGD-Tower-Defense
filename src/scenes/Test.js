class Test extends Phaser.Scene
{
    constructor()
    {
        super("testScene");
    }

    preload()
    {
        this.load.path='./assets/';
        this.load.image("tiles", "colored_packed.png");
        this.load.spritesheet("kenney_sheet", "colored_transparent_packed.png",
        {
            frameWidth: 16,
            frameLength: 16
        });
        this.load.tilemapTiledJSON("testlevel", "Test.json");
    }

    create()
    {
        const map=this.add.tilemap("testlevel");
        const tileset=map.addTilesetImage("colored_packed", "tiles");
        const floorLayer = map.createStaticLayer("Floor", tileset, 0, 0);
        const wallLayer = map.createStaticLayer("Walls", tileset, 0, 0);
        const menuLayer = map.createStaticLayer("Menu", tileset, 0, 0);
        const UILayer = map.createStaticLayer("UI", tileset, 0, 0);

        //groundLayer.setCollisionByProperty({collides:true});

        this.cameras.main.setBounds(0, 16, map.widthInPixels, map.heightInPixels);

        // enable scene switcher / reload keys
        this.swap=this.input.keyboard.addKey('S');
        this.reload=this.input.keyboard.addKey('R');
    }

    update()
    {
        // scene switching / restart
        if(Phaser.Input.Keyboard.JustDown(this.reload))
        {
            this.scene.restart();
        }
        if(Phaser.Input.Keyboard.JustDown(this.swap))
        {
            this.scene.start("level1Scene");
        }
    }
}