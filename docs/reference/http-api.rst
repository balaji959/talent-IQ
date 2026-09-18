HTTP API reference
==================

This reference describes handlers in the reviewed source, not a tested service
contract. Session routes have a mount-path defect and additional implementation
blockers. Paths below show the intended ``/api/sessions`` mount, which must be
repaired before use. Do not build a client assuming these endpoints already work.

Authentication
--------------

Chat and session routes use ``protectRoute``: Clerk authentication followed by a
MongoDB lookup using the Clerk user ID. The application returns 401 when its
own user lookup fails, and 500 for caught middleware errors. Clerk's
``requireAuth`` runs first, so an unauthenticated request may be handled by the
SDK before reaching the application's JSON responses. Verify the installed
SDK's authentication transport and behavior during integration testing.

Mounted utility routes
----------------------

``GET /health``
   Returns 200: ``{"message":"Server is healthy"}`` after startup succeeds.
``POST /api/clerk/webhook``
   Accepts the raw JSON body and Svix signature headers. Invalid signatures
   produce 400 with ``{"error":"Invalid webhook"}``. Verified events are sent
   to Inngest with the ``clerk.`` prefix. Response:
   ``{"received":true}``. The source still acknowledges a failed Inngest send;
   therefore the response is not proof of successful user synchronization.
``/api/inngest``
   Delegated to the Inngest Express adapter. It is a service integration endpoint,
   not an application endpoint for creating interviews.
``GET /api/chat/token``
   Protected. Returns a Stream Chat token, ``userId`` and ``userName`` on success.
   The controller also assigns ``userImage`` from ``req.user.image``, whereas the
   model defines ``profileImage``; the image field may be omitted from JSON.

Intended session routes
-----------------------

``POST /api/sessions``
   Input JSON: ``{"problem":"two-sum","difficulty":"easy"}``.
   Both fields are required; omission produces 400. The model allows difficulty
   values ``easy``, ``medium``, and ``hard``. Intended success: 201 with
   ``{"session": ...}``. Currently writes ``hostuserId`` instead of required
   ``host`` and then relies on unresolved video/chat client code.
``GET /api/sessions/active``
   Intended response: 200 with ``{"session": [...]}`` (singular property name).
   Queries active sessions, oldest first, limited to 20, and populates host
   name, email, profile image, and Clerk ID. The model reference needs correction.
``GET /api/sessions/my-recent``
   Intended response: 200 with ``{"sessions": [...]}``. Selects sessions where
   the authenticated database user is host or participant, newest first,
   limited to 20.
``GET /api/sessions/:id``
   Intended response: 200 with ``{"session": ...}``; 404 for a missing record.
   Invalid IDs can fall into the generic 500 handler. No host/participant
   membership restriction is implemented beyond the shared authentication guard.
``POST /api/sessions/:id/join``
   Intended response: 200 with ``{"session": ...}``. Returns 404 if absent;
   returns 400 for inactive sessions, host self-join, or duplicate participation.
   The handler treats participants as an array, but the schema stores one ObjectId.
   It also references an unimported chat client.
``POST /api/sessions/:id/end``
   Intended response: 200 with ``session`` and ``message``. Missing record: 404;
   non-host: 403. The code attempts to delete the call and chat channel before
   marking the record completed. Provider-client issues currently block this flow.

Data model notes
----------------

``User`` stores name, unique email, unique Clerk ID, profile image, and timestamps.
``Session`` stores problem, difficulty, host, participants, status, call ID, and
timestamps. Status values are ``active``, ``completed``, and ``cancelled``.
There is no cancellation route in this revision. The two model files and the
controller disagree on relationship names and participant cardinality; see
:doc:`status` before using this as a schema contract.
