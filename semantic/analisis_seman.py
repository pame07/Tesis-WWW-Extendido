
import sys 
import gc
from textblob import TextBlob
from clean_text import clean_text
import diccionario as dct
from grammar_check import check_eng, check_esp
from extract_DBpedia_eng import get_entities_eng
from extract_DBpedia_esp import get_entities_esp
import subprocess
import unicodedata as ud


#import semantic_similarity as sim

import os, psutil
process = psutil.Process(os.getpid())

def get_lang(text):
    lang = TextBlob(text)
    return lang.detect_language()

""" def sem_sim_es(text, ent):
    test = subprocess.run(['python','semantic_similarity_es.py',text] + ent, capture_output=True, text=True)
    return (float(test.stdout))

def sem_sim_en(text, ent):
    test = subprocess.run(['python','semantic_similarity_en.py',text] + ent, capture_output=True, text=True)
    return (float(test.stdout))
 """

text = clean_text(sys.argv[1])
print(text)
score = []
#print(get_lang(text))
if get_lang(text) == 'en':
    #print("EN")
    text = dct.add_text(text)
    score.append(check_eng(text))
    ##score.append(check_grammar(text))
    ##ents = dbpedia_eng(text)
    ents = get_entities_eng(text)
    if ents != []:
        from semantic_similarity_en import calculate_simil_eng, eval_verb_EN
        #score.append(sim.calculate_simil_eng(text,ents))
        #score.append(sim.eval_verb_EN(text,ents))
        score.append(calculate_simil_eng(text, ents))
        score.append(eval_verb_EN(text, ents))
        #score.append(0)
    else:
        from seman_eng import get_score_EN
        #considerar sustantivos y verbos para la similitud semántica -se requiere utilizar WordNet-
        score.append(get_score_EN(text))
        #score.append(EN_score(text))
    
    result = sum(score)
    #result = 0
    #for item in score:
    #    result = item + result
    punt = result/len(score)
    print(punt)

elif get_lang(text) == 'es':
    #print("ES")
    #print("Memoria al iniciar: " , process.memory_info().rss)  # in bytes 
    text = dct.agregar_texto(text)
    score.append(check_esp(text))
    #score.append(check_grammar(text))
    #ents = dbpedia_esp(text)
    ents = get_entities_esp(text)
    #print(ents)
    if ents != []:    
        from semantic_similarity_es import calculate_simil_esp, eval_verb_ES 
        #score.append(sim.calculate_simil_esp(text,ents))
        #score.append(sim.eval_verb_ES(text,ents))
        #score.append(sem_sim_es(text, ents))
        #score.append(0)
        score.append(calculate_simil_esp(text, ents))
        score.append(eval_verb_ES(text, ents))
    else:
        from seman_es import get_score_ES
        score.append(get_score_ES(text))
        #score.append(ES_score(text))
    
    result = sum(score)
    #print("Suma de lista score: " , result)
    #result = 0
    #for item in score:
        #result = item + result
    punt = result/len(score)
    print(punt)
        
else:
    print(3)


#print("Memoria: ", process.memory_info().rss)  # in bytes 
