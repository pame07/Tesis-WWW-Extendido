# -*- coding: utf-8 -*-
"""bot detection(ES).ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1ASW0qoJyVngYz3EzVbpOiNf-aI9OQSpc
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as pyplot
import pickle

# Import the Python machine learning libraries we need
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier, DecisionTreeRegressor
from sklearn.ensemble import RandomForestClassifier, BaggingClassifier, AdaBoostClassifier 
from sklearn.metrics import classification_report, confusion_matrix,  precision_recall_fscore_support, accuracy_score, ConfusionMatrixDisplay
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import LabelEncoder
from sklearn.feature_extraction.text import TfidfVectorizer
import matplotlib.pyplot as plt

# Import some convenience functions.  This can be found on the course github
# Load the data set
dataset = pd.read_csv("https://raw.githubusercontent.com/pame07/datasets/main/training_dataset_ESP.csv", engine='python', encoding='latin-1')

test_data = pd.read_csv("https://raw.githubusercontent.com/pame07/datasets/main/test_dataset_ESP_processed.csv", engine='python', encoding='latin-1')

dataset.head()

dataset.describe()

# Split into input and output features
y = dataset["label"]
X = dataset[["retweet_count","favorite_count","num_hashtags","num_urls","num_mentions","statuses_count","followers_count","friends_count","favourites_count","listed_count","url_ratio","hashtag_ratio","mention_ratio","entropy","wavelet_avg"]]

# Split into test and training sets
test_size = 0.20
seed = 7
X_train, X_test, y_train, y_test =  train_test_split(X, y, test_size=test_size, random_state=seed)

#Preparing test dataset for prediction

#lb2 = LabelEncoder()
#lb2.fit(test_data['label'])
#test_data['label'] = lb2.transform(test_data['label'])

y2 = test_data["label"]
X2 = test_data[["retweet_count","favorite_count","num_hashtags","num_urls","num_mentions","statuses_count","followers_count","friends_count","favourites_count","listed_count","url_ratio","hashtag_ratio","mention_ratio","entropy","wavelet_avg"]]

clasificadores=[]
lista_metricas=[]
matrices_cm=[]

#Capturing metrics for testing

clasificadores_Test=[]
lista_metricas_Test=[]
matrices_cm_Test=[]

def display_metrics_Test(clasif, label, prediction, clases=None):
  print(classification_report(label, prediction))
  metricas=precision_recall_fscore_support(label, prediction, average='binary', labels=clases,pos_label='human')
#  acc=accuracy_score(y_test, y_pred)
  metricas = metricas + (accuracy_score(label, prediction),)
  print('precision:', metricas[0], ' recall: ', metricas[1], ' F1: ', metricas[2],' acc: ',  metricas[4])
  cm = confusion_matrix(label, prediction, labels=clases)
  #disp = ConfusionMatrixDisplay(confusion_matrix=cm, display_labels=clases)
  #disp.plot(cmap=plt.cm.Blues)
  clasificadores_Test.append(clasif)
  lista_metricas_Test.append(metricas)
  matrices_cm_Test.append(cm)
  #plt.show()

def display_metrics(clasif, y_test, y_pred, clases=None):
  print(classification_report(y_test, y_pred))
  metricas=precision_recall_fscore_support(y_test, y_pred, average='binary', pos_label='human')
#  acc=accuracy_score(y_test, y_pred)
  metricas = metricas + (accuracy_score(y_test, y_pred),)
  print('precision:', metricas[0], ' recall: ', metricas[1], ' F1: ', metricas[2],' acc: ',  metricas[4])
  cm = confusion_matrix(y_test, y_pred, labels=clases)
  disp = ConfusionMatrixDisplay(confusion_matrix=cm, display_labels=clases)
  disp.plot(cmap=plt.cm.Blues)
  clasificadores.append(clasif)
  lista_metricas.append(metricas)
  matrices_cm.append(cm)
  plt.show()

"""# **Decision Tree**"""

# New https://www.kaggle.com/code/valkenberg/twitter-sentiment-analysis-v2

#vectorizer = TfidfVectorizer(analyzer = "word") #Using TFIDF to vectorize the text
#vectorizer = TfidfVectorizer(min_df=10,ngram_range=(1,3), max_features = 40000) 
#vectorizer.fit(X_train['clean'].values)   
#x_tr=vectorizer.transform(X_train['clean'].values)
#x_te=vectorizer.transform(X_test['clean'].values)

model1 = DecisionTreeClassifier(
    criterion = "entropy",
    splitter = "best",
    max_depth= 300,
    min_samples_split= 25,
    min_samples_leaf= 18,
    max_features= 'log2'
)
print("Training results")
y_pred = model1.fit(X_train, y_train).predict(X_test)
display_metrics('Decision tree', y_test, y_pred, model1.classes_)
print("\nTest results")
test_pred = model1.predict(X2)
display_metrics_Test('Decision tree', y2, test_pred, model1.classes_)

"""# **Random Forest**"""

model2 = RandomForestClassifier(
    n_estimators= 100,
    criterion= "entropy",
    max_depth= 350,
    min_samples_split= 10, 
    max_features= 'sqrt',
    max_leaf_nodes= 2
)
print("Training results")
y_pred = model2.fit(X_train, y_train).predict(X_test)
display_metrics('Random Forest', y_test, y_pred, model2.classes_)
print("\nTest results")
test_pred = model2.predict(X2)
display_metrics_Test('Random Forest', y2, test_pred, model2.classes_)

"""# **Características importantes**
https://scikit-learn.org/stable/auto_examples/ensemble/plot_forest_importances.html#sphx-glr-auto-examples-ensemble-plot-forest-importances-*py*
"""

model2.feature_importances_

model2.feature_names_in_

forest_importances = pd.Series(model2.feature_importances_, index=model2.feature_names_in_)

fig, ax = plt.subplots()
std = np.std([tree.feature_importances_ for tree in model2.estimators_], axis=0)
forest_importances.plot.bar(yerr=std, ax=ax)
#ax.set_title("Feature importances using MDI")
ax.set_ylabel("Mean decrease in impurity")
fig.tight_layout()

from sklearn.inspection import permutation_importance

#start_time = time.time()
result = permutation_importance(
    model2, X_test, y_test, n_repeats=10, random_state=42, n_jobs=2
)
#elapsed_time = time.time() - start_time
#print(f"Elapsed time to compute the importances: {elapsed_time:.3f} seconds")

forest_importances = pd.Series(result.importances_mean, index=model2.feature_names_in_)
fig, ax = plt.subplots()
forest_importances.plot.bar(yerr=result.importances_std, ax=ax)
#ax.set_title("Feature importances using permutation on full model")
ax.set_ylabel("Mean accuracy decrease")
fig.tight_layout()
plt.show()

result

"""# **BaggingClassifier**

"""

model3 = BaggingClassifier(
    n_estimators= 170,
    max_samples= 0.56,
    max_features= 0.32 
) 
print("Training results")
y_pred = model3.fit(X_train, y_train).predict(X_test)
display_metrics('Bagging', y_test, y_pred)
print("\nTest results")
test_pred = model3.predict(X2)
display_metrics_Test('Bagging', y2, test_pred, model3.classes_)

"""# **AdaBoostClassifier**"""

model4 = AdaBoostClassifier(
    #base_estimator= RandomForestClassifier(),
    #n_estimators= 300,
    #learning_rate= 0.85,
    #algorithm= "SAMME",
)
print("Training results")
y_pred = model4.fit(X_train, y_train).predict(X_test)
display_metrics('Adaboost', y_test, y_pred)
print("\nTest results")
test_pred = model4.predict(X2)
display_metrics_Test('Adaboost', y2, test_pred, model4.classes_)

"""# **DecisionTreeRegressor**"""

'''model = DecisionTreeRegressor(
    criterion= "mse",
    splitter= "best",
    max_depth= 250,
    max_features= 'log2'
)
display_metrics(y_test, y_pred)'''

"""# **LogisticRegression**"""

model5 = LogisticRegression(
    max_iter= 100000,
    penalty= "elasticnet",
    #tol= 0.25,
    C= 0.65,
    solver= "saga",
    l1_ratio= 0.68
)
print("Training results")
y_pred = model5.fit(X_train, y_train).predict(X_test)
display_metrics('Logistic Regression', y_test, y_pred)
print("\nTest results")
test_pred = model5.predict(X2)
display_metrics_Test('Logistic Regression', y2, test_pred, model5.classes_)

"""# **Resultados**"""

import seaborn as sns
fig, axn = plt.subplots(1,5, sharex=True, sharey=True,figsize=(12,2))

for i, ax in enumerate(axn.flat):
#    k = list(matrices_cm)[i]
    sns.heatmap(matrices_cm[i], ax=ax,cbar=i==4)
    ax.set_title(clasificadores[i],fontsize=8)

f, axes = plt.subplots(1, 5, figsize=(20, 5), sharey='row')

for i  in range(len(clasificadores)):
    disp = ConfusionMatrixDisplay(matrices_cm[i], display_labels=['Human','Bot'])
    disp.plot(ax=axes[i], xticks_rotation=45, cmap=plt.cm.Blues)
    disp.ax_.set_title(clasificadores[i])
    disp.im_.colorbar.remove()
    disp.ax_.set_xlabel('')
    if i!=0:
        disp.ax_.set_ylabel('')

f.text(0.4, 0.1, 'Predicted label', ha='left')
plt.subplots_adjust(wspace=0.40, hspace=0.1)


f.colorbar(disp.im_, ax=axes, fraction=0.009, pad=0.04)
plt.show()

#Training
print('Classifier', 'Precision', 'Recall', 'F1-score',  'Accuracy')

for i in range(len(clasificadores)):
  print(clasificadores[i],"{:.5f}".format(lista_metricas[i][0]),"{:.5f}".format(lista_metricas[i][1]),"{:.5f}".format(lista_metricas[i][2]),"{:.5f}".format(lista_metricas[i][4]))

"""# Testing Results"""

f, axes = plt.subplots(1, 5, figsize=(20, 5), sharey='row')

for i  in range(len(clasificadores)):
    disp = ConfusionMatrixDisplay(matrices_cm_Test[i], display_labels=['Human','Bot'])
    disp.plot(ax=axes[i], xticks_rotation=45, cmap=plt.cm.Blues)
    disp.ax_.set_title(clasificadores[i])
    disp.im_.colorbar.remove()
    disp.ax_.set_xlabel('')
    if i!=0:
        disp.ax_.set_ylabel('')

f.text(0.4, 0.1, 'Predicted label', ha='left')
plt.subplots_adjust(wspace=0.40, hspace=0.1)


f.colorbar(disp.im_, ax=axes, fraction=0.009, pad=0.04)
plt.show()

#Test
print('Classifier', 'Precision', 'Recall', 'F1-score',  'Accuracy')

for i in range(len(clasificadores)):
  print(clasificadores_Test[i],"{:.5f}".format(lista_metricas_Test[i][0]),"{:.5f}".format(lista_metricas_Test[i][1]),"{:.5f}".format(lista_metricas_Test[i][2]),"{:.5f}".format(lista_metricas_Test[i][4]))

"""# Training v/s Validation Results"""

#Training + Validation
print('Classifier','&', 'Precision', '&','Recall','&', 'F1-score', '&', 'Accuracy')

for i in range(len(clasificadores)):
  print(clasificadores[i],"&","{:.5f}".format(lista_metricas[i][0]),"&","{:.5f}".format(lista_metricas[i][1]),"&","{:.5f}".format(lista_metricas[i][2]),"&","{:.5f}".format(lista_metricas[i][4]),"&","{:.5f}".format(lista_metricas_Test[i][0]),"&","{:.5f}".format(lista_metricas_Test[i][1]),"&","{:.5f}".format(lista_metricas_Test[i][2]),"&","{:.5f}".format(lista_metricas_Test[i][4]))

"""# Integration test

<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
  overflow:hidden;padding:10px 5px;word-break:normal;}
.tg th{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
  font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}
.tg .tg-pb0m{border-color:inherit;text-align:center;vertical-align:bottom}
.tg .tg-8d8j{text-align:center;vertical-align:bottom}
.tg .tg-7zrl{text-align:left;vertical-align:bottom}
</style>
<table class="tg">
<thead>
  <tr>
    <th class="tg-pb0m">user</th>
    <th class="tg-pb0m">label</th>
    <th class="tg-pb0m">lang</th>
    <th class="tg-pb0m">Botometer</th>
    <th class="tg-pb0m">Credibility (old)</th>
    <th class="tg-pb0m">Time (old)</th>
    <th class="tg-pb0m">Credibility (new)</th>
    <th class="tg-pb0m">Time (new)</th>
    <th class="tg-pb0m">Detected as</th>
    <th class="tg-pb0m">Verified Weight</th>
    <th class="tg-pb0m">Creation  Weight</th>
    <th class="tg-8d8j">Creation Date</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-pb0m">AdriUmbreon</td>
    <td class="tg-pb0m">human</td>
    <td class="tg-pb0m">es</td>
    <td class="tg-pb0m">0.1</td>
    <td class="tg-pb0m">44.0353849747557</td>
    <td class="tg-pb0m">918 ms</td>
    <td class="tg-pb0m">44.0353849747557</td>
    <td class="tg-pb0m">3269 ms</td>
    <td class="tg-pb0m">human</td>
    <td class="tg-pb0m">0</td>
    <td class="tg-pb0m">25</td>
    <td class="tg-7zrl">2014-02-26 15:03:49+00:00</td>
  </tr>
  <tr>
    <td class="tg-pb0m">AndyChatlani</td>
    <td class="tg-pb0m">human</td>
    <td class="tg-pb0m">es</td>
    <td class="tg-pb0m">1</td>
    <td class="tg-pb0m">38.65612191304348</td>
    <td class="tg-pb0m">931 ms</td>
    <td class="tg-pb0m">38.65612191304348</td>
    <td class="tg-pb0m">3201 ms</td>
    <td class="tg-pb0m">human</td>
    <td class="tg-pb0m">0</td>
    <td class="tg-pb0m">34.375</td>
    <td class="tg-7zrl">2011-12-12 11:08:18+00:00</td>
  </tr>
  <tr>
    <td class="tg-pb0m">Armunho</td>
    <td class="tg-pb0m">human</td>
    <td class="tg-pb0m">es</td>
    <td class="tg-pb0m">0.5</td>
    <td class="tg-pb0m">54.86527007779654</td>
    <td class="tg-pb0m">982 ms</td>
    <td class="tg-pb0m">54.86527007779654</td>
    <td class="tg-pb0m">3196 ms</td>
    <td class="tg-pb0m">human</td>
    <td class="tg-pb0m">0</td>
    <td class="tg-pb0m">37.5</td>
    <td class="tg-7zrl">2010-12-28 01:32:48+00:00</td>
  </tr>
  <tr>
    <td class="tg-pb0m">eugeniojaque8</td>
    <td class="tg-pb0m">bot</td>
    <td class="tg-pb0m">es</td>
    <td class="tg-pb0m">4.7</td>
    <td class="tg-pb0m">39.575024750000004</td>
    <td class="tg-pb0m">946 ms</td>
    <td class="tg-pb0m">39.575024750000004</td>
    <td class="tg-pb0m">3231 ms</td>
    <td class="tg-pb0m">bot</td>
    <td class="tg-pb0m">0</td>
    <td class="tg-pb0m">0</td>
    <td class="tg-7zrl">2022-06-28 02:53:52+00:00</td>
  </tr>
  <tr>
    <td class="tg-pb0m">RecuerdameBot</td>
    <td class="tg-pb0m">bot</td>
    <td class="tg-pb0m">es</td>
    <td class="tg-pb0m">2.3</td>
    <td class="tg-pb0m"> 48.34662263781871</td>
    <td class="tg-pb0m">1316 ms</td>
    <td class="tg-pb0m">46.28412263781871</td>
    <td class="tg-pb0m">3161 ms</td>
    <td class="tg-pb0m">bot</td>
    <td class="tg-pb0m">0</td>
    <td class="tg-pb0m">6.25</td>
    <td class="tg-7zrl">2020-04-26 16:51:44+00:00</td>
  </tr>
  <tr>
    <td class="tg-pb0m">123trabajo</td>
    <td class="tg-pb0m">bot</td>
    <td class="tg-pb0m">es</td>
    <td class="tg-pb0m">4.8</td>
    <td class="tg-pb0m">53.82044451601821</td>
    <td class="tg-pb0m">1017 ms</td>
    <td class="tg-pb0m">42.47669451601821</td>
    <td class="tg-pb0m">3162 ms</td>
    <td class="tg-pb0m">bot</td>
    <td class="tg-pb0m">0</td>
    <td class="tg-pb0m">34.375</td>
    <td class="tg-7zrl">2011-03-04 15:39:40+00:00</td>
  </tr>
  <tr>
    <td class="tg-pb0m">4geeksmxOfi</td>
    <td class="tg-pb0m">bot</td>
    <td class="tg-pb0m">es</td>
    <td class="tg-pb0m">3.9</td>
    <td class="tg-pb0m">28.794477444444446</td>
    <td class="tg-pb0m">1044 ms</td>
    <td class="tg-pb0m">28.794477444444446</td>
    <td class="tg-pb0m">3395 ms</td>
    <td class="tg-pb0m">bot</td>
    <td class="tg-pb0m">0</td>
    <td class="tg-pb0m">0</td>
    <td class="tg-7zrl">2022-09-02 18:12:55+00:00</td>
  </tr>
</tbody>
</table>

Reemplacé las cuentas etiquetadas como bot que fueron casificadas como 'human' por el modelo. @4geeksmxOfi y @123trabajo son claramente bots por la forma en que publican los tweets, teniendo una estructura bien definida.

El caso de @RecuerdameBot lo agregué porque me parecía interesante que un bot que se ha declarado así mismo como uno sea evaluado con un valor tan bajo por botometer, y encuentro súper que el modelo pueda clasificarlo correctamente.

Dejé la columna de los valores de los otros dos filtros, ya que volvió a ocurrir el caso que no bajaba la credibilidad por ser la suma de estos dos filtros 0 en un inicio.

El tiempo no mejora mucho al calcular sólo el tiempo de la predicción. Dejé la métrica en ms para que se pueda hacer una comparación inmediata con el tiempo anterior.
"""



test=[]
model=model1

#AdriUmbreon

X5=[[2,10,0,0,0,17098,479,442,20454,4,0,0,0,4.198106925,-0.018981544]]
test.append(model.predict(X5))
print(test[0])

#AndyChatlani

X5=[[0,0,1,0,0,260,24,160,233,0,0,0.010416667,0,4.338404359,0.006842179]]
test.append(model.predict(X5))
print(test[1])

#Armunho

X5=[[1,4,0,2,0,501112,8468,712,384744,0,0.010869565,0,0,4.66168532,0.049705626]]
test.append(model.predict(X5))
print(test[2])

#UNoticias

X5=[[4,1,1,1,0,1601137,4554566,98232,1742,11641,0.007142857,0.007142857,0,4.402447858,0.014285313]]
test.append(model.predict(X5))
print(test[3])

#OsadoImpertine

X5=[[0,0,0,1,0,12621,3114,3313,15,2,0.014925373,0,0,4.972294974,-0.029727362]]
test.append(model.predict(X5))
print(test[4])

#eugeniojaque8

X5=[[0,0,0,0,0,63,2,1,32,0,0,0,0,4.066818813,0.00948614]]
test.append(model.predict(X5))
print(test[5])

#biobio

X5=[[9,29,0,1,0,922939,3947042,15713,11906,10653,0.008130081,0,0,4.338810609,0.026504609]]
test.append(model.predict(X5))
print(test[6])

test

import warnings
warnings.filterwarnings("ignore")

for model in [model1,model2,model3,model4,model5]:
  test=[]
  #AdriUmbreon
  test.append(model.predict([[2,10,0,0,0,17098,479,442,20454,4,0,0,0,4.198106925,-0.018981544]]))
  #AndyChatlani
  test.append(model.predict([[0,0,1,0,0,260,24,160,233,0,0,0.010416667,0,4.338404359,0.006842179]]))
  #Armunho
  test.append(model.predict([[1,4,0,2,0,501112,8468,712,384744,0,0.010869565,0,0,4.66168532,0.049705626]]))
  #UNoticias
  test.append(model.predict([[4,1,1,1,0,1601137,4554566,98232,1742,11641,0.007142857,0.007142857,0,4.402447858,0.014285313]]))
  #OsadoImpertine
  test.append(model.predict([[0,0,0,1,0,12621,3114,3313,15,2,0.014925373,0,0,4.972294974,-0.029727362]]))
  #eugeniojaque8
  test.append(model.predict([[0,0,0,0,0,63,2,1,32,0,0,0,0,4.066818813,0.00948614]]))
  #biobio
  test.append(model.predict([[9,29,0,1,0,922939,3947042,15713,11906,10653,0.008130081,0,0,4.338810609,0.026504609]]))
  print(test)
  metricas=precision_recall_fscore_support(test, ['human','human','human','bot','bot','bot','bot'], average='binary', pos_label='human')
  print(model,metricas)

test

"""# Prueba Nueva Implementación Credibilidad con filtro bot

<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
  overflow:hidden;padding:10px 5px;word-break:normal;}
.tg th{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
  font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}
.tg .tg-c3ow{border-color:inherit;text-align:center;vertical-align:top}
.tg .tg-0pky{border-color:inherit;text-align:left;vertical-align:top}
</style>
<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky">user</th>
    <th class="tg-0pky">label</th>
    <th class="tg-0pky">Botometer</th>
    <th class="tg-0pky">credibility (old)</th>
    <th class="tg-0pky">time (old)</th>
    <th class="tg-0pky">credibility(w/ bot detection)</th>
    <th class="tg-0pky">time</th>
    <th class="tg-0pky">new credibility implementation</th>
    <th class="tg-0pky">time</th>
    <th class="tg-0pky">Detected as</th>
    <th class="tg-0pky">Verified Weight</th>
    <th class="tg-0pky">Creation Weight</th>
    <th class="tg-0pky">Creation Date</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky">@shakira</td>
    <td class="tg-c3ow">-</td>
    <td class="tg-c3ow">0.9</td>
    <td class="tg-0pky">89.96156914893618</td>
    <td class="tg-c3ow">1125 ms</td>
    <td class="tg-0pky">89.96156914893618</td>
    <td class="tg-0pky">3198 ms</td>
    <td class="tg-0pky">89.96156914893618</td>
    <td class="tg-0pky">3198 ms</td>
    <td class="tg-0pky">human</td>
    <td class="tg-0pky">50</td>
    <td class="tg-0pky">40.625</td>
    <td class="tg-0pky">2009-06-03 17:38:07+00:00</td>
  </tr>
  <tr>
    <td class="tg-0pky">@andresiniesta8</td>
    <td class="tg-c3ow">-</td>
    <td class="tg-c3ow">2.1</td>
    <td class="tg-0pky">89.92246621621621</td>
    <td class="tg-c3ow">917 ms</td>
    <td class="tg-0pky">89.92246621621621</td>
    <td class="tg-0pky">3254 ms</td>
    <td class="tg-0pky">89.92246621621621</td>
    <td class="tg-0pky">3254 ms</td>
    <td class="tg-0pky">human</td>
    <td class="tg-0pky">50</td>
    <td class="tg-0pky">40.625</td>
    <td class="tg-0pky">2009-11-18 09:33:28+00:00</td>
  </tr>
  <tr>
    <td class="tg-0pky">@Mineduc</td>
    <td class="tg-c3ow">-</td>
    <td class="tg-c3ow">1.6</td>
    <td class="tg-0pky">76.21803809787065</td>
    <td class="tg-c3ow">912 ms</td>
    <td class="tg-0pky">76.21804646606702</td>
    <td class="tg-0pky">3260 ms</td>
    <td class="tg-0pky">76.22147136481414</td>
    <td class="tg-0pky">3260 ms</td>
    <td class="tg-0pky">human</td>
    <td class="tg-0pky">50</td>
    <td class="tg-0pky">37.5</td>
    <td class="tg-0pky">2010-05-05 22:03:42+00:00</td>
  </tr>
  <tr>
    <td class="tg-0pky">@biobio</td>
    <td class="tg-c3ow">-</td>
    <td class="tg-c3ow">3.8</td>
    <td class="tg-0pky">90.2875</td>
    <td class="tg-c3ow">944 ms</td>
    <td class="tg-0pky">90.2875</td>
    <td class="tg-0pky">3246 ms</td>
    <td class="tg-0pky">90.2875</td>
    <td class="tg-0pky">3246 ms</td>
    <td class="tg-0pky">human</td>
    <td class="tg-0pky">50</td>
    <td class="tg-0pky">43.75</td>
    <td class="tg-0pky">2008-05-03 15:15:06+00:00</td>
  </tr>
  <tr>
    <td class="tg-0pky">@RAEinforma</td>
    <td class="tg-c3ow">-</td>
    <td class="tg-c3ow">3.4</td>
    <td class="tg-0pky">87.79189814814815</td>
    <td class="tg-c3ow">909 ms</td>
    <td class="tg-0pky">87.79189814814815</td>
    <td class="tg-0pky">3293 ms</td>
    <td class="tg-0pky">87.79189814814815</td>
    <td class="tg-0pky">3293 ms</td>
    <td class="tg-0pky">human</td>
    <td class="tg-0pky">50</td>
    <td class="tg-0pky">34.375</td>
    <td class="tg-0pky">2011-08-07 18:41:46+00:00</td>
  </tr>
  <tr>
    <td class="tg-0pky">@Rubiu5</td>
    <td class="tg-c3ow">-</td>
    <td class="tg-c3ow">1.2</td>
    <td class="tg-0pky">76.48375</td>
    <td class="tg-c3ow">1101 ms</td>
    <td class="tg-0pky">48.64</td>
    <td class="tg-0pky">3334 ms</td>
    <td class="tg-0pky">72.3071875</td>
    <td class="tg-0pky">3334 ms</td>
    <td class="tg-0pky">bot</td>
    <td class="tg-0pky">50</td>
    <td class="tg-0pky">34.375</td>
    <td class="tg-0pky">2011-10-25 21:37:48+00:00</td>
  </tr>
  <tr>
    <td class="tg-0pky">@metrodesantiago</td>
    <td class="tg-c3ow"></td>
    <td class="tg-c3ow">3</td>
    <td class="tg-0pky">78.36079545454545</td>
    <td class="tg-c3ow">840 ms</td>
    <td class="tg-0pky">48.45454545454545</td>
    <td class="tg-0pky">3237 ms</td>
    <td class="tg-0pky">73.87485795454546</td>
    <td class="tg-0pky">3237 ms</td>
    <td class="tg-0pky">bot</td>
    <td class="tg-0pky">50</td>
    <td class="tg-0pky">40.625</td>
    <td class="tg-0pky">2009-09-11 19:15:54+00:00</td>
  </tr>
  <tr>
    <td class="tg-c3ow">@AdriUmbreon</td>
    <td class="tg-c3ow">human</td>
    <td class="tg-c3ow">0.1</td>
    <td class="tg-0pky">44.0353849747557</td>
    <td class="tg-c3ow">918 ms</td>
    <td class="tg-0pky">44.0353849747557</td>
    <td class="tg-0pky">3608 ms</td>
    <td class="tg-0pky">44.0353849747557</td>
    <td class="tg-0pky">3608 ms</td>
    <td class="tg-0pky">human</td>
    <td class="tg-0pky">0</td>
    <td class="tg-0pky">25</td>
    <td class="tg-0pky">2014-02-26 15:03:49+00:00</td>
  </tr>
  <tr>
    <td class="tg-c3ow">@AndyChatlani</td>
    <td class="tg-c3ow">human</td>
    <td class="tg-c3ow">1</td>
    <td class="tg-0pky">38.65612191304348</td>
    <td class="tg-c3ow">931 ms</td>
    <td class="tg-0pky">38.65612191304348</td>
    <td class="tg-0pky">3099 ms</td>
    <td class="tg-0pky">38.65612191304348</td>
    <td class="tg-0pky">3099 ms</td>
    <td class="tg-0pky">human</td>
    <td class="tg-0pky">0</td>
    <td class="tg-0pky">34.375</td>
    <td class="tg-0pky">2011-12-12 11:08:18+00:00</td>
  </tr>
  <tr>
    <td class="tg-c3ow">@Armunho</td>
    <td class="tg-c3ow">human</td>
    <td class="tg-c3ow">0.5</td>
    <td class="tg-0pky">54.86527007779654</td>
    <td class="tg-c3ow">982 ms</td>
    <td class="tg-0pky">54.86527007779654</td>
    <td class="tg-0pky">3133 ms</td>
    <td class="tg-0pky">54.86527007779654</td>
    <td class="tg-0pky">3133 ms</td>
    <td class="tg-0pky">human</td>
    <td class="tg-0pky">0</td>
    <td class="tg-0pky">37.5</td>
    <td class="tg-0pky">2010-12-28 01:32:48+00:00</td>
  </tr>
  <tr>
    <td class="tg-c3ow">@eugeniojaque8</td>
    <td class="tg-c3ow">bot</td>
    <td class="tg-c3ow">4.7</td>
    <td class="tg-0pky">39.575024750000004</td>
    <td class="tg-c3ow">946 ms</td>
    <td class="tg-0pky">39.575024750000004</td>
    <td class="tg-0pky">3102 ms</td>
    <td class="tg-0pky">39.575024750000004</td>
    <td class="tg-0pky">3102 ms</td>
    <td class="tg-0pky">bot</td>
    <td class="tg-0pky">0</td>
    <td class="tg-0pky">0</td>
    <td class="tg-0pky">2022-06-28 02:53:52+00:00</td>
  </tr>
  <tr>
    <td class="tg-c3ow">@RecuerdameBot</td>
    <td class="tg-c3ow">bot</td>
    <td class="tg-c3ow">2.3</td>
    <td class="tg-0pky"> 48.34662263781871</td>
    <td class="tg-c3ow">1316 ms</td>
    <td class="tg-0pky">46.28412263781871</td>
    <td class="tg-0pky">3176 ms</td>
    <td class="tg-0pky">46.28412263781871</td>
    <td class="tg-0pky">3176 ms</td>
    <td class="tg-0pky">bot</td>
    <td class="tg-0pky">0</td>
    <td class="tg-0pky">6.25</td>
    <td class="tg-0pky">2020-04-26 16:51:44+00:00</td>
  </tr>
  <tr>
    <td class="tg-c3ow">@123trabajo</td>
    <td class="tg-c3ow">bot</td>
    <td class="tg-c3ow">4.8</td>
    <td class="tg-0pky">53.82044451601821</td>
    <td class="tg-c3ow">1017 ms</td>
    <td class="tg-0pky">42.47669451601821</td>
    <td class="tg-0pky">3101 ms</td>
    <td class="tg-0pky">42.47669451601821</td>
    <td class="tg-0pky">3101 ms</td>
    <td class="tg-0pky">bot</td>
    <td class="tg-0pky">0</td>
    <td class="tg-0pky">34.375</td>
    <td class="tg-0pky">2011-03-04 15:39:40+00:00</td>
  </tr>
  <tr>
    <td class="tg-c3ow">@4geeksmxOfi</td>
    <td class="tg-c3ow">bot</td>
    <td class="tg-c3ow">3.9</td>
    <td class="tg-0pky">28.794477444444446</td>
    <td class="tg-c3ow">1044 ms</td>
    <td class="tg-0pky">28.794477444444446</td>
    <td class="tg-0pky">3179 ms</td>
    <td class="tg-0pky">28.794477444444446</td>
    <td class="tg-0pky">3179 ms</td>
    <td class="tg-0pky">bot</td>
    <td class="tg-0pky">0</td>
    <td class="tg-0pky">0</td>
    <td class="tg-0pky">2022-09-02 18:12:55+00:00</td>
  </tr>
</tbody>
</table>


Estaré trabajando en implementar la nueva fórmula durante el fin de semana, a más tardar espero poder tener los resultados de esta prueba el martes en la tarde.

# Investigación de cuentas sin etiqueta ES

@shakira -> human

@andresiniesta8 -> human

@Mineduc -> human/híbrido

@biobio -> bot/híbrido

@RAEinforma -> bot/híbrido

@Rubiu5 -> human

@metrodesantiago -> bot/híbrido

Buscando cómo justificar las etiquetas en este momento.
"""

#shakira

X5=[[9413,244340,0,1,0,7919,53321898,233,2241,94455,0.003558719,0,0,4.343175542,0.012328183]]
print(model2.predict(X5))

#andresiniesta8

X5=[[127,2012,3,1,1,3390,25505078,118,398,32362,0.003649635,0.010948905,0.003649635,4.660226862,0.014656861]]
print(model2.predict(X5))

#Mineduc

X5=[[19,5,1,2,1,37218,473512,1608,19125,1496,0.007017544,0.003508772,0.003508772,4.722016452,0.033499914]]
print(model2.predict(X5))

#RAEinforma

X5=[[32,123,1,1,1,472421,2087414,208,3109,7713,0.004901961,0.004901961,0.004901961,4.606108343,0.03841921]]
print(model2.predict(X5))

#Rubiu5

X5=[[459,10612,0,2,0,25628,20079761,926,0,8337,0.015267176,0,0,5.290844636,0.014592202]]
print(model2.predict(X5))

#metrodesantiago

X5=[[14,27,4,1,0,477028,2389143,397582,25996,2567,0.003802281,0.015209125,0,4.671035926,-0.002886434]]
print(model2.predict(X5))

#biobio

X5=[[9,29,0,1,0,922939,3947042,15713,11906,10653,0.008130081,0,0,4.338810609,0.026504609]]
print(model2.predict(X5))

filename = 'RandomForestClassifier_ESP-Colab.sav'
pickle.dump(model2, open(filename, 'wb'))