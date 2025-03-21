// JavaScript for the song detail page

document.addEventListener('DOMContentLoaded', function() {
  const songDetailContainer = document.getElementById('songDetail');
  
  // Get song ID from URL parameter
  const songId = getURLParameter('id');
  
  if (!songId) {
    // If no song ID is provided, show error
    showSongNotFound();
    return;
  }
  
  // Load song data from JSON file
  fetch('data/songs.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Find the song with the matching ID
      const song = data.songs.find(s => s.id === parseInt(songId));
      
      if (song) {
        displaySongDetails(song);
      } else {
        showSongNotFound();
      }
    })
    .catch(error => {
      console.error('Error fetching song data:', error);
      showError(songDetailContainer, 'Gagal memuat detail lagu. Silakan coba lagi nanti.');
    });
  
  // Function to display song details
  function displaySongDetails(song) {
    // Clear the container
    songDetailContainer.innerHTML = '';
    
    // Create back button
    const backButton = createElement('a', {
      href: 'index.html',
      className: 'btn-back'
    }, ['← Kembali']);
    
    // Create song title
    const songTitle = createElement('h1', {
      className: 'song-title',
      textContent: song.title
    });
    
    // Create song metadata
    const songMeta = createElement('div', { className: 'song-meta' }, [
      createElement('p', { textContent: `Tahun: ${song.year}` })
    ]);
    
    // Add YouTube link if available
  if (song.youtube) {
      const youtubeIcon = createElement('img', {
          src: 'assets/images/youtube-icon.png', // Path to your custom YouTube icon
          alt: 'YouTube',
          className: 'youtube-icon'
        });
        
        // Create YouTube link with the image icon
        const youtubeLink = createElement('a', {
          href: song.youtube,
          className: 'youtube-link',
          target: '_blank',
          title: 'Tonton di YouTube'
        });
        
        // Append the icon and text to the link
        youtubeLink.appendChild(youtubeIcon);
        youtubeLink.appendChild(document.createTextNode(' Tonton di YouTube'));

      songMeta.appendChild(youtubeLink);
  }
    // Create song lyrics section
    const lyricsSection = createElement('div', { className: 'song-lyrics' }, [
      createElement('h2', { textContent: 'Lirik Lagu' }),
      createElement('pre', { textContent: song.lyrics })
    ]);
    
    // Append all elements to the container
    songDetailContainer.appendChild(backButton);
    songDetailContainer.appendChild(songTitle);
    songDetailContainer.appendChild(songMeta);
    songDetailContainer.appendChild(lyricsSection);
    
    // Update page title
    document.title = `${song.title} - Lirik Lagu Qahal`;
  }
  
  // Function to show "Song Not Found" message
  function showSongNotFound() {
    songDetailContainer.innerHTML = '';
    
    const notFoundContainer = createElement('div', { className: 'song-not-found' }, [
      createElement('h2', { textContent: 'Lagu tidak ditemukan' }),
      createElement('p', { textContent: 'Maaf, lagu yang Anda cari tidak ditemukan.' }),
      createElement('a', {
        href: 'index.html',
        className: 'btn-back'
      }, ['Kembali ke Beranda'])
    ]);
    
    songDetailContainer.appendChild(notFoundContainer);
  }
});