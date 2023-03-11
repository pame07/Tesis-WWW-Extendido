import string
import pandas as pd
import langid
from ftfy import fix_text, fix_encoding
import re
import spacy
import pywt

nlp = spacy.load("en_core_web_md")
slp = spacy.load("es_core_news_md")

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
    langid.set_languages(['en','es'])
    result = langid.classify(text)
    code = result[0];
    return code

def deEmojify(text):
    regrex_pattern = re.compile(pattern = "["
        u"\U0001F600-\U0001F64F"  # emoticons
        u"\U0001F300-\U0001F5FF"  # symbols & pictographs
        u"\U0001F680-\U0001F6FF"  # transport & map symbols
        u"\U0001F1E0-\U0001F1FF"  # flags (iOS)
                           "]+", flags = re.UNICODE)
    return regrex_pattern.sub(r'',text)

def embedding_ENG(text):
    extract = nlp(text).vector
    result = DWT(extract)
    final = sum(result)/len(result)
    return final

def embedding_ESP(text):
    extract = slp(text).vector
    result = DWT(extract)
    final = sum(result)/len(result)
    return final

def URL_ratio(text,num):
    size = len(text)
    return (num/size)

def hashtag_ratio(text,num):
    size = len(text)
    return (num/size)

def mention_ratio(text,num):
    size = len(text)
    return (num/size)

def entropy_score(text):
    import math
    log2=lambda x:math.log(x)/math.log(2)
    exr={}
    infoc=0
    for each in text:
        try:
            exr[each]+=1
        except:
            exr[each]=1
    textlen=len(text)
    for k,v in exr.items():
        freq  =  1.0*v/textlen
        infoc+=freq*log2(freq)
    infoc*=-1
    return infoc

def DWT(vector):
    (cA, cB) = pywt.dwt(vector,'db1','antisymmetric')
    #print(len(cA))
    #print(len(cB))
    cA = cA.tolist()    #se hace una transformación de tipo de dato: numpy.float64 -> float
    cB = cB.tolist()
    waveCoef = []

    for num in cA:
        waveCoef.append(num)

    for num in cB:
        waveCoef.append(num)

    #print(waveCoef)
    return(waveCoef)