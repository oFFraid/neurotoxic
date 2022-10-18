import tensorflow as tf
from neurotoxic.lemmatize import lemmatize

class neurotoxic:
    max_comment_length = 250
    model = None

    def __init__(self):
        neurotoxic.model = tf.keras.models.load_model('./neurotoxic/neuro')

    def processing(self, comments):
        clean_comments = []
        for x in comments:
            clean_comments.append(lemmatize(x))
        proc_comments = neurotoxic.model.predict(clean_comments)
        return proc_comments
