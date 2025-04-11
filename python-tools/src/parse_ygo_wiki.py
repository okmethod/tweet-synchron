import requests

from src.utils.url_parser import encode_euc_jp 


def parse_ygo_wiki(page_name: str) -> None:
    param = encode_euc_jp(page_name)
    url = f"https://yugioh-wiki.net/index.php?{param}"

    response = requests.get(url)
    response.raise_for_status()

    print(response.text)


if __name__ == "__main__":
    parse_ygo_wiki("シンクロモンスター")