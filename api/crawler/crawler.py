import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin

def get_links(url):
    r = requests.get(url)
    soup = BeautifulSoup(r.text, "html.parser")
    links = set()
    for link in soup.find_all("a", href=True):
        href = link["href"]
        full_url = urljoin(url, href)  
        links.add(full_url)
    return links
