
# Automation Framework for Broker Page

Framework for automation tests created using WebdriverIO, Mocha and Typescript


## Installation

This project is tested on Node v20.16.0. While earlier versions of node may be compatible, but they have not been verified.

Node.JS: Install from the site - https://nodejs.org/en/ take the LTS version based on your Operating system. Please make sure you install NodeJS globally.

The project also uses Typescript v 5.5. While earlier versions of node may be compatible, but they have not been verified.
Install Typescript globally via npm in terminal
```bash
npm install -g typescript
```

Clone the project
```bash
  git clone https://github.com/lokpimkd/kincarta.git
```
Go to project directory
```bash
  cd kincarta
```
Install dependencies
```bash
  npm install
```
## Usage/Examples
The framework currently is setup to run only on chrome, if you wish to run on edge or firefox change the following line in `wdio.conf.ts` file
```javascript
    capabilities: [{
        browserName: 'chrome'
    }],
```
For Edge:
```javascript
    capabilities: [{
        browserName: 'edge'
    }],
```
For Firefox:
```javascript
    capabilities: [{
        browserName: 'firefox'
    }],
```
## Running Tests

To run tests, run the following command

```bash
  wdio run ./wdio.conf.ts
```


## Known Limitations

When a change of result is happening in the ag-grid in scenarios such as showing the results after a broken is searched, or clearing the results the DOM of the page is being updated very slowly. The only way to handle this was with `browser.pause()` which is not ideal, but the functions from WebdriverIO such as `waitFor...` were not helpfull and were returning the incorect element state.
In rare cases were test might fail on your local machine because of this increment the browser pause a bit

## Test Results
![image](https://github.com/user-attachments/assets/b47b14b2-95c1-4289-92eb-6566dbbb2647)
