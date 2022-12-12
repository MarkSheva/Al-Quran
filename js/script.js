function getSurat(){
    fetch('https://equran.id/api/surat')
        .then(response => response.json())
        .then(response => {
            let cardSurat = '';
            response.forEach(surat => {
                cardSurat += `
                <div class="col-lg-3 col-md-4 col-sm-12">
                <div class="card mb-4 card-surat">
                    <div class="card-body" onclick="location.href='surat.html?nomorsurat=${surat.nomor}' ">
                      <h5 class="card-title">${surat.nomor}. ${surat.nama_latin}</h5>
                      <p class="card-title">${surat.tempat_turun} | Jumlah Ayat: ${surat.jumlah_ayat}</p>
                      <h3 class="card-subtitle mb-2 text-muted text-end">${surat.nama}</h3>
                      <p class="card-text text-end">${surat.arti}</p>
                    </div>
                </div>
                </div>
                `;

            });

            const listSurat = document.querySelector('.card-surat-list');
            listSurat.innerHTML = cardSurat;
            console.log(listSurat);

        });

}

console.log();

getSurat();

function NavBar() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
    x.className += " responsive";
    } else {
    x.className = "topnav";
    }
    }
    window.onscroll = function() {scrollFunction()};
    function scrollFunction() {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    document.getElementById("myTopnav").style.width = "100%";
    document.getElementById("header").style.position = "fixed";
    document.getElementById("header").style.top = "0%";
    } else {
    document.getElementById("myTopnav").style.width = "80%";
    document.getElementById("header").style.position = "absolute";
    document.getElementById("header").style.top = "2rem";
    }
    }
    
    
    
    
    
    
    //NAV BG IMAGE
    var imagesObject = [];
    function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object
    
    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {
    
    // Only process image files.
    if (!f.type.match('image.*')) {
    continue;
    }
    var reader = new FileReader();
    
    // Closure to capture the file information.
    reader.onload = function(e) {
    displayImgData(e.target.result)
    addImage(e.target.result);
    };
    reader.readAsDataURL(f);
    }
    }
    
    function loadFromLocalStorage(){
    var images = JSON.parse(localStorage.getItem("navbg"))
    
    if(images && images.length > 0){
    imagesObject = images;
    images.forEach(displayImgData);
    }
    }
    
    function addImage(imgData){
    imagesObject.push(imgData);
    localStorage.setItem("navbg", JSON.stringify(imagesObject));
     var txt;
      var r = confirm("Do you want to set the same image as body background?");
      if (r == true) {
        document.body.style.backgroundImage = "linear-gradient(rgba(1,1,1,.5), rgba(1,1,1,.5)),url(" + imgData + ")";
        localStorage.setItem("bodybgconfirm","true");
      } else {
        localStorage.setItem("bodybgconfirm","false");
      }
    }
    
    function displayImgData(imgData){
    document.getElementById("myTopnav").style.backgroundImage = "linear-gradient(rgba(1,1,1,.5), rgba(1,1,1,.5)),url(" + imgData + ")";
    var bodybg = localStorage.getItem("bodybgconfirm");
    if(bodybg=="true"){
    document.body.style.backgroundImage = "linear-gradient(rgba(1,1,1,.5), rgba(1,1,1,.5)),url(" + imgData + ")";
    }
    }
    
    document.getElementById('files').addEventListener('change', handleFileSelect, false);
    loadFromLocalStorage();