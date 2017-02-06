# resume

A multi-language supported resume generator. 

## Online Usage

You can just fork this repo and change these json files, then an online github-pages static resume is avaliable.

An online DEMO (also used as my own online resume) [https://jasonapeman.github.io/resume/](https://jasonapeman.github.io/resume/)

## Offline Rendering

Also, this resume is avaliable for offline use.

You can clone this repo and change these json files as you like, then run the following scripts if you have node.js and npm enviroment:

    npm install

    node renderResume.js

Then html resume files will be done in the "render" directory, which are also can be printed into pdf files by your browser.

## JSON File Usage

### config.json

See the following example:

    {
        "lang":{
            "en":{
                "constStr":"./constStr_en.json",
                "content":"./content_en.json"
            },
            "cn":{
                "constStr":"./constStr_cn.json",
                "content":"./content_cn.json"
            }
        },
        "defaultLang":"en"
    }

The object "lang" is a set of languages you want, in each sub-object, the directory of config files of the language is declared.

The "defaultLang" is the default language you want to show in your online github-pages static resume. And the online version has a front-end router which can swith the display language, for example, if you want the chinese version, visit "/#/cn" route.

### Content JSON file

It is where you can set up the content of your resume, including your name, contact, education, skill and projects.

### ConstStr JSON file

It decides the static strings of the current language.