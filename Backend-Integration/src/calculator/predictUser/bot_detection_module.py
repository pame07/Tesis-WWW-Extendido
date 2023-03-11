import time
import tweepy
import sys
import re
import sys
import pandas as pd
from features import fix, deEmojify, lang_detection, embedding_ENG, embedding_ESP, URL_ratio, hashtag_ratio, mention_ratio, entropy_score  
from  classifiers import load_ENGmodel, load_ESPmodel

""" import os, psutil
process = psutil.Process(os.getpid()) """
#start = time.time()
def detect_hashtag(text):
    hashtag = re.findall(r'#[a-zA-Z_:,!?¿¡%&$0-9]*', text)
    return len(hashtag)

def detect_url(text):
    urls = re.findall(r'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+', text)
    return len(urls)
    

def detect_mention(text):
    mention = re.findall(r'@[a-zA-Z_:,!?¿¡%&$0-9]*', text)
    return len(mention)

def preproc(text):
    string1 = re.sub(r'#[a-zA-Z_:,!?¿¡%&$0-9]*', "", text)
    string2 = re.sub(r'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+',"", string1)
    clean = re.sub(r'@[a-zA-Z_:,!?¿¡%&$0-9]*', "", string2)
    split = clean.split()
    final = " ".join(split)
    return final

def get_features(user,tweet,tweet_lang):
    ######## user features #########
    user_follows = user.followers_count
    user_status = user.statuses_count
    user_favorite = user.favourites_count
    user_listed = user.listed_count
    user_friends = user.friends_count
    ##################################

    ####### tweet features ###########
    tweet_retweet = tweet[0]
    tweet_favorite = tweet[1]
    tweet_text = tweet[2]

    tweet_hashtag = detect_hashtag(tweet_text)
    tweet_urls = detect_url(tweet_text)
    tweet_mentions = detect_mention(tweet_text)
    ##################################

    data = [[tweet_text, tweet_retweet, tweet_favorite, tweet_hashtag, tweet_urls, tweet_mentions,
    user_status, user_follows, user_friends, user_favorite, user_listed]]
    
    df = pd.DataFrame(data, columns=['text', 'retweet_count','favorite_count','num_hashtags','num_urls',
    'num_mentions', 'statuses_count', 'followers_count', 'friends_count', 'favourites_count', 'listed_count'])

    df['text'] = df['text'].apply(fix)
    df['clean'] = df['text'].apply(deEmojify)

    ratio_u = []
    ratio_h = []
    ratio_m = []

    hashtag = df['num_hashtags']
    url = df['num_urls']
    mention = df['num_mentions']

    text = df['clean']

    for i in range(len(text)):
        ratio_u.append(URL_ratio(text[i],url[i]))

    for i in range(len(text)):
        ratio_h.append(hashtag_ratio(text[i],hashtag[i]))

    for i in range(len(text)):
        ratio_m.append(mention_ratio(text[i],mention[i]))

    df['url_ratio'] = ratio_u
    df['hashtag_ratio'] = ratio_h
    df['mention_ratio'] = ratio_m

    df['entropy'] = df['clean'].apply(entropy_score)

    if tweet_lang == 'es':
        df['wavelet_avg'] = df['clean'].apply(embedding_ESP) #cambiar de acuerdo al lang
        
    elif tweet_lang == 'en':
        df['wavelet_avg'] = df['clean'].apply(embedding_ENG)
    
    else:
        tweet_lang = 'unknown'

    return df

    
def prediction(df, tweet_lang):
    new_input = df[['retweet_count','favorite_count','num_hashtags','num_urls','num_mentions','statuses_count','followers_count','friends_count','favourites_count',
    'listed_count', 'url_ratio','hashtag_ratio','mention_ratio','entropy','wavelet_avg']]

    if tweet_lang == 'en':
        result = load_ENGmodel.predict(new_input) 
        return result
    elif tweet_lang == 'es':
        result = load_ESPmodel.predict(new_input) 
        return result
    else:
        sys.exit(1)
    

consumer_key = "wiSnG2bzSjprAGq1sMRS6MKcB" 
consumer_secret = "gsfSUJtRCQsxEKYat6SF9WLSBQYHkBp4kccttuRs0dmkLE3UdM" 
access_token = "1282381411295600647-uqRnzSUiGWCLkfzLnCynhi0PxahpRf" 
access_token_secret = "j53CpbusLOnZO1CiAlIAeCRowFHlM5gR4BbdeLgZ3CTnp" 

auth = tweepy.OAuthHandler(consumer_key, consumer_secret) 
auth.set_access_token(access_token, access_token_secret) 

api = tweepy.API(auth) 

user = api.get_user(screen_name='@'+sys.argv[1])
#user = api.get_user(screen_name='@TheEllenShow')
if not user:
    print("user not found")

tweet_id = []
status = api.user_timeline(screen_name='@'+sys.argv[1], count=5, include_rts = False)



for text in status:
    tweet_id.append(text.id_str)

tweet = []

for id_text in tweet_id:
    temp = api.get_status(id_text, tweet_mode= "extended")
    #print(temp)
    tags = detect_hashtag(temp.full_text)
    url = detect_url(temp.full_text)
    mention = detect_mention(temp.full_text)
    total = tags + url + mention
    if len(temp.full_text.split()) > total:
        tweet.append(temp.retweet_count)
        tweet.append(temp.favorite_count)
        tweet.append(temp.full_text)
        break

tweet_lang = lang_detection(tweet[2])
data = get_features(user, tweet, tweet_lang)

result = prediction(data, tweet_lang)


print(str(result[0]))

#end = time.time()
#print ("Time elapsed:", end - start)
""" print("Memoria: ", process.memory_info().rss)  # in bytes  """