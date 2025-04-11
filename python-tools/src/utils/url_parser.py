from urllib.parse import quote, unquote


def encode_euc_jp(query: str) -> str:
    encoded = quote(query, encoding="euc-jp")
    return encoded


def decode_euc_jp(encoded_query: str) -> str:
    decoded = unquote(encoded_query, encoding="euc-jp")
    return decoded