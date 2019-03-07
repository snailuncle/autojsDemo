"ui";
importClass(android.view.View);
auto.waitFor();
auto.setMode('normal');
setInterval(()=>{}, 1000);
threads.start(function () {
	var window = floaty.window(
	    <vertical>
	        <button id="center"  margin="0" w="60">养号</button>
	        <button id="start"   margin="0" w="60">开始</button>
	        <button id="stop"    margin="0" w="60" visibility="gone">停止</button>
	        <button id="console" margin="0" w="60">调试</button>
	        <button id="exit"    margin="0" w="60">退出</button>
	    </vertical>
	);
	window.setPosition(window.getX(), window.getY() + 200);
	var x = 0,
	    y = 0,
	    windowX = 0,
	    windowY = 0,
	    isRuning = false,
	    showConsole = false,
	    isShowingAll = true;

	window.center.setOnTouchListener(function (view, event) {
	    switch (event.getAction()) {
	        case event.ACTION_DOWN:
	            x = event.getRawX();
	            y = event.getRawY();
	            windowX = window.getX();
	            windowY = window.getY();
	            break;
	        case event.ACTION_MOVE:
	            window.setPosition(windowX + (event.getRawX() - x), windowY + (event.getRawY() - y));
	            break;
	        case event.ACTION_UP:
	            if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {
	                ui.run(function () {
	                    if (isShowingAll) {
	                        isShowingAll = false;
	                        window.start.setVisibility(View.GONE);
	                        window.stop.setVisibility(View.GONE);
	                        window.console.setVisibility(View.GONE);
	                        window.exit.setVisibility(View.GONE);
	                    } else {
	                        isShowingAll = true;
	                        if (isRuning) {
	                            window.start.setVisibility(View.GONE);
	                            window.stop.setVisibility(View.VISIBLE);
	                        } else {
	                            window.start.setVisibility(View.VISIBLE);
	                            window.stop.setVisibility(View.GONE);
	                        }
	                        window.console.setVisibility(View.VISIBLE);
	                        window.exit.setVisibility(View.VISIBLE);
	                    }
	                });
	            }
	            break;
	    }
	    return true;
	});
	window.start.click(function () {
	    isRuning = true;
	    ui.run(function () {
	        window.start.setVisibility(View.GONE);
	        window.stop.setVisibility(View.VISIBLE);
	    });
	    startAuto();
	});
	function stopAuto () {
	    isRuning = false;
	    ui.run(function () {
	        window.start.setVisibility(View.VISIBLE);
	        window.stop.setVisibility(View.GONE);
	    });
	    threads.shutDownAll();
	}
	window.stop.click(stopAuto);
	window.console.click(function () {
	    threads.start(function () {
	        if (showConsole == false) {
	            showConsole = true;
	            console.show();
	        } else {
	            showConsole = false;
	            console.hide();
	        }
	    });
	});
	window.exit.click(function () {
	    exit();
	});
});
