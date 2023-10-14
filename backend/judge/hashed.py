import hashlib
from dotenv import load_dotenv
import os

load_dotenv()

def HashToken():

    token = os.environ.get('JudgeServerToken')
    hash_token = hashlib.sha256(token.encode('utf-8')).hexdigest()
    
    return hash_token