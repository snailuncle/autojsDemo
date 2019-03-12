
var w = floaty.window(
<relative
    layout_width="match_parent"
    layout_height="match_parent"
    background="#ff0000"
    >


    <button
        id="@button_center"
        layout_width="wrap_content"
        layout_height="wrap_content"
        layout_centerInParent="true"
        text="center"/>

    <button
        id="@button_above"
        layout_width="wrap_content"
        layout_height="wrap_content"
        layout_above="@button_center"
        layout_centerInParent="true"
        text="above"/>

    <button
        id="@button_below"
        layout_width="wrap_content"
        layout_height="wrap_content"
        layout_below="@button_center"
        layout_centerInParent="true"
        text="below"/>

    <button
        id="@button_left"
        layout_width="wrap_content"
        layout_height="wrap_content"
        layout_toLeftOf="@button_center"
        layout_centerVertical="true"
        text="left"/>

    <button
        id="@button_right"
        layout_width="wrap_content"
        layout_height="wrap_content"
        layout_toRightOf="@button_center"
        layout_centerVertical="true"
        text="right"/>

</relative>
  );
  w.setSize(1080, 1920)
  sleep(1000)
  setTimeout(()=>{
    w.close();
  }, 3300);


