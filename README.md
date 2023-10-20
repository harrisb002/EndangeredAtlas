## More on Project Notes

- Basic steps to get up & running so far (run in sperate terminals):
  1) npm run dev
  2) json-server --watch db.json --port 3001

- For more on running json server use link as reference: https://www.npmjs.com/package/json-server 
    - -  Curently db.json is made assesible on port 3001 using command below: 
    - - json-server --watch db.json --port 3001
    - - Have not yet stored the topology nor the data for all the animals in the mongodb.

- Utilizing react-simple-maps to draw the US. For more on using React Simple maps use link as reference: https://www.react-simple-maps.io/docs/getting-started/

- D3.js is being used for the react map coloring ect: https://d3js.org/getting-started
  - - Will later be used to also render histograms, scatterplots, slider effects, ect...

- Currently employs styled components + a bit of css.

- Utilizes Mongodb for a few animals (later will be used for all the data instead of using the json server, hopefully lol...)

- Stores images as strings (url's) in an array in the mongoose object model. The Url's are stored in an AWS S3 bucket.

- Runs on a nextjs framework so all new "pages" must be located in the pages directory.