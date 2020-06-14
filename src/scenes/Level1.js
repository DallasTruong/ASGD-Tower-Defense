class Level1 extends Phaser.Scene
{
    constructor()
    {
        super("level1Scene");
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
        this.load.tilemapTiledJSON("level1", "Level1.json");
    }

    create()
    {
        const map=this.add.tilemap("level1");
        const tileset=map.addTilesetImage("colored_packed", "tiles");
        const floorLayer=map.createStaticLayer("Floor", tileset, 0, 0);
        const wallLayer=map.createStaticLayer("Walls", tileset, 0, 0);
        this.menuLayer=map.createStaticLayer("Menu", tileset, 0, 0);
        const UILayer=map.createStaticLayer("UI", tileset, 0, 0);

        wallLayer.setCollisionByProperty({collides:true});

        this.cameras.main.setBounds(0, 16, map.widthInPixels, map.heightInPixels);

        // enable scene switcher / reload keys
        this.swap=this.input.keyboard.addKey('S');
        this.reload=this.input.keyboard.addKey('R');
        this.toggle=this.input.keyboard.addKey('T');
        this.back=this.input.keyboard.addKey('B');
        this.visible=true;

        this.endpoint=map.createFromObjects("Objects", "End",
        {
            key: "kenney_sheet",
            frame: 549
        }, this);
        this.physics.world.enable(this.endpoint, Phaser.Physics.Arcade.STATIC_BODY);
        this.endpoint.map((end)=>
        {
            end.body.setCircle(4).setOffset(4 ,4);
        });

        this.spawnpoint=map.createFromObjects("Objects", "Spawn Point",
        {
            key: "kenney_sheet",
            frame: 401
        }, this);
        this.physics.world.enable(this.spawnpoint, Phaser.Physics.Arcade.STATIC_BODY);
        this.spawnpoint.map((spawn)=>
        {
            spawn.body.setCircle(4).setOffset(4 ,4);
        });

        let enemyconfig=
        {
            runChildUpdate: true
        }
        this.enemies=this.add.group(enemyconfig);
        this.spawnpoint.map((spawn)=>
        {
            let enemy = new Goblin(this, spawn.x, spawn.y, "kenney_sheet", 125);   
            this.enemies.add(enemy);
        });

        this.physics.add.collider(this.enemies, wallLayer);
        this.physics.add.overlap(this.endpoint, this.enemies, (obj1, obj2) => {
            obj2.destroy(); // remove coin on overlap
        });
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
            this.scene.start("testScene");
        }
        if(Phaser.Input.Keyboard.JustDown(this.toggle)&&this.visible==true)
        {
            console.log(this.visible);
            this.menuLayer.setAlpha(0);
            this.visible=false;
            console.log(this.visible);
        }
        else if(Phaser.Input.Keyboard.JustDown(this.back)&&this.visible==false)
        {
            console.log(this.visible);
            this.menuLayer.setAlpha(1);
            this.visible=true;
            console.log(this.visible);
        }
    }
}