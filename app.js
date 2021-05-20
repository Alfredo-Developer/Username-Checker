const axios = require('axios')
const fs = require('fs')
require('colors')

const { base, limit } = require('./options.json')

let wordlist = []

const startup = async () => {
    wordlist = loadWordList()

    console.log(`Checking ${wordlist.length} words from wordlist.txt\nOutputs will be sent in console\nAvailable names will appear in valid.txt\n`.cyan)

    wordlist.forEach(async (word) => {
        await sendRequest(word).then((response) => {
            if(!response) {
                console.log(`An error occurred whilst checking ${word}`.red)
                return
            }

            if(response.status == 200) {
                console.log(`${word} is taken`.red)
                return
            }

            console.log(`${word} is available`.green)
            writeSuccess(word)
        })
    })
}

const loadWordList = () => {
    return fs.readFileSync("wordlist.txt", "utf-8").replace(/\r/g, "").split('\n')
};

const sendRequest = (name) => {
    return new Promise((resolve, reject) => {
        let url = base.replace('{username}', name)
        axios.get(url, {
            validateStatus: false,
            headers: {
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "fr,en-US;q=0.9,en;q=0.8",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36"
            }
        })
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
}

const writeSuccess = (name) => {
    if(name.length < limit.min || name.length > limit.max) return
    fs.appendFile('valid.txt', `${name}\n`, (err) => {})
}

startup()