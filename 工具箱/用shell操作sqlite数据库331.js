auto();
console.show()
//更新日期: 2018.7.13
//作者QQ: 203118908
//脚本目的: 使用shell方式来操作sqlite数据库


DBFile="/sdcard/中国省市数据库资料.sqlite"
SQLCommandHeader="sqlite3" + " " + DBFile

//创建数据库
shell(SQLCommandHeader + ' \'CREATE TABLE "中国城市" ("城市ID" INT NOT NULL, "城市名称" VARCHAR(50) PRIMARY KEY, "省属");\'' + " '.quit'")


//增
shell(SQLCommandHeader + ' \'insert into 中国城市 values(1,"北京市","北京市");\' ' + " '.quit'")
shell(SQLCommandHeader + ' \'insert into 中国城市 values(2,"太原市","山西省");\' ' + " '.quit'")
shell(SQLCommandHeader + ' \'insert into 中国城市 values(3,"石家庄市","河北省");\' ' + " '.quit'")


//删
shell(SQLCommandHeader + ' \'delete from 中国城市 where 城市id=1;\' ' + " '.quit'")


//改
shell(SQLCommandHeader + ' \'update 中国城市 set 省属="山西省" where 城市名称="石家庄市";\' ' + " '.quit'")


//查
log("\n",shell(SQLCommandHeader +" '.mode column'"+" '.headers on'"+ ' \'select * from 中国城市;\' ' + " '.quit'").result)
log("\n",shell(SQLCommandHeader +" '.mode column'"+" '.headers on'"+" '.output /sdcard/中国城市.txt'"+ ' \'select * from 中国城市;\' ' + " '.quit'").result)


