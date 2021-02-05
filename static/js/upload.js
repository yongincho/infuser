var uploadFiles = [];
var $drop = $("#dropZone");
var file = undefined;

document.getElementById('FILE_TAG').onchange = click_upload;

$drop.on("dragenter", function(e) { //드래그 요소가 들어왔을떄

    $('#file-name').text("Drag and drop your image here or click");
      
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

    if (files.length > 0) {
	  file = files[0];
	  var size = uploadFiles.push(file);
	  $('#file-name').text(file.name);
	  console.log(file);
    }

    //for(var i = 0; i < files.length; i++) {
      //var file = files[i];
      //var size = uploadFiles.push(file); //업로드 목록에 추가
      //console.log(file);
    //}

});

/*
function initMap(latitude, longitude){
    const gps = { lat: 37.3839, lon: 126.6439 };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: gps,
    }); 
    const marker = new google.maps.Marker({
        position: gps,
        map: map,
    });
}
*/

function initMap(latitude, longitude) {
    var position = { lat: parseFloat(latitude) ,lng: parseFloat(longitude) };
    var map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 12,
            center: position
        });
    const marker = new google.maps.Marker({
        position: position,
        map: map,
    });
}

function click_upload(){
    file = document.getElementById("FILE_TAG").files[0];
    $('#file-name').text(file.name);
}

function click_cancel(){
    $('#file-name').text("Drag and drop your image here or click");
}

function click_init(){
    file = undefined;
}

function erase(){
    $('#data01').text("...");
    $('#data02').text("...");
    $('#data03').text("...");
    $('#data1').text("...");
    $('#data2').text("...");
    $('#data3').text("...");
    $('#data4').text("...");
    $('#data5').text("...");
    $('#data6').text("...");
    $('#data7').text("...");
    $('#data8').text("...");
    $('#data9').text("...");
    $('#data10').text("...");
    $('#data11').text("...");
    $('#data12').text("...");
    $('#data13').text("...");
    $('#data14').text("...");
    $('#data15').text("...");
    $('#data16').text("...");
    $('#data17').text("...");
    $('#data18').text("...");
    $('#data19').text("...");
    $('#data20').text("...");
    $('#data21').text("...");
    $('#data22').text("...");
    $('#data23').text("...");
    $('#data24').text("...");
    $('#data25').text("...");
    $('#data26').text("...");
    $('#data27').text("...");
    $('#data28').text("...");
    $('#data29').text("...");
    $('#data30').text("...");
    $('#data31').text("...");
    $('#data32').text("...");
    $('#data33').text("...");
    $('#data34').text("...");
    $('#data35').text("...");
    $('#data36').text("...");
    $('#data37').text("...");
    $('#data38').text("...");
    $('#data39').text("...");
    $('#data40').text("...");
}


function upload(){

    erase();
    
    var form = $('#FILE_FORM')[0];
    var data = new FormData(form);

    data.append("file", file);
    
    //console.log(data);

    $.ajax({
	    url: 'http://infuser.app/request/',
	    processData: false,
	    contentType: false,
	    data: data,
	    type: 'POST',
	    success: function(result){
		//alert(result);
        if (result["Result Code"] != 1) {
            alert(result["Message"]);
        }
        else {
            console.log(result);
            $('#staticBackdrop').modal('show');
            $('#staticBackdropLabel').text(file["name"]);
            initMap(result["Latitude"], result["Longitude"]);
            $('#data01').text(file["name"]);
            $('#data02').text(file["type"]);
            $('#data03').text(file["size"]);
            $('#data1').text(result["Make"]);
            $('#data2').text(result["Model"]);
            $('#data3').text(result["ExifImageHeight"]);
            $('#data4').text(result["ExifImageWidth"]);
            $('#data5').text(result["DateTimeOriginal"]);
            $('#data6').text(result["DateTimeDigitized"]);
            $('#data7').text(result["SubsecTimeOriginal"]);
            $('#data8').text(result["SubsecTimeDigitized"]);
            $('#data9').text(file["lastModifiedDate"]);
            $('#data10').text(result["Latitude"]);
            $('#data11').text(result["Longitude"]);
            $('#data12').text(result["36880"]);
            $('#data13').text(result["ApertureValue"]);
            $('#data14').text(result["BrightnessValue"]);
            $('#data15').text(result["ColorSpace"]);
            $('#data16').text(result["ExifOffset"]);
            $('#data17').text(result["ExposureBiasValue"]);
            $('#data18').text(result["ExposureMode"]);
            $('#data19').text(result["ExposureProgram"]);
            $('#data20').text(result["ExposureTime"]);
            $('#data21').text(result["FNumber"]);
            $('#data22').text(result["Flash"]);
            $('#data23').text(result["FocalLength"]);
            $('#data24').text(result["FocalLengthIn35mmFilm"]);
            $('#data25').text(result["ISOSpeedRatings"]);
            $('#data26').text(result["LensMake"]);
            $('#data27').text(result["LensModel"]);
            $('#data28').text(result["LensSpecification"]);
            $('#data29').text(result["MeteringMode"]);
            $('#data30').text(result["Orientation"]);
            $('#data31').text(result["ResolutionUnit"]);
            $('#data32').text(result["SceneCaptureType"]);
            $('#data33').text(result["SensingMethod"]);
            $('#data34').text(result["ShutterSpeedValue"]);
            $('#data35').text(result["Software"]);
            $('#data36').text(result["SubjectLocation"]);
            $('#data37').text(result["WhiteBalance"]);
            $('#data38').text(result["XResolution"]);
            $('#data39').text(result["YResolution"]);
            $('#data40').text(result["YCbCrPositioning"]);
        }}
	});
}




