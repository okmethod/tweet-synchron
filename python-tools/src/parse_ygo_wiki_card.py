import requests

from src.utils.url_parser import encode_euc_jp 
from src.utils.html_parser import H2TagsParser, PreTagsParser, PlainTextParser
from src.utils.regex_processer import remove_asterisk_number, is_enclosed_in_brackets


def parse_ygo_wiki_card(page_name: str) -> dict[str, str | list[str]]:
    param = encode_euc_jp(page_name)
    url = f"https://yugioh-wiki.net/index.php?{param}"

    response = requests.get(url)
    response.raise_for_status()

    h2_tags_parser = H2TagsParser()
    h2_tags_parser.feed(response.text)

    pre_tags_parser = PreTagsParser()
    pre_tags_parser.feed(response.text)

    plain_text_parser = PlainTextParser()
    plain_text_parser.feed(response.text)

    return {
        "name": h2_tags_parser.card_names[0] if h2_tags_parser.card_names else "",
        "card_texts": pre_tags_parser.pre_texts,
        "plain_text": plain_text_parser.get_text(),
    }


if __name__ == "__main__":
    page_name = "《ワンハンドレッド・アイ・ドラゴン》"
    card_detail = parse_ygo_wiki_card(page_name)
    print(card_detail["name"])
    for text in card_detail["card_texts"]:
        print(text)
