Implementation status and known blockers
========================================

Baseline: ``0217d32d714536fff71b1e80c1d2bcb938969b9d``. Findings below are
source-inspection results. No cloud accounts or credentials were used to test
the application. A documentation build is separate from an application test.

Present in the source
---------------------

* React routes for a landing page, dashboard placeholder, exercise list, and editor.
* Monaco-based editing with JavaScript, Python, and Java options.
* Clerk provider setup, an Express health route, and a signed webhook receiver.
* MongoDB models, Inngest user-create/delete functions, and a Stream Chat token route.
* Session controller code expressing an intended create/join/end lifecycle.

Blocking issues
---------------

1. **Exposed execution-service credential.**
   ``frontend/src/lib/piston.js`` embeds a credential in browser-delivered code.
   Revoke it with the provider and use a new server-side integration. Do not
   call it while reviewing the project. The endpoint hostname and RapidAPI host
   header also differ and need reconciliation with the selected provider.
2. **Linux import casing.**
   ``App.jsx`` imports ``HomePage``, ``ProblemsPage``, ``ProblemPage`` and
   ``DashboardPage``; the files are ``homepage.jsx``, ``problemsPage.jsx``,
   ``problemPage.jsx`` and ``dashboardPage.jsx``. ``problemPage.jsx`` imports
   ``ProblemDescription``, ``OutputPanel`` and ``CodeEditorPanel`` while the files
   start with lowercase letters. Align names and imports before a Linux build.
3. **Session router prefix.**
   ``server.js`` uses ``app.use("api/sessions", sessionRoutes)`` without the
   leading slash required for the intended ``/api/sessions`` URL.
4. **Session data mismatches.**
   Creation supplies ``hostuserId`` instead of the required schema field ``host``.
   ``participants`` is a single ObjectId with null default, but joining calls
   ``includes`` and spreads it as an array. References name model ``user`` while
   the registered Mongoose model is ``User``. Align these before testing sessions.
5. **Incomplete Stream integration.**
   The exported ``streamClient`` is a Stream Chat client, but controllers call
   ``streamClient.video.call``. ``chatClient`` is not imported in that controller,
   and creation calls ``channel.create()`` without defining ``channel``. The
   channel configuration also uses ``member`` rather than a verified member list.
6. **Dashboard and call UI.**
   ``dashboardPage.jsx`` renders only ``Dashboard Page``. No call page or working
   session controls appear in the inspected frontend. Complete these before
   presenting the application as a usable video interview platform.

Additional reliability gaps
---------------------------

* ``User.create`` in the user-created handler is not idempotent. An event retry
  after a partial failure can encounter duplicate email/Clerk-ID constraints.
* The webhook returns success even if forwarding to Inngest fails.
* No handler updates a user when Clerk profile details change.
* Chat token output reads ``image`` instead of ``profileImage``.
* The non-Render production static path resolves outside the repository's
  ``frontend/dist`` directory; local production serving needs correction.
* The editor's success message compares normalized stdout with a stored expected
  output. It does not prove correctness across hidden or comprehensive test cases.

Recommended repair order
------------------------

Revoke the exposed credential first. Correct import casing and verify a frontend
build. Fix router and schema mismatches, initialize the correct provider clients,
then validate authentication and user synchronization. Implement the session UI
and exercise host/participant flows with two development accounts. Update this
page with the tested commit and results after each repair.
