var Bullet = function(context, owner, type, dir) {
    //子弹。
    this.ctx = context;
    this.x = 0;
    this.y = 0;
    this.owner = owner; //子弹的所属者
    this.type = type; //1、玩家  2、敌方
    this.dir = dir;//方向。
    this.speed = 3;//速度。
    this.size = 6;//大小。
    this.hit = false;//撞击。
    this.isDestroyed = false;

    this.draw = function() {
        this.ctx.drawImage(RESOURCE_IMAGE, POS["bullet"][0] + this.dir * this.size, POS["bullet"][1], this.size, this.size, this.x, this.y, this.size, this.size);
        this.move();
    };

    this.move = function() {
        if (this.dir == UP) {
            this.y -= this.speed;
        } else if (this.dir == DOWN) {
            this.y += this.speed;
        } else if (this.dir == RIGHT) {
            this.x += this.speed;
        } else if (this.dir == LEFT) {
            this.x -= this.speed;
        }

        this.isHit();
    };

    /**
     * 碰撞检测
     */
    this.isHit = function() {
        if (this.isDestroyed) {
            return;
        }
        //临界检测
        if (this.x < map.offsetX) {
            this.x = map.offsetX;
            this.hit = true;
        } else if (this.x > map.offsetX + map.mapWidth - this.size) {
            this.x = map.offsetX + map.mapWidth - this.size;
            this.hit = true;
        }
        if (this.y < map.offsetY) {
            this.y = map.offsetY;
            this.hit = true;
        } else if (this.y > map.offsetY + map.mapHeight - this.size) {
            this.y = map.offsetY + map.mapHeight - this.size;
            this.hit = true;
        }
        //子弹是否碰撞了其他子弹
        if (!this.hit) {
            if (bulletArray != null && bulletArray.length > 0) {
                for (var i = 0; i < bulletArray.length; i++) {
                    if (bulletArray[i] != this && this.owner.isAI != bulletArray[i].owner.isAI && bulletArray[i].hit == false && CheckIntersect(bulletArray[i], this, 0)) {
                        this.hit = true;
                        bulletArray[i].hit = true;
                        break;
                    }
                }
            }
        }

        if (!this.hit) {
            //地图检测
            if (bulletMapCollision(this, map)) {
                this.hit = true;
            }
            //是否击中坦克
            if (this.type == BULLET_TYPE_PLAYER) {
                //子弹属于我方坦克。
                if (enemyArray != null || enemyArray.length > 0) {
                    //有敌人。
                    for (var i = 0; i < enemyArray.length; i++) {
                        var enemyObj = enemyArray[i];
                        if (!enemyObj.isDestroyed && CheckIntersect(this, enemyObj, 0)) {
                            CheckIntersect(this, enemyObj, 0);
                            //碰撞检测。
                            if (enemyObj.lives > 1) {
                                //生命值。
                                enemyObj.lives--;
                            } else {
                                enemyObj.distroy();
                                //消亡
                            }
                            this.hit = true;
                            break;
                        }
                    }
                }
            } else if (this.type == BULLET_TYPE_ENEMY) {
                //子弹属于敌方坦克。
                if (player1.lives > 0 && CheckIntersect(this, player1, 0)) {
                    if (!player1.isProtected && !player1.isDestroyed) {
                        //1号玩家没有护盾，没有破坏。
                        player1.distroy();
                        //1号玩家破坏。
                    }
                    this.hit = true;
                } else if (player2.lives > 0 && CheckIntersect(this, player2, 0)) {
                    if (!player2.isProtected && !player2.isDestroyed) {
                        player2.distroy();
                    }
                    this.hit = true;
                }
            }
        }


        if (this.hit) {
            this.distroy();
        }
    };

    /**
     * 销毁
     */
    this.distroy = function() {
        this.isDestroyed = true;
        crackArray.push(new CrackAnimation(CRACK_TYPE_BULLET, this.ctx, this));
        //添加裂纹动画,裂纹类型子弹。
        if (!this.owner.isAI) {
            //播放子弹销毁的声音。
            BULLET_DESTROY_AUDIO.play();
        }
    };


};