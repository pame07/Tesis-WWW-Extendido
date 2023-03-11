import spacy
from nltk.corpus import wordnet as wn
import nltk
import re
import gc
import sys

nlp = spacy.load('en_core_web_lg', disable=["ner"]) 
   
def get_score_EN(text):
    tweet = nlp(text)
    doc = nlp(' '.join([str(t) for t in tweet if not t.is_stop]))
    string = re.sub(r"(\.)*(\,)*(\;)*",'',doc.text)
    unit = string.split()
    final = []
    for item in unit:
        candidate = []
        syns = wn.synsets(item)
        for i in range(len(syns)):
            candidate.append(syns[i].definition())
            score = best_match_EN(doc,candidate)
            final.append(score)
    scr = 0
    for item in final:
        scr += item
    del tweet, doc, candidate, syns, unit
    gc.collect()
    if (len(final) == 0):
        return 0.30
    else:
        return scr/len(final)
        
def best_match_EN(doc,candidate):
    sc = 0
    for item in candidate:
        wd = nlp(item)
        if doc.similarity(wd) > sc:
            sc = doc.similarity(wd)      
    return sc

""" result = get_score_EN(sys.argv[1])
print(result) """

