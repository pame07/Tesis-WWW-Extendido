import request from 'supertest'
import app from '../../src/app'
import { Credibility, TextCredibilityWeights } from '../../src/calculator/models'

interface PlainTextQueryParams extends TextCredibilityWeights {
  text: string
}

describe('/calculate/plain-text endpoint', () => {
  describe('http 200 calls', () => {
    function testCredibilityWithOkData(
      expectedReturn : Credibility, params: PlainTextQueryParams) {
      return request(app)
        .get('/calculate/plain-text')
        .query(params)
        .expect(200)
        .expect(expectedReturn)
    }
    describe('full bad words criteria', () => {
      const params = {
        weightBadWords: 1,
        weightMisspelling: 0,
        weightSpam: 0,
        lang: 'en'
      }
      it('returns credibility=100 with no bad words', () => {
        return testCredibilityWithOkData({ credibility: 100 }, {
          text: 'yes no',
          ...params
        })
      })

      it('returns credibility=50 with 2 words and 1 bad', () => {
        return testCredibilityWithOkData({ credibility: 50 }, {
          text: 'yes hell',
          ...params
        })
      })

      it('returns credibility=0 with 2 words and 2 bad words', () => {
        return testCredibilityWithOkData({ credibility: 0 }, {
          text: 'hell hell',
          ...params
        })
      })

      it('returns credibility=50 when a bad-word of any language is present', () => {
        return testCredibilityWithOkData({ credibility: 50 }, {
          text: 'puta hi',
          ...params
        })
      })
    })

    describe('full spam criteria', () => {
      const params = {
        weightBadWords: 0,
        weightMisspelling: 0,
        weightSpam: 1,
        lang: 'en'
      }
      it('returns credibility=100 with not spam text', () => {
        return testCredibilityWithOkData({ credibility: 100 }, {
          text: 'Why hello good sir, how are you doing?',
          ...params
        })
      })
      it('returns credibility=0 with spam text', () => {
        return testCredibilityWithOkData({ credibility: 0 }, {
          text: 'YO MAN WATUPPPPP SONN',
          ...params
        })
      })
    })

    describe('full misspelling criteria', () => {
      const params = {
        weightBadWords: 0,
        weightMisspelling: 1,
        weightSpam: 0,
        lang: 'en'
      }
      it('returns credibility=100 when there are no misspells', () => {
        return testCredibilityWithOkData({ credibility: 100 }, {
          text: 'correct phrase with no bad spell',
          ...params
        })
      })
      it('returns credibility=0 when text is fully missspelled', () => {
        return testCredibilityWithOkData({ credibility: 0 }, {
          text: 'corrept phrse wihte nonoon badddd spellsssssss',
          ...params
        })
      })

      it('returns credibility=50 with half misspells and other half correct spelled', () => {
        return testCredibilityWithOkData({ credibility: 50 }, {
          text: 'correct phrss',
          ...params
        })
      })
      it('takes numbers as correct', () => {
        return testCredibilityWithOkData({ credibility: 50 }, {
          text: '2000 phrss',
          ...params
        })
      })
    })

    describe('mixed one', () => {
      const params = {
        weightBadWords: 0.2,
        weightMisspelling: 0.2,
        weightSpam: 0.6,
        lang: 'en'
      }
      it('returns a correct value for mixed calculation', () => {
        // The following `text` is spam (0.6 * 0 = 0),
        // has a misspell (100 - (100 * 1 / 4) = 75, 75 * 0.2 = 15),
        // and doesn't have bad words (100 - (100 * 0 / 4) == 100, 100 * 0.2 = 20)
        jest.setTimeout(10000)
        return testCredibilityWithOkData({ credibility: 35 }, {
          text: 'WATUPPPPP fine sir all',
          ...params
        })
      })
    })

    describe('works with spanish', () => {
      const params = {
        weightBadWords: 0.2,
        weightMisspelling: 0.2,
        weightSpam: 0.6,
        lang: 'es'
      }
      it('returns a correct value for mixed calculation', () => {
        // The following `text` is spam (0.6 * 0 = 0),
        // has a misspell (100 - (100 * 1 / 4) = 75, 75 * 0.2 = 15),
        // and doesn't have bad words (100 - (100 * 0 / 4) == 100, 100 * 0.2 = 20)
        jest.setTimeout(10000)
        return testCredibilityWithOkData({ credibility: 35 }, {
          text: 'jor todo bien amigo',
          ...params
        })
      })

    })
    describe('works with french', () => {
      const params = {
        weightBadWords: 0.2,
        weightMisspelling: 0.2,
        weightSpam: 0.6,
        lang: 'fr'
      }
      it('returns a correct value for mixed calculation', () => {
        // The following `text` is spam (0.6 * 0 = 0),
        // has a misspell (100 - (100 * 1 / 4) = 75, 75 * 0.2 = 15),
        // and doesn't have bad words (100 - (100 * 0 / 4) == 100, 100 * 0.2 = 20)
        jest.setTimeout(10000)
        return testCredibilityWithOkData({ credibility: 35 }, {
          text: 'bae tout bon ami',
          ...params
        })
      })

    })

  })
})
