import type { Request, Response } from "express";
import type { ResponseCardListJson } from "../types/parser";

const fetchCardList = async (req: Request, res: Response) => {
  const { pageName } = req.params;
  if (!pageName) {
    console.warn("Missing required parameters:", req.params);
    res.status(400).json({
      error: "Missing required parameters",
      details: req.params,
    });
    return;
  }

  const response: ResponseCardListJson = {
    cardList: [pageName],
  };
  res.json(response);
};

export default fetchCardList;
