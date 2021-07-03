import sys 
from textblob import TextBlob
from clean_text import clean_text
import diccionario as dct
from grammar_check import check_eng, check_esp
from extract_DBpedia_eng import get_entities_eng
from extract_DBpedia_esp import get_entities_esp
from seman_eng import get_score_EN
from seman_es import get_score_ES
import semantic_similarity as sim

def get_lang(text):
    lang = TextBlob(text)
    return lang.detect_language()

print(sys.argv[1])
text = clean_text(sys.argv[1])
score = []
if get_lang(text) == 'en':
    #print("EN")
    text = dct.add_text(text)
    score.append(check_eng(text))
    try:
        ents = get_entities_eng(text)
        score.append(sim.calculate_simil_eng(text,ents))
        score.append(sim.eval_verb_EN(text,ents))
    except:
        #considerar sustantivos y verbos para la similitud semántica -se requiere utilizar WordNet-
        score.append(get_score_EN(text))
    finally:
        result = 0
        for item in score:
            result = item + result
        punt = result/len(score)
        print(punt)

elif get_lang(text) == 'es':
    #print("ES")
    text = dct.agregar_texto(text)
    score.append(check_esp(text))
    try:
        ents = get_entities_esp
        score.append(sim.calculate_simil_esp(text,ents))
        score.append(sim.eval_verb_ES(text,ents))
    except:
        score.append(get_score_ES(text))
    finally:
        result = 0
        for item in score:
            result = item + result
        punt = result/len(score)
        print(punt)
else:
    print(3)
