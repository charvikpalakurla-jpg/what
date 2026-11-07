namespace SpriteKind {
    export const Monster = SpriteKind.create()
    export const Key = SpriteKind.create()
    export const Exit = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Exit, function (p, d) {
    if (canEscape) {
        game.over(true, effects.confetti)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Key, function (p, k) {
    k.destroy()
    collected += 1
    info.changeScoreBy(100)
    if (collected == 3) {
        canEscape = true
        game.showLongText("ALL KEYS FOUND! FIND THE EXIT!", DialogLayout.Bottom)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Monster, function (p, m) {
    if (!(hitCooldown)) {
        hitCooldown = true
        info.changeLifeBy(-1)
        if (info.life() > 0) {
            p.setPosition(15, 15)
        }
        pause(500)
        hitCooldown = false
    }
})
let distance = 0
let dy = 0
let dx = 0
let hitCooldown = false
let collected = 0
let canEscape = false
scene.setBackgroundColor(15)
let player2 = sprites.create(img`
    . . . 8 8 . . 
    . . 8 9 9 8 . 
    . . 8 9 9 8 . 
    . . . 8 8 . . 
    . . 2 2 2 2 . 
    . . 2 . . 2 . 
    . . 2 . . 2 . 
    `, SpriteKind.Player)
controller.moveSprite(player2, 85, 85)
player2.setStayInScreen(true)
info.setLife(3)
info.setScore(0)
let monster = sprites.create(img`
    . . 5 5 5 5 . . 
    . 5 5 5 5 5 5 . 
    5 5 1 5 5 1 5 5 
    5 5 5 5 5 5 5 5 
    . 5 5 1 1 5 5 . 
    . . 5 5 5 5 . . 
    . 5 . 5 5 . 5 . 
    `, SpriteKind.Monster)
monster.setPosition(135, 100)
let keys = [sprites.create(img`
    . . 4 4 4 . . 
    . . 4 . . . . 
    . . 4 4 4 . . 
    . . 4 . . . . 
    . . 4 4 4 . . 
    `, SpriteKind.Key), sprites.create(img`
    . . 4 4 4 . . 
    . . 4 . . . . 
    . . 4 4 4 . . 
    . . 4 . . . . 
    . . 4 4 4 . . 
    `, SpriteKind.Key), sprites.create(img`
    . . 4 4 4 . . 
    . . 4 . . . . 
    . . 4 4 4 . . 
    . . 4 . . . . 
    . . 4 4 4 . . 
    `, SpriteKind.Key)]
keys[0].setPosition(35, 30)
keys[1].setPosition(125, 35)
keys[2].setPosition(75, 105)
let door = sprites.create(img`
    6 6 6 6 6 6 6 
    6 1 1 1 1 1 6 
    6 1 1 1 1 1 6 
    6 1 1 1 1 1 6 
    6 1 1 1 1 1 6 
    6 1 1 1 1 1 6 
    6 6 6 6 6 6 6 
    `, SpriteKind.Exit)
door.setPosition(145, 105)
game.splash("DEAD", "THE HOSPITAL IS WAITING...")
game.onUpdateInterval(100, function () {
    dx = player2.x - monster.x
    dy = player2.y - monster.y
    distance = Math.sqrt(dx * dx + dy * dy)
    if (distance > 0) {
        monster.vx = dx / distance * 28
        monster.vy = dy / distance * 28
    }
})
