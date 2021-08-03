import spacy
from seman_es import best_match_ES
from nltk.corpus import wordnet as wn
import nltk
import re
import gc
import sys

slp = spacy.load('es_core_news_lg', disable=["ner"])

def calculate_simil_esp(tweet,extract):
    text = slp(tweet)
    main = slp(' '.join([str(t) for t in text if not t.is_stop]))
    score = 0
    for item in extract:
        dbpedia = slp(item)
        search = slp(' '.join([str(t) for t in dbpedia if not t.is_stop]))
        score += main.similarity(search)
        #print(main.similarity(search))
    gc.collect()
    #print(score/len(extract))
    return (score/len(extract))

def eval_verb_ES(tweet, entities):
    text = slp(tweet)
    main = slp(' '.join([str(t) for t in text if t.pos_ in ['VERB']]))
    main = slp(' '.join([token.lemma_ for token in main]))
    string = re.sub(r"(\.)*(\,)*(\;)*",'',main.text)
    string = string.split()
    final = []
    for ents in entities:
        doc = slp(ents)
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
    if scr == 0:
        return 0
    else:
        return scr/len(final)



#print(calculate_simil_esp(sys.argv[1], sys.argv[2]) + eval_verb_ES(sys.argv[1], sys.argv[2]))
