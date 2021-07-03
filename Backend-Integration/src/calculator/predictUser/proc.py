import pandas as pd
import langid  
from ftfy import fix_text, fix_encoding
import re

def fix(tweet):
    try:
        text = fix_text(fix_encoding(tweet))

    except:
        text = tweet    
    return text


def preprocess(text):
    try:
        removePunct = re.sub(r"[.$%^&*>-/#@:()]",'',text)
        sentence = removePunct.split()
        result = ' '.join(sentence)
        return result
    except:
        return text

def lang_detection(text):
    try:
        aux = langid.classify(text)
        lang = aux[0]
    except:
        lang = "unknown"
    finally:
        return(lang)

ds = pd.read_csv("dataset_genuineES.csv", engine= 'python')
ds.iloc[:, 0] = ds.iloc[:, 0].apply(fix)
ds['clean'] = ds.iloc[:, 0].apply(preprocess)

ds.to_csv('genuine_ESP.csv', encoding='utf-8-sig')


