from SPARQLWrapper import SPARQLWrapper, JSON
import spacy_dbpedia_spotlight

def spot_dbpedia_esp(text):
    slp = spacy_dbpedia_spotlight.load('es')
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

    # The return data contains "bindings" (a list of dictionaries)
    for hit in result["results"]["bindings"]:
        # We want the "value" attribute of the "comment" field
        return(hit["comment"]["value"])

def get_entities_esp(text):
    uris = spot_dbpedia_esp(text)
    info = []
    for item in uris:
        info.append(extract_esp(item))
    return info



