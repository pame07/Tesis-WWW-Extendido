import spacy
from seman_eng import best_match_EN
from seman_es import best_match_ES
from nltk.corpus import wordnet as wn
import nltk
import re

nlp = spacy.load('en_core_web_lg', disable=["ner"])
slp = spacy.load('es_core_news_lg', disable=["ner"])

def calculate_simil_eng(tweet,extract):
    text = nlp(tweet)
    main = nlp(' '.join([str(t) for t in text if not t.is_stop]))
    score = 0
    for item in extract:
        dbpedia = nlp(item)
        search = nlp(' '.join([str(t) for t in dbpedia if not t.is_stop]))
        score += main.similarity(search)
        #print(main.similarity(search))
    
    return (score/len(extract))



def calculate_simil_esp(tweet,extract):
    text = slp(tweet)
    main = slp(' '.join([str(t) for t in text if not t.is_stop]))
    score = 0
    for item in extract:
        dbpedia = slp(item)
        search = slp(' '.join([str(t) for t in dbpedia if not t.is_stop]))
        score += main.similarity(search)
        #print(main.similarity(search))

    return (score/len(extract))



def eval_verb_EN(tweet,entities):
    text = nlp(tweet)
    main = nlp(' '.join([str(t) for t in text if t.pos_ in ['VERB']]))
    main = nlp(' '.join([token.lemma_ for token in main]))
    string = re.sub(r"(\.)*(\,)*(\;)*",'',main.text)
    string = string.split()
    final = []
    for ents in entities:
        doc = nlp(ents)
        for item in string:
            candidate = []
            syns = wn.synsets(item)
            for i in range(len(syns)):
                candidate.append(syns[i].definition())
                score = best_match_EN(doc,candidate)
                final.append(score)
    scr = 0
    for item in final:
        scr += item
    return scr/len(final)



def eval_verb_ES(tweet, entities):
    text = slp(tweet)
    main = slp(' '.join([str(t) for t in text if t.pos_ in ['VERB']]))
    main = slp(' '.join([token.lemma_ for token in main]))
    string = re.sub(r"(\.)*(\,)*(\;)*",'',main.text)
    string = string.split()
    final = []
    for ents in entities:
        doc = nlp(ents)
        for item in string:
            candidate = []
            syns = wn.synsets(item)
            for i in range(len(syns)):
                candidate.append(syns[i].definition())
                score = best_match_ES(doc,candidate)
                final.append(score)
    scr = 0
    for item in final:
        scr += item
    return scr/len(final)




