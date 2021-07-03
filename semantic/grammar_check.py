import language_tool_python


def ignore_rules_ENG(matches):
    cont = 0
    count = 0
    for i in range(len(matches)):
        aux = str(matches[i])
        if aux.find("Rule ID: WANNA") != -1:
            cont += 1
        if aux.find("Rule ID: UPPERCASE_SENTENCE_START") != -1:
            cont += 1
        if aux.find("Rule ID: CAUSE_BECAUSE") != -1:
            cont += 1
        if aux.find("Rule ID: I_LOWERCASE") != -1:
            cont += 1
        if aux.find("Rule ID: MORFOLOGIK_RULE_EN_US") != -1:
            count += 1
        if aux.find("Rule ID: DOUBLE_PUNCTUATION") != -1:
            cont += 1
    if count >= 4:
        cont = cont + count
    if cont > 0:
        for i in range(cont):
            if len(matches) > 1:
                matches.pop()
            else:
                matches.clear()
    else:
        pass


def ignore_rules_ESP(matches):
    cont = 0
    for i in range(len(matches)):
        aux = str(matches[i])
        if aux.find("Rule ID: ES_QUESTION_MARK") != -1:
            cont += 1
        if aux.find("RULE ID: ES_EXCLAMATION_MARK") != -1:
            cont += 1
        if aux.find("Rule ID: UPPERCASE_SENTENCE_START") != -1:
            cont += 1
        if aux.find("Rule ID: DOUBLE_PUNCTUATION") != -1:
            cont += 1
        if aux.find("Rule ID: ONOMATOPEYAS") != -1:
            cont += 1
        if aux.find("Rule ID: ES_UNPAIRED_BRACKETS") != -1:
            cont += 1
    if cont > 0:
        for i in range(cont):
            if len(matches) > 1:
                matches.pop()
            else:
                matches.clear()
    else:
        pass

def grammar_score(text,matches):
    size = len(text.split())
    errors = len(matches)
    score = 1 - (errors/size)
    return score

def check_eng(text):
    tool = language_tool_python.LanguageTool('en-US')
    matches = tool.check(text)
    #print("\nAntes del filter: " ,len(matches))
    #print(matches)
    ignore_rules_ENG(matches)
    #print("Luego del filter: ", len(matches),"\n")
    result = grammar_score(text,matches)
    #print(result)
    return result

def check_esp(text):
    tool = language_tool_python.LanguageTool('es')
    matches = tool.check(text)
    #print("Antes del filter: " ,len(matches))
    #print(matches)
    ignore_rules_ESP(matches)
    #print("Luego del filter: ", len(matches),"\n")
    result = grammar_score(text,matches)
    #print(result)
    return result


#print(check_eng("I kind of shudder when they refer to Robyn Lawley as a 'plus size' model. She looks totally AVERAGE size."))
#print(check_esp("Vaso de leche!! Aterrizando pa' la Cama!!"))