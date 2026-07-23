#!/usr/bin/env python3
"""Ping the Blueticks API to confirm your key works and list connected WhatsApp engines.

Usage
-----
    pip install blueticks
    export BLUETICKS_API_KEY="bt_live_..."   # or put it in a local .env file
    python3 ping_blueticks.py

The key is read from the BLUETICKS_API_KEY environment variable (or a local .env
file, loaded below) — it is never hardcoded here. Do not commit your real key;
.env is already covered by .gitignore.

Note: this must run somewhere with outbound access to https://api.blueticks.co.
It will NOT work inside a sandbox whose network policy blocks that host.
"""
from __future__ import annotations

import os
import sys
from pathlib import Path


def _load_dotenv(path: str = ".env") -> None:
    """Minimal .env loader (KEY=VALUE lines) so no extra dependency is needed.

    Existing environment variables win, so an exported key is never overwritten.
    """
    p = Path(path)
    if not p.is_file():
        return
    for raw in p.read_text(encoding="utf-8").splitlines():
        line = raw.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, _, val = line.partition("=")
        key, val = key.strip(), val.strip().strip('"').strip("'")
        os.environ.setdefault(key, val)


def main() -> int:
    _load_dotenv()

    if not os.environ.get("BLUETICKS_API_KEY"):
        print(
            "error: BLUETICKS_API_KEY is not set.\n"
            "  export BLUETICKS_API_KEY='bt_live_...'   (or add it to a local .env file)",
            file=sys.stderr,
        )
        return 2

    try:
        from blueticks import Blueticks
    except ModuleNotFoundError:
        print("error: the 'blueticks' package is not installed. Run: pip install blueticks", file=sys.stderr)
        return 2

    from blueticks._errors import BluetickError  # available once the package is installed

    try:
        with Blueticks() as client:  # reads BLUETICKS_API_KEY from the environment
            ping = client.ping()
    except BluetickError as e:
        # Covers auth failures, connectivity/proxy blocks, and API errors.
        print(f"error: Blueticks ping failed: {e}", file=sys.stderr)
        return 1

    conns = ping.whatsapp_connections
    print(f"api:        {ping.api}")
    print(f"account_id: {ping.account_id}")
    if conns:
        print(f"whatsapp_connections ({len(conns)}):")
        for c in conns:
            print(f"  - {c.id}  type={c.type}  connected={c.connected}")
    else:
        print("whatsapp_connections: none — link a WhatsApp number in the Blueticks dashboard (scan the QR).")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
