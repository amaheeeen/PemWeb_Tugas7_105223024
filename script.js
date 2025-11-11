document.addEventListener('DOMContentLoaded', () => {

    const fetchButton = document.getElementById('fetchButton');
    const loadingDiv = document.getElementById('loading');
    const resultDiv = document.getElementById('result');

    const gameImage = document.getElementById('gameImage');
    const gameTitle = document.getElementById('gameTitle');
    const gameGenre = document.getElementById('gameGenre');
    const gamePlatform = document.getElementById('gamePlatform');
    const gameDescription = document.getElementById('gameDescription');
    const rawJson = document.getElementById('rawJson');

    fetchButton.addEventListener('click', getData);

    function getData() {
        loadingDiv.style.display = 'block';
        resultDiv.style.display = 'none';
        fetchButton.disabled = true;
        fetchButton.textContent = 'Memuat...';

        fetch('https://www.freetogame.com/api/games?platform=pc')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Gagal mengambil data dari API');
                }
                return response.json();
            })
            .then(data => {
                const randomIndex = Math.floor(Math.random() * data.length);
                const randomGame = data[randomIndex];
                
                displayData(randomGame);
            })
            .catch(error => {
                console.error('Terjadi kesalahan:', error);
                loadingDiv.textContent = `Error: ${error.message}`;
            })
            .finally(() => {
                loadingDiv.style.display = 'none';
                fetchButton.disabled = false;
                fetchButton.textContent = 'Tampilkan Game Acak';
            });
    }

    function displayData(game) {
        
        gameImage.src = game.thumbnail;
        gameImage.alt = game.title;
        gameTitle.textContent = game.title;
        gameGenre.textContent = game.genre;
        gamePlatform.textContent = game.platform;
        gameDescription.textContent = game.short_description;

        rawJson.textContent = JSON.stringify(game, null, 2);

        resultDiv.style.display = 'block';
    }

});