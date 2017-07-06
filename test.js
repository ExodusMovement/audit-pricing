import test from 'ava'
import fetch from 'node-fetch'
import { histoDay } from 'cryptocompare'
global.fetch = fetch

const HISTO_DAYS = 500
// Skipping DOGE here
const cryptos = ['REP', 'BTC', 'DASH', 'DCR', 'ETH', 'ETC', 'GNT', 'LTC']
const fiats = ['USD', 'EUR', 'GBP', 'CAD']

for (const crypto of cryptos) {
  for (const fiat of fiats) {
    test(`cryptocompare: ${crypto}/${fiat}`, async t => {
      const data = await histoDay(crypto, fiat, {
        limit: HISTO_DAYS,
        // Locking in the timestamp so data shouldn't change
        timestamp: new Date('2017-07-05')
      })
      t.snapshot(data)
    })
  }
}
