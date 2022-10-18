from pymorphy2 import MorphAnalyzer
import nltk
from nltk.corpus import re, stopwords

nltk.download('stopwords')
stopwords_ru = set(stopwords.words('russian'))
morph = MorphAnalyzer()


def lemmatize(doc):
    doc = re.sub(r"[^а-яА-Я\s]+", ' ', doc)
    doc = re.sub(r"\s+", ' ', doc)
    tokens = []
    for token in doc.split():
        if token and token not in stopwords_ru:
            token = token.strip()
            token = morph.normal_forms(token)[0]
            tokens.append(token)
    tokens = " ".join(tokens)
    return tokens
