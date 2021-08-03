from deep_translator import GoogleTranslator
import spacy
from nltk.corpus import wordnet as wn
import nltk
import re
import gc
import sys

nlp = spacy.load('es_core_news_lg', disable=["ner"]) 

def transl(word):
    translated = GoogleTranslator(source='en', target='es').translate(word)
    return (translated)

def best_match_ES(doc,candidate):
    sc = 0
    for item in candidate:
        new = transl(item)
        wd = nlp(new)
        if doc.similarity(wd) > sc:
            sc = doc.similarity(wd) 
    return sc

def get_score_ES(text):
    doc = nlp(text)
    doc = nlp(' '.join([str(t) for t in doc if not t.is_stop]))
    doc = nlp(' '.join([str(t) for t in doc if t.pos_ in ['NOUN', 'PROPN', 'VERB']]))
    #doc = nlp(' '.join([token.lemma_ for token in doc]))
    string = re.sub(r"(\.)*(\,)*(\;)*",'',doc.text)
    unit = string.split()
    final = []
    for item in unit:
        candidate = []
        syns = wn.synsets(item)
        for i in range(len(syns)):
            candidate.append(syns[i].definition())
            score = best_match_ES(doc,candidate)
            final.append(score)
    scr = 0
    for item in final:
        scr += item
    del doc, unit, candidate, syns
    gc.collect()
    if (len(final) == 0):
        return 0.30
    else:
        return scr/len(final)

""" result = get_score_ES(sys.argv[1])
print(result) """