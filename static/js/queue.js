const $IconAlbum = document.querySelector('#IconAlbum');
const $PlayIcon = document.querySelector('#playIcon');

function InputMusicAlbums() {
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
       return array;
    }

    const path = "/static/images/songs/"

    const Albums = [
        "californication.jpg",
        "beatles.jpg",
        "damn.jpg",
        "tameImpala.jpg",
        "californication.jpg",
        "nirvana.jpg",
        "thriller.png",
        "blurryface.png",
        "graduation.jpg",
        "AM.jpeg",
    ]
    
    const Album = shuffleArray(Albums)[0] ;

    $IconAlbum.style.backgroundImage = `url("${path}${Album}")`
    $IconAlbum.style.border = 'none';
    $PlayIcon.style.opacity = '.75';
}