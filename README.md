# AI Tools Directory

A de-duplicated directory of ~196 AI tools across 18 categories, compiled from four
"top AI tools" roundup infographics (130+/120+/110+ tool lists) plus relevant 2026
additions and free/open-source GitHub alternatives in every category.

## Files
- `generate_ai_tools_sheet.py` — generator script (single source of truth for the data)
- `AI-Tools-Directory.xlsx` — formatted workbook (READ ME, All Tools, Top Picks tabs)
- `ai-tools-directory.csv` — plain CSV export
- `sheets-import.csv` — CSV with `=IMAGE()` logo formulas, for importing into Google Sheets

## Columns
Logo | Tool | Type | Website | What it does | Approx cost | Works with Claude? |
Pros | Cons | Best for | Integration /10 | Cost value /10 | Functionality /10 | Overall | Rank in category

Green/OSS rows are free or open-source (GitHub) alternatives listed in the same
category as the commercial tools they can replace.

Prices are approximate as of June 2026 — always check vendor pricing pages.

## Regenerate
```bash
pip install openpyxl
python3 generate_ai_tools_sheet.py
```
