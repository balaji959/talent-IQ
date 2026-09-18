Improve the documentation with evidence
=======================================

Choose one reader task, such as locating an environment variable or building the
documentation. State who the reader is and what outcome they need before editing.

Edit and check
--------------

1. Read the relevant source at the documented revision.
2. Edit the appropriate ``.rst`` page. Use imperative steps in procedures,
   consistent variable names, and explicit expected results.
3. Build with ``python -m sphinx -n -W --keep-going -b html docs site``.
4. Read the rendered page. Check headings, code blocks, links, and narrow-screen
   readability. A passing markup build does not verify the application behavior.
5. Execute the procedure where possible. Record the OS, revision, command and
   outcome; label untested steps explicitly.

Collect real reader feedback
-----------------------------

Ask a willing classmate to build the documentation using only the tutorial.
Avoid coaching them immediately: note where they stop, misunderstand a step,
or need information that is missing. Do not request their service credentials.

Record the task, observed difficulty, suggested change, and retest result in the
feedback template. Do not fill it with imagined feedback. Revise the guide and
ask the same reader to repeat the affected step if they are willing.

Prepare a reviewable change
---------------------------

Keep your edits on a branch. Describe the reader problem, the change, and what
you tested in a commit or pull request. Submit only when you intend to share it.
This package does not publish a pull request or message another person.

Describe your contribution accurately
-------------------------------------

This initial draft was AI-assisted. Your portfolio should identify what you
personally researched, wrote, corrected, tested, and revised. Building the site
once demonstrates a first tool exercise, not professional Linux administration
or community leadership. Add resume claims after doing the corresponding work.
