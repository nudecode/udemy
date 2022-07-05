      const newWord = document.getElementById('get-word');
      const wordEl = document.getElementById('new-word');
      
      function getWord() {
      fetch('words.json')
      .then((res) => res.json())
      .then((data) => {
          const word = data[Math.floor(Math.random() * data.length)];
            // return word;
            addWordToDOM(word);
      });
    }

    // add word to DOM

    function addWordToDOM(word) {
        wordEl.innerHTML = `
        <div id="word" class="word">
        <h1>${word}</h1>
        </div>
    `;
    }

    let selectedWord = wordEl.innerText;
    console.log(selectedWord);
  


    newWord.addEventListener('click', getWord);