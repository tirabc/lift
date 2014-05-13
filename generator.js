window.arr = [];
for(var i = 0 ; i< 200000;i++){
    arr.push({
        "id": i,
        "name": "Item #"+i,
        "color": getRandomColor()
    });
}
return (arr);
             
             function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}