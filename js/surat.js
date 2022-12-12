function getURL(e){
    const pageURL = window.location.search.substring(1);
    const urlVariable = pageURL.split('&');

    for(let i = 0; i < urlVariable.length; i++){
        const parameterName = urlVariable[i].split('=');
        if(parameterName[0] == e ){
            return parameterName[1];
        }
    }
}

const nomorsurat = getURL('nomorsurat');

function getSurat(){
    fetch(`https://equran.id/api/surat/${nomorsurat}`)
        .then(response => response.json())
        .then(response => {

            const titleSurat = document.querySelector('#title-surat');
            titleSurat.textContent = `Surat ${response.nama_latin}`;

            const judulSurat = document.querySelector('.judul-surat');
            const cardJudulSurat = `
            <strong class="strong">[${response.nama_latin}]</strong>
            <h2 class="h2">{${response.nama}}</h2>
            <p class="arti">(${response.arti})</p>
            <p>Jumlah ayat: ${response.jumlah_ayat}</p>
              <button class="btn btn-primary audio-button-play">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-play-fill" viewBox="0 0 16 16">
                  <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM6 5.883a.5.5 0 0 1 .757-.429l3.528 2.117a.5.5 0 0 1 0 .858l-3.528 2.117a.5.5 0 0 1-.757-.43V5.884z"/>
                </svg>
              Dengarkan
              </button>
              <button class="btn btn-danger hidden-button audio-button-pause">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stop-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.5 5A1.5 1.5 0 0 0 5 6.5v3A1.5 1.5 0 0 0 6.5 11h3A1.5 1.5 0 0 0 11 9.5v-3A1.5 1.5 0 0 0 9.5 5h-3z"/>
                </svg>
              Stop
              </button>  
              <audio id="audio-tag" src="${response.audio}"></audio> 
            `;
            judulSurat.innerHTML = cardJudulSurat;

            console.log(response.json);


            const surat = response.ayat;
            let isiSurat = '';
            surat.forEach( s => {
                isiSurat += `
                <div class="card mb-4">
                    <div class="card-body">
                        <p>${s.nomor}</p>
                        <h3 class="text-end mb-2">${s.ar}</h3>
                        <p>${s.tr}</p>
                        <p>${s.idn}</p>
                    </div>
                </div>
                `;
            });

            const cardIsiSurat = document.querySelector('.card-isi-surat');
            cardIsiSurat.innerHTML = isiSurat;
            
            const buttonPlay = document.querySelector('.audio-button-play');
            const buttonPause = document.querySelector('.audio-button-pause');
            const audioSurat = document.querySelector('#audio-tag');

            buttonPlay.addEventListener('click', function () {
                buttonPlay.classList.add('hidden-button');
                buttonPause.classList.remove('hidden-button');
                audioSurat.play();
            });

            buttonPause.addEventListener('click', function () {
                buttonPause.classList.add('hidden-button');
                buttonPlay.classList.remove('hidden-button');
                audioSurat.pause();

            });

            
        });
}

getSurat();