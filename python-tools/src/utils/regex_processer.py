import re


def remove_asterisk_number(entry: str) -> str:
    """エントリから *数字 を削除する"""
    return re.sub(r"\*\d+", "", entry).strip()


def is_enclosed_in_brackets(entry: str) -> bool:
    """エントリが《》で囲まれているかを判定する"""
    return bool(re.match(r"^《.*》$", entry))
