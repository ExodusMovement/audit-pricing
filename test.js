import test from 'ava'
import fs from 'fs-extra'
import fetch from 'node-fetch'
import stringify from 'json-stable-stringify'
import { histoDay } from 'cryptocompare'
global.fetch = fetch

const HISTO_DAYS = 500
const cryptos = ['REP', 'BTC', 'BCH', 'DASH', 'DCR', 'ETH', 'ETC', 'GNT', 'LTC', 'XRP', 'OMG']
const fiats = ['USD', 'EUR', 'GBP', 'CAD']

for (const crypto of cryptos) {
  for (const fiat of fiats) {
    test(`cryptocompare: ${crypto}/${fiat}`, async t => {
      const oldData = await fs.readFile(`fixtures/${crypto}/${fiat}`, 'utf8').catch(() => {})
      const data = await histoDay(crypto, fiat, {
        limit: HISTO_DAYS,
        // Locking in the timestamp so data shouldn't change
        timestamp: new Date('2017-10-24')
      })
      const json = stringify(data, { space: 2 })
      await fs.outputFile(`results/${crypto}/${fiat}`, json)
      t.true(oldData === json, `${crypto}/${fiat}`)
    })
  }
}
