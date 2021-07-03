import re

def clean_text(tweet):
    newText = deEmojify(removeURL(removeMention(removeHashtag(tweet))))
    aux = newText.split()
    string = ' '.join(aux)
    return string

""" def int_removeHashtag(text):
    aux = text.split()
    index = []
    word = []


    prev_word = ""

    for i in range(len(aux)):
        if aux[i].find("#") != -1:
            word.append(aux[i])
            index.append(i)

    if aux[0].find("#") != -1:
        item =  aux[0]
        if aux[1].find("#") != -1:
            item2 = aux[1]
            aux.remove(item)
            aux.remove(item2)
        else:
            test = aux[1].replace("#","")
            print(test)
 """


def removeHashtag(text):
    string = re.sub(r"#(\w+):",'',text)
    aux = re.sub(r"#(\w+)",'',string)
    #print(string)
    return aux
    
def removeURL(text):
    string = re.sub(r"https?://(?:[-\w.]|(?:%[\da-fA-F]{2}))+|(/[A-Z\da-z\d]*)",'',text)
    return string

def removeMention(text):
    string = re.sub(r"@(\w+)",' ',text)
    return string


def deEmojify(text):
    regrex_pattern = re.compile(pattern = "["
        u"\U0001F600-\U0001F64F"  # emoticons
        u"\U0001F300-\U0001F5FF"  # symbols & pictographs
        u"\U0001F680-\U0001F6FF"  # transport & map symbols
        u"\U0001F1E0-\U0001F1FF"  # flags (iOS)
                           "]+", flags = re.UNICODE)
    return regrex_pattern.sub(r'',text)
