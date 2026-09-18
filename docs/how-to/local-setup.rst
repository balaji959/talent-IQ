Prepare a local application checkout
===================================

Use this guide to prepare a development environment. It is a source-derived
procedure, not an end-to-end-tested installation recipe. Resolve the blockers
in :doc:`../reference/status` before treating the application as operational.

Prerequisites
-------------

* Git and npm.
* Node.js 22.12 or newer within a compatible maintained release. The checked-in
  frontend lockfile resolves Vite 7.3.2, whose Node engine is
  ``^20.19.0 || >=22.12.0``.
* A reachable MongoDB database, locally or through a configured service.
* Your own development applications in Clerk and Stream. Complete user-sync
  verification also requires Inngest and delivery of signed Clerk events.

Obtain the code
---------------

.. code-block:: bash

   git clone https://github.com/balaji959/talent-IQ.git
   cd talent-IQ
   git switch --detach 0217d32d714536fff71b1e80c1d2bcb938969b9d
   git switch -c docs/local-verification
   npm ci --prefix frontend
   npm ci --prefix backend

The pinned revision matches these docs but predates the documentation files.
Keep the configuration examples from the documentation branch available while
working through this guide. Install the frontend and backend
separately: there is no root ``dev`` script. If you use a newer revision,
check the status findings against that revision.

Configure the services
----------------------

Copy the supplied ``examples/backend.env.example`` to ``backend/.env`` and
``examples/frontend.env.example`` to ``frontend/.env``. Fill in credentials
locally using your own development service accounts. The examples have no
working credentials. See :doc:`../reference/configuration` for each variable.

Use backend port ``3000`` and frontend port ``5173``. Explicitly set backend
``NODE_ENV=development``: the source defaults to production otherwise.
Use the same Clerk application for frontend and backend. Keep private keys
out of any variable beginning with ``VITE_``.

Repair portability before building
---------------------------------

Match the imports in ``frontend/src/App.jsx`` to the actual lowercase-leading
page filenames. Do the same for the three component imports in
``frontend/src/pages/problemPage.jsx``. Linux paths are case-sensitive; Windows
may hide these mismatches. See the exact list in :doc:`../reference/status`.

.. code-block:: bash

   npm run build --prefix frontend

The build should produce ``frontend/dist``. Stop and investigate any build
failure before proceeding. A successful build alone does not test login or calls.

Start the development processes
-------------------------------

In terminal 1, from the repository root:

.. code-block:: bash

   npm run dev --prefix backend

In terminal 2:

.. code-block:: bash

   npm run dev --prefix frontend -- --port 5173 --strictPort

The backend loads its environment from ``backend/.env`` when its npm script runs.
It requires Stream keys at module import time and connects to MongoDB before
listening. A missing service configuration can prevent even the health endpoint
from being available.

Check the basic result
----------------------

.. code-block:: bash

   curl -i http://localhost:3000/health

Expected response, once the server starts: HTTP 200 and
``{"message":"Server is healthy"}``. Open ``http://localhost:5173`` and check that
the signed-out landing page loads. Login leads to a placeholder dashboard in
this revision. The exercise list route is ``/problem`` after sign-in.

Do not use the current Run Code integration until the exposed credential has
been revoked and execution moved behind a server-side integration. Do not
interpret a health response as proof that video sessions work.

User synchronization checkpoint
-------------------------------

The source receives signed Clerk webhooks at ``/api/clerk/webhook`` and forwards
events to Inngest. Its registered handlers process ``clerk.user.created`` and
``clerk.user.deleted``. Configure a provider-supported route from Clerk to your
development endpoint and register ``/api/inngest`` with your Inngest environment.
The precise tunnel and provider-dashboard steps are not verified in this guide.

With a dedicated test account, confirm the created event completes and the
MongoDB user exists before testing protected API routes. A successful Clerk
login alone is insufficient. Existing Clerk users are not automatically
backfilled by this code. Record remaining failures in the verification record.
