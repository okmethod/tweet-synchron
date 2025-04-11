import requests

from src.utils.url_parser import encode_euc_jp 
from src.utils.html_parser import StyleTableParser


def parse_ygo_wiki(page_name: str) -> list[str]:
    param = encode_euc_jp(page_name)
    url = f"https://yugioh-wiki.net/index.php?{param}"

    response = requests.get(url)
    response.raise_for_status()

    parser = StyleTableParser()
    parser.feed(response.text)

    head_items = [row[0] for row in parser.table_data if any(cell.strip() for cell in row)]
    return head_items


if __name__ == "__main__":
    monster_names = parse_ygo_wiki("シンクロモンスター")
    for monster_name in monster_names:
        print(monster_name)