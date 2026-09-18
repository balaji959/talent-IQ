How the prototype fits together
===============================

The project separates browser interaction from an Express service. The frontend
is a Vite/React application, not a Next.js application. MongoDB persists users
and sessions. External services handle identity, event processing, chat, and
the intended video and code-execution functionality.

Browser and API boundaries
--------------------------

``main.jsx`` wraps the React application with Clerk, React Router, and TanStack
Query providers. ``App.jsx`` controls navigation based on signed-in state.
The problem list and expected outputs come from a local JavaScript dataset.
The editor currently sends execution requests directly to an external service.

The Axios helpers configure a base URL and credentials, but they do not make
the placeholder dashboard a complete session client. Similarly, importing a
provider is not evidence that all intended data fetching is implemented.

Why login and the application user are separate
-----------------------------------------------

Clerk establishes identity. The backend also requires a MongoDB user record.
The intended provisioning path is:

.. code-block:: text

   Clerk user.created
     -> signed webhook at /api/clerk/webhook
     -> Inngest event clerk.user.created
     -> MongoDB User.create
     -> Stream Chat user upsert

This introduces a synchronization delay and partial-failure cases. A person can
be signed in while the application record is missing. If MongoDB creation
succeeds but the Stream operation fails, a retry must avoid duplicate creation;
the current implementation does not yet handle that reliably.

Session identity and relationships
-----------------------------------

The intended model uses a MongoDB user ID for local relationships and the Clerk
user ID for provider operations. Session creation generates a call ID to associate
the local session with external video and chat resources. These identifiers
have different purposes and should not be substituted for one another.

The source attempts to create a database record, video call, and chat channel
in sequence. Such a sequence needs compensation for partial failures. Ending a
session likewise spans external deletion and a database update. These flows
are incomplete, so this explanation describes their intent and failure modes,
not a guaranteed transaction.

What a practice result means
----------------------------

The editor normalizes output whitespace and compares stdout to stored expected
output. Matching that string triggers a success notification. This can support
a simple practice exercise, but it is not equivalent to running a robust suite
of hidden tests or proving an algorithm correct.

Why the documentation separates task types
------------------------------------------

A learner needs a controlled first exercise; a maintainer needs a procedure for
a particular task; an integrator needs precise names and shapes; and a developer
investigating a failure needs reasons and relationships. Those needs motivate
the tutorial, how-to, reference, and explanation sections respectively.
