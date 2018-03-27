# audit-pricing

This is a test repo to audit [cryptocompare.com](https://www.cryptocompare.com/)'s historical pricing data. We want to ensure the historical data doesn't change from time to time.

To test, clone the repo and run `npm install`, followed by `npm test`. Tests will fail if the data has changed. To update data, run `npm run update` after running `npm test`, then commit the changes.
