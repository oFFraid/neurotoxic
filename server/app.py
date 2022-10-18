from neurotoxic.neural_processing import neurotoxic
from fastapi import FastAPI
from youtube_comments import video_comments
from fastapi.middleware.cors import CORSMiddleware

neuro_instance = neurotoxic()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello World !", "routes": [
        "/comments/{video_id}"
    ]}


@app.get("/comments/{video_id}")
async def say_hello(video_id: str):
    comments = video_comments(video_id)
    result = []
    for i, freq in enumerate(neuro_instance.processing(comments)):
        result.append([comments[i], round(float(freq[0]), 3)])

    return result
