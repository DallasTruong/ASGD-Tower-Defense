class Goblin extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y, key, frame)
    {
        super(scene, x, y, key, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.health=200;
        this.movement=50;
        this.damage=1;
    }

    update()
    {
        //Health check
        if(this.health<=0)
        {
            this.destroy();
        }
        if(this.x==40&&this.y==8)
        {
            this.setVelocityY(this.movement)
        }
        if(this.x==40&&this.y==56)
        {
            this.setVelocityY(0);
            this.setVelocityX(this.movement);
        }
        if(this.x==232&&this.y==56)
        {
            this.setVelocityX(0);
            this.setVelocityY(this.movement);
        }
        if(this.x==232&&this.y==120)
        {
            this.setVelocityY(0);
            this.setVelocityX(-this.movement);
        }
        if(this.x==40&&this.y==120)
        {
            this.setVelocityX(0);
            this.setVelocityY(this.movement);
        }
        if(this.x==40&&this.y==200)
        {
            this.setVelocityY(0);
            this.setVelocityX(this.movement);
        }
    }
}