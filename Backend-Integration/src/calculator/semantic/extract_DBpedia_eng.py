from SPARQLWrapper import SPARQLWrapper, JSON
import spacy_dbpedia_spotlight

def spot_dbpedia_eng(text):
    nlp = spacy_dbpedia_spotlight.load('en')
    doc = nlp(text)
   
    spot = []

    for ent in doc.ents:
        if ent.kb_id_:
            aux = '<'+ent.kb_id_+'>'
            spot.append(aux)
    return spot

def extract_eng(query):
    # Specify the DBPedia endpoint
    sparql = SPARQLWrapper("http://dbpedia.org/sparql")

    # Query for the description of "Capsaicin", filtered by language
    sparql.setQuery("""
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        SELECT ?comment
        WHERE { """+query+""" rdfs:comment ?comment
        FILTER (LANG(?comment)='en')
        }
    """)

    # Convert results to JSON format
    sparql.setReturnFormat(JSON)
    result = sparql.query().convert()

    # The return data contains "bindings" (a list of dictionaries)
    for hit in result["results"]["bindings"]:
        # We want the "value" attribute of the "comment" field
        return(hit["comment"]["value"])


def get_entities_eng(text):
    uris = spot_dbpedia_eng(text)
    info = []
    for item in uris:
        info.append(extract_eng(item))
    return info
