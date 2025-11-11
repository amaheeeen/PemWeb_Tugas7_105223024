document.addEventListener('DOMContentLoaded', () => {

    const fetchButton = document.getElementById('fetchButton');
    const loadingDiv = document.getElementById('loading');
    const resultDiv = document.getElementById('result');

    const cardImage = document.getElementById('cardImage');
    const cardValue = document.getElementById('cardValue');
    const cardSuit = document.getElementById('cardSuit');
    const rawJson = document.getElementById('rawJson');

    fetchButton.addEventListener('click', getData);

    function getData() {
        loadingDiv.style.display = 'block';
        resultDiv.style.display = 'none';
        fetchButton.disabled = true;
        fetchButton.textContent = 'Menarik...';

        fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=1')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Gagal mengambil data dari API');
                }
                return response.json();
            })
            .then(data => {
                const drawnCard = data.cards[0];

                displayData(drawnCard);
            })
            .catch(error => {
                console.error('Terjadi kesalahan:', error);
                loadingDiv.textContent = `Error: ${error.message}`;
            })
            .finally(() => {
                loadingDiv.style.display = 'none';
                fetchButton.disabled = false;
                fetchButton.textContent = 'Tarik Kartu Acak';
            });
    }

    function displayData(card) {

        cardImage.src = card.image;
        cardImage.alt = `${card.value} of ${card.suit}`;
        cardValue.textContent = card.value;
        cardSuit.textContent = card.suit;

        rawJson.textContent = JSON.stringify(card, null, 2);

        resultDiv.style.display = 'block';
    }

});