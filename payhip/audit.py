"""Check payhip/store.css for the four failure modes that fail silently.

Payhip gives no feedback when custom CSS is invalid: the rule is simply
dropped and the store looks subtly wrong with no error anywhere. Run this
before pasting.
"""

import re
import sys
from pathlib import Path

css = (Path(__file__).parent / "store.css").read_text(encoding="utf-8")

# Comments and data URIs legitimately contain ">" and "{".
body = re.sub(r"/\*.*?\*/", "", css, flags=re.S)
body = re.sub(r'url\("data:[^"]*"\)', "url(DATA)", body)

problems = []

gt = body.count(">")
if gt:
    problems.append(f"{gt} child combinator(s): Payhip escapes '>' to '&gt;' and the rule dies")

used = set(re.findall(r"var\(\s*(--[\w-]+)", body))
defined = set(re.findall(r"(--[\w-]+)\s*:", body))
if used - defined:
    problems.append(f"undefined variables: {', '.join(sorted(used - defined))}")

anim = {n for n in re.findall(r"animation\s*:\s*([A-Za-z][\w-]*)", body) if n != "none"}
keyframes = set(re.findall(r"@keyframes\s+([A-Za-z][\w-]*)", body))
if anim - keyframes:
    problems.append(f"missing @keyframes: {', '.join(sorted(anim - keyframes))}")

if body.count("{") != body.count("}"):
    problems.append(f"unbalanced braces: {body.count('{')} open, {body.count('}')} close")

if re.findall(r"#[0-9a-fA-F]{5}\b", body):
    problems.append("5-digit hex colour (only 3, 4, 6 and 8 are valid)")

if problems:
    print("FAIL")
    for p in problems:
        print("  -", p)
    sys.exit(1)

print(f"OK - {len(css) / 1024:.1f} KB, {len(css.splitlines())} lines, no silent failures")
