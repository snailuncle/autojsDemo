"ui";

ui.layout(
    <frame>
        <text textSize="8px" id="text_img" w="*" h="*" textColor="#000000" typeface="monospace"/> 
    </frame>
);

var str = toText(images.read("/sdcard/1.png"));
//log(str);
ui.text_img.setText(str);

function toGray(color){
    return 0.299 * colors.red(color) + 0.578 * colors.green(color) + 0.114 * colors.blue(color);  
}

function toChar(gray){
    if (gray <= 30) {  
        return "8";
    } else if (gray > 30 && gray <= 60) {  
        return '&';  
    } else if (gray > 60 && gray <= 120) {  
        return '$';  
    }  else if (gray > 120 && gray <= 150) {  
        return '*';  
    } else if (gray > 150 && gray <= 180) {  
        return 'o';  
    } else if (gray > 180 && gray <= 210) {  
        return '!';  
    } else if (gray > 210 && gray <= 240) {  
        return ';';  
    }  else {  
        return ".";  
    }  
}

function toText(image){
    var str = new java.lang.StringBuilder();
    for(var j = 0; j < image.getHeight(); j++){
        for(var i = 0; i < image.getWidth(); i++){
            var color = image.pixel(i, j);
            str.append(toChar(toGray(color)));
        }
        str.append("\n");
    }
    return str;
}

