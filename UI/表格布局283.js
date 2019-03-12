"ui";
ui.layout(
<frame>
<TableLayout
  layout_width="match_parent"
  layout_height="match_parent"
  stretchColumns="1"
>


<TableRow>
<TextView
    layout_width="wrap_content"
    layout_height="wrap_content"
    text="用户名:"/>
<EditText
    layout_width="match_parent"
    layout_height="wrap_content"
    hint="请输入用户名"/>
</TableRow>

<TableRow>
<TextView
    layout_width="wrap_content"
    layout_height="wrap_content"
    text="密   码:"/>
<EditText
    layout_width="match_parent"
    layout_height="wrap_content"
    hint="请输入密码"
    inputType="textPassword"/>
</TableRow>

<TableRow>
<Button
    layout_height="wrap_content"
    layout_width="wrap_content"
    text="登录"
    layout_span="2"/>
</TableRow>

</TableLayout>
</frame>
)
