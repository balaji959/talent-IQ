Troubleshoot local setup
=======================

Use the symptom to choose a check. Capture the exact error and revision before
changing configuration. Never include credentials in a shared diagnostic report.

Frontend build cannot resolve a page or component
------------------------------------------------

Compare the import spelling to the filenames listed in :doc:`../reference/status`.
Fix the case mismatch, then rerun ``npm run build --prefix frontend``. A build
working on Windows does not establish that it works on Ubuntu.

Missing VITE_CLERK_PUBLISHABLE_KEY
--------------------------------

Set that variable in ``frontend/.env`` using your Clerk application's publishable
key, then restart Vite. A backend-only key does not configure the frontend.

Backend exits before the health route is available
-------------------------------------------------

If the error names Stream keys, fill both Stream variables in ``backend/.env``.
If it names ``DB_URL`` or a MongoDB connection error, verify the connection URI
and database availability. Start the backend through its npm script so dotenv
loads from the correct working directory. Check service credentials locally.

Port already in use or browser requests fail
-------------------------------------------

Set backend ``PORT=3000`` and frontend port 5173. Match ``CLIENT_URL`` to
``http://localhost:5173`` and verify the frontend API base URL. Use ``--strictPort``
so Vite reports a collision instead of silently changing the browser origin.

Login succeeds but the API says User not found
--------------------------------------------

The Clerk account may not yet have a corresponding MongoDB record. Inspect the
signed webhook delivery, Inngest event, and function result. A webhook response
of ``received: true`` alone is insufficient. The current code processes user
creation and deletion; it does not backfill pre-existing users.

Session request returns 404 or 500
---------------------------------

A 404 at the intended path can follow from the missing leading slash in the
router mount. After fixing it, creation and join operations still have schema
and provider-client defects. See :doc:`../reference/status`; repeatedly changing
API keys will not correct those defects.

Run Code fails
--------------

Stop using the current integration until its embedded key is revoked and the
credential is moved to a server-side implementation. Investigate endpoint/header
agreement and execution status handling in that repair. A frontend environment
variable is not a private location for a replacement key.

Report a reproducible problem
-----------------------------

Include the commit, operating system, Node version, command, expected outcome,
actual result, and redacted error. Include the exact documentation step that
failed and whether you changed anything in the source. This makes it possible
to distinguish an incorrect instruction from an application defect.
