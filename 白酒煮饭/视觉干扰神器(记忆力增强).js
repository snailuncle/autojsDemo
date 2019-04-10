var window2 = floaty.rawWindow(
    <frame><linear>
        <button id="action2" text="" w="40" h="40" color="#ffffff" bg="#77000000"/>
   
    </linear> </frame>
);
window2.setTouchable(false);
window2.setPosition(-400,-444);


threads.start(function(){
while(true){
    sleep(1);
    window2.setPosition(random(0,device.width),random(0,device.height));
}
});


while (true) {
    sleep(100);
}