export interface Credibility {
  credibility: number
}

export interface TextCredibilityWeights {
  weightSpam: number
  weightBadWords: number
  weightMisspelling: number
  weightSemantic: number
}

export interface TweetCredibilityWeights extends TextCredibilityWeights {
  weightText: number
  weightSocial: number
  weightUser: number
}

export interface TwitterUser {
  name: string
  verified: boolean
  yearJoined: number
  followersCount: number
  friendsCount: number
  username: string
}

export interface Tweet {
  text: Text
  user: TwitterUser
}

export interface Text {
  text: string
  lang: Language
}
export type Language = 'es' | 'en' | 'fr'
