//Dallas Truong
//ASGD: Tower Defense
//6/11/20
"use strict";

//game config
let gameconfig=
{
    type: Phaser.CANVAS,
    render:
    {
        pixelArt: true
    },
    width: 320,
    height: 320,
    zoom: 2,
    physics:
    {
        default: "arcade",
        arcade:
        {
            //debug: true,
        }
    },
    scene: [Level1, Test]
};

const game=new Phaser.Game(gameconfig);

let cursors=null;