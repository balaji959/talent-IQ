# talent-IQ documentation

Developer documentation for the talent-IQ interview-practice prototype.
Source baseline: `balaji959/talent-IQ`, commit
`0217d32d714536fff71b1e80c1d2bcb938969b9d`, reviewed 18 September 2026.

The documentation source is in `docs/`. Configuration examples are in
`examples/`; they contain no working credentials. The documentation describes
the reviewed prototype and does not represent a deployed or fully tested service.

## Read the documentation

Build the documentation using the commands below, then open `site/index.html`.
Generated HTML is not committed. Reading and building the documentation does not
require running the application or connecting external services.

## Build it yourself

Use Python 3.11 or newer. From the repository root on Ubuntu:

```bash
python3 -m venv .venv
. .venv/bin/activate
python -m pip install -r requirements-docs.txt
python -m sphinx -n -W --keep-going -b html docs site
```

On Windows PowerShell, use `py -m venv .venv`, then run
`.\.venv\Scripts\python.exe -m pip install -r requirements-docs.txt` and
`.\.venv\Scripts\python.exe -m sphinx -n -W --keep-going -b html docs site`.
Python's venv package must be available in your chosen installation.

The site uses Sphinx and reStructuredText. Tutorials, how-to guides, reference,
and explanation serve different reader needs, following https://diataxis.fr/.

## Current limits

The application is an unfinished prototype. See the status page before following
the application setup guide. The documentation build does not prove the
application works. Cloud authentication, database operations, code execution,
chat, and video calls require separate end-to-end verification.

This initial documentation was prepared with AI assistance. Review, revise,
execute the instructions, and collect actual feedback before describing your
personal contribution in a portfolio or resume. No user testing or community
contribution is claimed by this package.
