Build and edit your first documentation page
===========================================

In this tutorial, you will build this documentation locally, edit one paragraph,
and rebuild it. You do not need a database or API credentials.

Before you begin
----------------

Use an Ubuntu terminal with Python 3.11 or newer and the Python venv package.
Check out the documentation branch and open a terminal in the repository root directory.
Confirm that ``docs/conf.py`` and ``requirements-docs.txt`` exist there.

Create an isolated environment
-----------------------------

Run:

.. code-block:: bash

   python3 --version
   python3 -m venv .venv
   . .venv/bin/activate
   python -m pip install -r requirements-docs.txt

The version must be 3.11 or newer. Installation should finish without an error.
If creating the environment fails because venv is missing, install the venv
package for your Python version before continuing.

Build the site
--------------

.. code-block:: bash

   python -m sphinx -n -W --keep-going -b html docs site

Sphinx reads the ``.rst`` files and writes HTML into ``site``. A successful
build reports ``build succeeded``. Warnings count as failures because of ``-W``.
Open ``site/index.html`` in your browser. You should see the documentation title
and links grouped by reader task.

Make your first edit
--------------------

Open ``docs/index.rst`` in a text editor. Rewrite its first paragraph in your
own words, preserving the distinction between implemented code and verified
features. Save it and repeat the build command. Refresh the browser and check
that your new paragraph appears.

Do not indent an ordinary paragraph: indentation has meaning in
reStructuredText. Leave a blank line between paragraphs.

Check your understanding
------------------------

Explain why this tutorial builds documentation rather than starts the app.
Locate the file that controls the site title. Follow the configuration link
from the home page, then return using the navigation.

You have completed the tutorial when your edited paragraph renders correctly
and the build passes without warnings. Record your own result and date; the
existence of this tutorial is not evidence that you have run it.
