var obj_text = textMatches(".*");
var obj_desc = descMatches(".*");
sleep(3000);
for (let i = 0; i < obj_text.find().size(); i++) {
	log(obj_text.find().get(i).text())
}
for (let i = 0; i < obj_desc.find().size(); i++) {
	log(obj_desc.find().get(i).desc())
}