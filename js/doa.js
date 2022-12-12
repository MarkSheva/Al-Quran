function getDoa(){
    fetch(`https://doa-doa-api-ahmadramadhan.fly.dev/api`)
        .then(response => response.json())
        .then(response =>  {
            let cardDoa = '';
            response.forEach(surat => {
                cardDoa += `
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