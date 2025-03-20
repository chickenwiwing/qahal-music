// JavaScript for the homepage with search functionality

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const songListContainer = document.getElementById('songListContainer');
    
    let allSongs = []; // Will store all songs from the JSON file
    
    // Load songs from JSON file
    fetch('data/songs.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        allSongs = data.songs;
        displaySongs(allSongs);
      })
      .catch(error => {
        console.error('Error fetching songs:', error);
        showError(songListContainer, 'Gagal memuat daftar lagu. Silakan coba lagi nanti.');
      });
    
    // Event listener for search button
    if (searchButton) {
      searchButton.addEventListener('click', function() {
        performSearch();
      });
    }
    
    // Event listener for Enter key on search input
    if (searchInput) {
      searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          performSearch();
        }
      });
    }
    
    // Function to perform search
    function performSearch() {
      const searchTerm = searchInput.value.trim().toLowerCase();
      
      if (searchTerm === '') {
        // If search term is empty, display all songs
        displaySongs(allSongs);
        return;
      }
      
      // Filter songs based on search term
      const filteredSongs = allSongs.filter(song => 
        song.title.toLowerCase().includes(searchTerm) ||
        song.author.toLowerCase().includes(searchTerm) ||
        song.category.toLowerCase().includes(searchTerm)
      );
      
      displaySongs(filteredSongs);
    }
    
    // Function to display songs in the list
    function displaySongs(songs) {
      // Clear the container
      songListContainer.innerHTML = '';
      
      if (songs.length === 0) {
        const noResultsElement = createElement('li', {
          className: 'no-results'
        }, ['Tidak ada lagu yang ditemukan.']);
        songListContainer.appendChild(noResultsElement);
        return;
      }
      
      // Create and append song items
      songs.forEach(song => {
        const songItem = createElement('li', { className: 'song-item' }, [
          createElement('a', { 
            href: `song.html?id=${song.id}`,
            className: 'song-link'
          }, [
            createElement('div', { className: 'song-info' }, [
              createElement('h3', { textContent: song.title }),
              createElement('p', { 
                className: 'song-author',
                textContent: `Penulis: ${song.author}`
              }),
              createElement('p', { 
                className: 'song-category',
                textContent: `Kategori: ${song.category}`
              })
            ])
          ])
        ]);
        
        songListContainer.appendChild(songItem);
      });
    }
  });