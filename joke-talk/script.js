const programmingButton = document.getElementById('programming-button');
const miscellaneousButton = document.getElementById('miscellaneous-button');
const darkButton = document.getElementById('dark-button');
const punButton = document.getElementById('pun-button');

const buttons = document.getElementsByTagName('button');
const audioElement = document.getElementById('audio');


const toggleJokeButton = () => {
    let btn;
    let i=0;
    while(btn = buttons[i++]){
        btn.disabled = !btn.disabled
    }
}

//Passing Joke to VoiceRSS API
const tellMeAJoke = (joke) => {
    VoiceRSS.speech({
        key: '8facf20c9d684b01a8bdbf8b7f24eac5',
        src: joke,
        hl: 'en-us',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit-stereo',
        ssml: false
    });
}

const getJokesFromAPI = async (jokeCategory) => {
    let joke = '';
    const apiUrl = `https://sv443.net/jokeapi/v2/joke/${jokeCategory}?blacklistFlags=nsfw,religious,political,racist,sexist`
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if(data.setup){
            joke = `${data.setup} ... ${data.delivery}`
        } else {
            joke = data.joke;
        }
      
        tellMeAJoke(joke)
        toggleJokeButton();

    } catch(err) {
        console.log('Something went wrong', err)
    } 
}

programmingButton.addEventListener('click', () => {
    getJokesFromAPI("Programming")
})
miscellaneousButton.addEventListener('click', () => {
    getJokesFromAPI("Miscellaneous")
})
darkButton.addEventListener('click', () => {
    getJokesFromAPI("Dark")
})
punButton.addEventListener('click', () => {
    getJokesFromAPI("Pun")
})

audioElement.addEventListener('ended', toggleJokeButton)