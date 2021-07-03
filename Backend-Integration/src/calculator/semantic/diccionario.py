import ast
import re
from functools import partial


file1 = open("C:/Users/Pamela/Desktop/Seminario\WWW-code_BackEnd/src/calculator/semantic/dic_es.txt", "r", encoding='utf-8-sig')
file2 = open("C:/Users/Pamela/Desktop/Seminario/WWW-code_BackEnd/src/calculator/semantic/dic_en.txt", "r", encoding='utf-8-sig')

content1 = file1.read()
content2 = file2.read()

dict_es = ast.literal_eval(content1)
dict_en = ast.literal_eval(content2)

file1.close()
file2.close()

def helper(dic, match):
    word = match.group(0)
    return dic.get(word, word)

def agregar_texto(text):
    word_re = re.compile(r'\b[a-zA-Z]+\b')
    new = word_re.sub(partial(helper, dict_en), text)
    return new

def add_text(text):
    word_re = re.compile(r'\b[a-zA-Z]+\b')
    new = word_re.sub(partial(helper, dict_en), text)
    return new
