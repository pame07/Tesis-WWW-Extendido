import spacy
from seman_eng import best_match_EN
from nltk.corpus import wordnet as wn
import nltk
import re
import gc
import sys

nlp = spacy.load('en_core_web_lg', disable=["ner"])


def calculate_simil_eng(tweet,extract):
    text = nlp(tweet)
    main = nlp(' '.join([str(t) for t in text if not t.is_stop]))
    score = 0
    for item in extract:
        dbpedia = nlp(item)
        search = nlp(' '.join([str(t) for t in dbpedia if not t.is_stop]))
        score += main.similarity(search)
        #print(main.similarity(search))
    gc.collect()
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
    if scr == 0:
        return 0
    else:
        return scr/len(final)

#print(calculate_simil_eng(sys.argv[1], sys.argv[2]) + eval_verb_EN(sys.argv[1], sys.argv[2]))


