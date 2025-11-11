document.addEventListener('DOMContentLoaded', () => {

    const fetchButton = document.getElementById('fetchButton');
    const loadingDiv = document.getElementById('loading');
    const resultDiv = document.getElementById('result');

    // Elemen untuk hasil (disesuaikan dengan HTML baru)
    const quoteContent = document.getElementById('quoteContent');
    const quoteAuthor = document.getElementById('quoteAuthor');
    const rawJson = document.getElementById('rawJson');

    fetchButton.addEventListener('click', getData);

    function getData() {
        loadingDiv.style.display = 'block';
        resultDiv.style.display = 'none';
        fetchButton.disabled = true;
        fetchButton.textContent = 'Memuat...';

        fetch('https://api.quotable.io/random')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Gagal mengambil data dari API');
                }
                return response.json();
            })
            .then(data => {
                displayData(data);
            })
            .catch(error => {
                console.error('Terjadi kesalahan:', error);
                loadingDiv.textContent = `Error: ${error.message}`;
            })
            .finally(() => {
                loadingDiv.style.display = 'none';
                fetchButton.disabled = false;
                fetchButton.textContent = 'Tampilkan Kutipan Baru';
            });
    }

    function displayData(data) {
        
        quoteContent.textContent = data.content;
        quoteAuthor.textContent = data.author;

        rawJson.textContent = JSON.stringify(data, null, 2);

        resultDiv.style.display = 'block';
    }

});