interface CardSet {
  set_name: string;
  set_code: string;
  set_rarity: string;
  set_rarity_code: string;
  set_price: string;
}

export interface CardImage {
  id: number;
  image_url: string;
  image_url_small: string;
  image_url_cropped: string;
}

interface CardPrice {
  cardmarket_price: string;
  tcgplayer_price: string;
  ebay_price: string;
  amazon_price: string;
  coolstuffinc_price: string;
}

interface CardInfo {
  id: number;
  name: string;
  type: string;
  frameType: string;
  desc: string;
  ygoprodeck_url: string;

  card_images?: CardImage[];

  race?: string;
  archetype?: string;
  atk?: number;
  def?: number;
  level?: number;
  attribute?: string;

  card_sets?: CardSet[];
  card_prices?: CardPrice[];
}

export interface ResponseCardInfoJson {
  data: CardInfo[];
}
