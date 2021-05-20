# Username Checker
Free, open sourced username checker written in NodeJS

Put the words that you would like to check if they are available in the `wordlist.txt` file

Install: https://node.js.org/

1. In the directory type `npm i --save`
2. Then to run the sniper use `node app.js`

By default the checker is configured to check soundcloud usernames. Here is the explanation of the `options.json` file
```
{
    "base": "https://soundcloud.com/{username}",
    "limit": {
        "min": 3,
        "max": 25
    }
}
```

The base is the main url that a request will be sent it. For example github.com/{username}, instagram.com/{username}, etc. The limit is what the username requirement is for the websites. That way there wont be 2 letter usernames that are "valid", or whatever the minimum / maximum requirement is that you have required. Anything outside of the range in the requirements will not appear in the `valid.txt` file.

Sometimes it will appear that a name is valid in `valid.txt`, but when it comes time to change your username to that it won't work. That is because websites are either blocking or reserving that name.

For example. Apparently `woman` is available on Soundcloud, when it is not. 

Tested Sites:
- Soundcloud
- Github
- Instagram

Feel free to test more sites, and if it works. Create a pull request adding that site to the tested sites
