import os
import time
from pinecone import Pinecone
from pinecone import ServerlessSpec


def create_pinecone_index(index_name):

    ## Initialize connection to pinecone.
    api_key = os.environ.get["PINECONE_API_KEY"]

    pinecone_client = Pinecone(api_key=api_key)

    cloud = os.environ.get("PINECONE_CLOUD")
    region = os.environ.get("PINECONE_REGION")

    spec = ServerlessSpec(cloud=cloud, region=region)

    ## Pull this from the user's project name. The name should be:
    ## 1. Lower Case.
    ## 2. Should not have spaces.
    index_name = "testing-name"

    ## Delete index if it already exists.
    if index_name in pinecone_client.list_indexes().names():
        pinecone_client.delete_index(index_name)

    ## Create a new index.
    pinecone_client.create_index(
        name=index_name,
        dimension=1536,
        metric="cosine",
        spec=spec
    )



