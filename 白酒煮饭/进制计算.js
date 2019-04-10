"ui";
ui.layout(
    <frame>
        <vertical h="auto" align="center" margin="50 50 50 50">
            <linear>
                <text textSize="16sp">二 进 制</text>
                <input id="in_bin" w="150" h="40" singleLine="true" inputType="number" digit="01"/>
                <button id="bin" layout_wweight="1" h="40" text="复制" size="10" style="Widget.AppCompat.Button.Colored"/>
            </linear>
            <linear>
                <text textSize="16sp">八 进 制</text>
                <input id="in_ba" w="150" h="40" singleLine="true" inputType="number" digit="01234567"/>
                <button id="bin" layout_wweight="1" h="40" text="复制" size="10" style="Widget.AppCompat.Button.Colored"/>
            </linear>
            <linear>
                <text textSize="16sp">十 进 制</text>
                <input id="in_ten" w="150" h="40" singleLine="true" inputType="number" digit="01234567"/>
                <button id="ten" layout_wweight="1" h="40" text="复制" size="10" style="Widget.AppCompat.Button.Colored"/>
            </linear>
            <linear>
                <text textSize="14sp">十六进制</text>
                <input id="in_hex" w="150" h="40" singleLine="true" inputType="number" digit="0123456789ABCDEFabcdef"/>
                <button id="hex" layout_wweight="1" h="40" text="复制" size="10" style="Widget.AppCompat.Button.Colored"/>
            </linear>
            <linear gravity="center">
                <horizontal>
                    <button id="clos" w="250" h="*" text="清空" size="16" style="Widget.AppCompat.Button.Colored"/>
                </horizontal>
            </linear>
        </vertical>
    </frame>
);

setInterval(() => {
    if (ui.in_bin.focused) {
        ui.run(() => {
            ui.in_bin.setText(Number(ui.in_hex.text()).toString(2));
            ui.in_ba.setText(Number(ui.in_hex.text()).toString(8));
            ui.in_ten.setText(Number(ui.in_hex.text()).toString(10));
        });
    } else if (ui.in_ba.focused) {
        ui.run(() => {
            ui.in_bin.setText(Number(ui.in_ten.text()).toString(2));
            ui.in_ba.setText(Number(ui.in_ten.text()).toString(8));
            ui.in_hex.setText(Number(ui.in_ten.text()).toString(16));
        });
    } else if (ui.in_ten.focused) {
        ui.run(() => {
            ui.in_bin.setHint(Number(ui.in_ba.text()).toString(2));
            ui.in_ten.setHint(Number(ui.in_ba.text()).toString(10));
            ui.in_hex.setHint(Number(ui.in_ba.text()).toString(16));
        });
    } else if (ui.in_hex.focused) {
        ui.run(() => {
            ui.in_bin.setText(Number(ui.in_hex.text()).toString(2));
            ui.in_ba.setText(Number(ui.in_hex.text()).toString(8));
            ui.in_ten.setText(Number(ui.in_hex.text()).toString(10));
        });
    }
}, 200);
ui.clos.click(function() {
    ui.run(() => {
        ui.in_bin.setText("");
        ui.in_ba.setText("");
        ui.in_ten.setText("");
        ui.in_hex.setText("");
    });
});