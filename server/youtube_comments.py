from googleapiclient.discovery import build
import re
from os import environ
from langdetect import detect

DEVELOPER_KEY = environ.get("YOUTUBE_API_KEY")


def on_add_comment(comment):
    comment = re.compile('[^а-яА-Я.,;! ]').sub('', comment)
    try:
        if detect(comment) == 'ru':
            return comment
        return
    except Exception as e:
        return


def video_comments(video_id):
    all_comments = []
    youtube = build('youtube', 'v3',
                    developerKey=DEVELOPER_KEY)

    video_response = youtube.commentThreads().list(
        part='snippet,replies',
        videoId=video_id
    ).execute()

    while video_response:
        for item in video_response['items']:
            comment = item['snippet']['topLevelComment']['snippet']['textOriginal']

            replycount = item['snippet']['totalReplyCount']

            if replycount > 0 and 'replies' in item:

                for reply in item['replies']['comments']:
                    reply = reply['snippet']['textDisplay']
                    all_comments.append(on_add_comment(reply))

            all_comments.append(on_add_comment(comment))

        if 'nextPageToken' in video_response:
            video_response = youtube.commentThreads().list(
                part='snippet,replies',
                videoId=video_id,
                pageToken=video_response['nextPageToken']
            ).execute()
        else:
            break
    return [x for x in all_comments if x is not None]
