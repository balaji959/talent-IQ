talent-IQ developer documentation
================================

talent-IQ is an interview-practice prototype with a React interface, a coding
exercise editor, and an Express backend containing authentication, user-sync,
chat-token, and session-management code.

These guides are for developers evaluating or maintaining the project. Start
with the current status, then choose a guide for your task.

.. important::

   This is documentation of an unfinished implementation. Video interviews,
   session lifecycle operations, and a complete dashboard are not verified
   working features. See :doc:`reference/status` for specific blockers.

.. toctree::
   :maxdepth: 1
   :caption: Start here

   reference/status
   tutorials/first-documentation-build

.. toctree::
   :maxdepth: 1
   :caption: How-to guides

   how-to/local-setup
   how-to/troubleshooting
   how-to/contribute

.. toctree::
   :maxdepth: 1
   :caption: Reference

   reference/configuration
   reference/http-api

.. toctree::
   :maxdepth: 1
   :caption: Explanation

   explanation/architecture

Source and verification
-----------------------

Reviewed against `commit 0217d32
<https://github.com/balaji959/talent-IQ/tree/0217d32d714536fff71b1e80c1d2bcb938969b9d>`_
on 18 September 2026. Implementation findings come from source inspection.
Check the included verification record for commands actually executed.

The organization follows `Diátaxis <https://diataxis.fr/>`_. The documentation
uses `Sphinx <https://www.sphinx-doc.org/en/master/usage/quickstart.html>`_
and reStructuredText.
