
var uploadFiles = [];
var $drop = $("#dropZone");

$drop.on("dragenter", function(e) { //드래그 요소가 들어왔을떄

    $(this).addClass('drag-over');
    }).on("dragleave", function(e) { //드래그 요소가 나갔을때

    $(this).removeClass('drag-over');
    }).on("dragover", function(e) {
        e.stopPropagation();
        e.preventDefault();
    }).on('drop', function(e) { //드래그한 항목을 떨어뜨렸을때
    e.preventDefault();

    $(this).removeClass('drag-over');

    var files = e.originalEvent.dataTransfer.files; //드래그&드랍 항목

    for(var i = 0; i < files.length; i++) {
        var file = files[i];
        var size = uploadFiles.push(file); //업로드 목록에 추가
        console.log(file); 
    }

});
