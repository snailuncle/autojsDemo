
"ui";
ui.layout(
	<frame id="container" gravity="center">
		<text id="info" w="*" h="auto" gravity="right"/>
	</frame>
);
var vc = android.view.VelocityTracker.obtain();
var pc = new android.view.MotionEvent.PointerCoords();
ui.container.setOnTouchListener(function(v, e) {
	try {
		var i, c, id, r = ["ACTION:" + e.actionToString(e.action)];
		vc.addMovement(e);
		switch (e.action) {
			case e.ACTION_DOWN:
			case e.ACTION_MOVE:
			case e.ACTION_UP:
			c = e.getPointerCount();
			vc.computeCurrentVelocity(1000);
			for (i = 0; i < c; i++) {
				id = e.getPointerId(i);
				e.getPointerCoords(i, pc);
				r.push(
					"X_" + id + ":" + pc.x.toFixed(5),
					"Y_" + id + ":" + pc.y.toFixed(5),
					"VelocityX_" + id + ":" + vc.getXVelocity(id).toFixed(5),
					"VelocityY_" + id + ":" + vc.getYVelocity(id).toFixed(5),
					"Pressure_" + id + ":" + pc.pressure.toFixed(5),
					"Size_" + id + ":" + pc.size.toFixed(5),
					"ToolMajor_" + id + ":" + pc.toolMajor.toFixed(5),
					"ToolMinor_" + id + ":" + pc.toolMinor.toFixed(5),
					"TouchMajor_" + id + ":" + pc.touchMajor.toFixed(5),
					"TouchMinor_" + id + ":" + pc.touchMinor.toFixed(5)
				);
			}
		}
		r = r.join("\n");
		ui.info.text(r);
		console.log(r);
	} catch(e) {
		console.error(e + "\n" + e.stack);
	}
	return true;
});
