document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.button-with-icon');

    buttons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default link behavior

            // Play a click sound
            const audio = new Audio('sounds/click.mp3');
            audio.play();



            // Transition to the link after 2 seconds
            setTimeout(function() {
                window.location.href = button.href;
            }, 10);
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
  const radio = document.getElementById('radio');
  const stationSelect = document.getElementById('station-select');
  const trackInfo = document.getElementById('track-info');

  stationSelect.addEventListener('change', function() {
    radio.src = stationSelect.value;
    radio.play();
    fetchTrackInfo();
  });

  function fetchTrackInfo() {
    const url = radio.src;
    fetch(url)
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => {
        const icy = new Icy();
        icy.getMetadata(arrayBuffer, (metadata) => {
          const trackTitle = metadata.StreamTitle;
          trackInfo.textContent = trackTitle;
        });
      })
      .catch(error => console.error('Error fetching track info:', error));
  }

  class Icy {
    constructor() {
      this.metadataInterval = 16000; // Default interval for fetching metadata
    }

    getMetadata(arrayBuffer, callback) {
      const reader = new FileReader();
      reader.onload = () => {
        const metadata = this.parseMetadata(reader.result);
        callback(metadata);
      };
      reader.readAsArrayBuffer(arrayBuffer);
    }

    parseMetadata(data) {
      const metadata = {};
      const lines = data.split('\n');
      lines.forEach(line => {
        const [key, value] = line.split(':');
        metadata[key.trim()] = value.trim();
      });
      return metadata;
    }
  }
});

document.addEventListener("DOMContentLoaded", function() {
    var iframe = document.getElementById("myIframe");
    iframe.addEventListener("load", function() {
        if (iframe.contentDocument.location.href === "about:blank") {
            iframe.src = "file:///android_asset/error.html";
        }
    });
});