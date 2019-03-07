"ui";
ui.layout(
	<vertical bg="#ffffff" padding="16" >
		<vertical w="*" margin="10" gravity="center">
			<input id="valueHex" gravity="center"/>
			<input id="valueInt" gravity="center"/>
		</vertical>
		<horizontal margin="10">
			<text text="A" w="50px" textColor="black"/>
			<text id="valueA" w="100px" textColor="black" gravity="right"/>
			<seekbar id="seekbarA" w="*" h="*" max="255"/>
		</horizontal>
		<horizontal margin="10">
			<text text="R" w="50px" textColor="black"/>
			<text id="valueR" w="100px" textColor="black" gravity="right"/>
			<seekbar id="seekbarR" w="*" h="*" max="255"/>
		</horizontal>
		<horizontal margin="10">
			<text text="G" w="50px" textColor="black"/>
			<text id="valueG" w="100px" textColor="black" gravity="right"/>
			<seekbar id="seekbarG" w="*" h="*" max="255"/>
		</horizontal>
		<horizontal margin="10">
			<text text="B" w="50px" textColor="black"/>
			<text id="valueB" w="100px" textColor="black" gravity="right"/>
			<seekbar id="seekbarB" w="*" h="*" max="255"/>
		</horizontal>
		<img w="*" h="*" margin="10" id="preview" />
	</vertical>
);
function getBWGridDrawable(size, color1, color2) {
	var baseBmp = android.graphics.Bitmap.createBitmap(size * 2, size * 2, android.graphics.Bitmap.Config.ARGB_8888);
	var cv = new android.graphics.Canvas(baseBmp);
	var paint = new android.graphics.Paint();
	paint.setColor(color1);
	cv.drawRect(0, 0, size, size, paint);
	cv.drawRect(size, size, size * 2, size * 2, paint);
	paint.setColor(color2);
	cv.drawRect(0, size, size, size * 2, paint);
	cv.drawRect(size, 0, size * 2, size, paint);
	var drawable = new android.graphics.drawable.BitmapDrawable(activity.getResources(), baseBmp);
	drawable.setTileModeXY(android.graphics.Shader.TileMode.REPEAT, android.graphics.Shader.TileMode.REPEAT);
	return drawable;
}
var c = [0xff, 0xff, 0, 0];
var updating = false;
var colorDrawable = new android.graphics.drawable.ColorDrawable();
function update(source) {
	var colorInt;
	if (updating) return;
	updating = true;
	colorInt = colors.argb.apply(colors, c);
	if (source != 1) {
		ui.valueHex.setError(null);
		ui.valueHex.setText(colors.toString(colorInt));
	}
	if (source != 2) {
		ui.valueInt.setError(null);
		ui.valueInt.setText(String(colorInt));
	}
	if (source != 3) {
		ui.seekbarA.progress = c[0];
		ui.seekbarR.progress = c[1];
		ui.seekbarG.progress = c[2];
		ui.seekbarB.progress = c[3];
	}
	ui.valueA.setText(String(c[0]));
	ui.valueR.setText(String(c[1]));
	ui.valueG.setText(String(c[2]));
	ui.valueB.setText(String(c[3]));
	colorDrawable.setColor(colorInt);
	ui.preview.setImageDrawable(colorDrawable);
	updating = false;
}
ui.valueHex.addTextChangedListener(new android.text.TextWatcher({
	afterTextChanged : function(s) {try {
		if (updating) return;
		var result = NaN;
		try {
			result = colors.parseColor(s);
		} catch(e) {}
		if (isNaN(result)) {
			ui.valueHex.setError("不合法的颜色代码");
		} else {
			ui.valueHex.setError(null);
			c[0] = colors.alpha(result);
			c[1] = colors.red(result);
			c[2] = colors.green(result);
			c[3] = colors.blue(result);
			update(1);
		}
	} catch(e) {console.error(e)}}
}));
ui.valueInt.addTextChangedListener(new android.text.TextWatcher({
	afterTextChanged : function(s) {try {
		if (updating) return;
		var result = parseInt(s);
		if (isNaN(result)) {
			ui.valueInt.setError("不是数字");
		} else {
			ui.valueInt.setError(null);
			c[0] = colors.alpha(result);
			c[1] = colors.red(result);
			c[2] = colors.green(result);
			c[3] = colors.blue(result);
			update(2);
		}
	} catch(e) {console.error(e)}}
}));
var seekbarListener = new android.widget.SeekBar.OnSeekBarChangeListener({
	onProgressChanged : function(v, progress, fromUser) {try {
		if (updating) return;
		if (v == ui.seekbarA) {
			c[0] = progress;
		} else if (v == ui.seekbarR) {
			c[1] = progress;
		} else if (v == ui.seekbarG) {
			c[2] = progress;
		} else if (v == ui.seekbarB) {
			c[3] = progress;
		}
		update(3);
	} catch(e) {console.error(e)}}
});
ui.seekbarA.setOnSeekBarChangeListener(seekbarListener);
ui.seekbarR.setOnSeekBarChangeListener(seekbarListener);
ui.seekbarG.setOnSeekBarChangeListener(seekbarListener);
ui.seekbarB.setOnSeekBarChangeListener(seekbarListener);
ui.preview.setScaleType(android.widget.ImageView.ScaleType.FIT_XY);
ui.preview.setBackgroundDrawable(getBWGridDrawable(20, colors.GRAY, colors.WHITE));
ui.preview.setImageDrawable(colorDrawable);
update(0);
// 代码 by ProjectXero  UI by 生僻字
