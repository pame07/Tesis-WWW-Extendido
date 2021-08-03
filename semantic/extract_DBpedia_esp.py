from SPARQLWrapper import SPARQLWrapper, JSON
import spacy_dbpedia_spotlight
import gc
import sys
import spacy
import json
from ftfy import fix_text

def spot_dbpedia_esp(text):
    slp= spacy.load("es_core_news_lg")
    slp.add_pipe('dbpedia_spotlight')
    doc = slp(text)

    spot = []

    for ent in doc.ents:
        if ent.kb_id_:
            aux = '<'+ent.kb_id_+'>'
            spot.append(aux)
    return spot

def extract_esp(query):
    # Specify the DBPedia endpoint
    sparql = SPARQLWrapper("http://es.dbpedia.org/sparql")

    # Query for the description of "Capsaicin", filtered by language
    sparql.setQuery("""
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        SELECT ?comment
        WHERE { """+query+""" rdfs:comment ?comment
        FILTER (LANG(?comment)='es')
        }
    """)

    # Convert results to JSON format
    sparql.setReturnFormat(JSON)
    result = sparql.query().convert()
    

    #print(result["label"]["value"])
    # The return data contains "bindings" (a list of dictionaries)
    for hit in result["results"]["bindings"]:
        # We want the "value" attribute of the "comment" field
        #return(hit["comment"]["value"])
        return(hit["comment"]["value"])

def get_entities_esp(text):
    uris = spot_dbpedia_esp(text)
    info = []
    for item in uris:
        info.append((extract_esp(item)).encode('unicode_escape').decode('unicode_escape'))
    return info


#print(spot_dbpedia_esp("Chile tiene la Cordillera de los Andes"))

#print(sys.argv[1])
#ents = get_entities_esp(sys.argv[1])
#print(ents)

""" ents = '|'.join(get_entities_esp(sys.argv[1]))
clean = ents.encode('utf-8').decode('ascii', 'ignore')
print(clean) """
