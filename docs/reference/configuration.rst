Configuration reference
=======================

The backend reads ``backend/.env`` through dotenv. The frontend reads Vite
variables at startup/build time. Restart the affected process after an edit.

Backend
-------

``PORT``
   Listening port. ``env.js`` defaults to 5173. Use 3000 locally to avoid the
   frontend's port. The fallback 3000 in ``server.js`` is normally bypassed.
``NODE_ENV``
   Defaults to ``production``. Set ``development`` locally; production enables
   static frontend serving and a catch-all HTML route.
``DB_URL``
   MongoDB connection URI. Required by ``connectDB``. Use a separate development
   database; a local example is ``mongodb://127.0.0.1:27017/talent_iq_dev``.
``CLIENT_URL``
   Allowed CORS origin, for example ``http://localhost:5173``. Match the browser
   origin exactly; do not append an API path.
``CLERK_PUBLISHABLE_KEY`` / ``CLERK_SECRET_KEY``
   Backend Clerk configuration. Use keys for the same application as the frontend.
``CLERK_WEBHOOK_SECRET``
   Signing secret used directly by the webhook route in ``server.js``. It is not
   listed in ``env.js`` but is required to verify Clerk deliveries.
``STREAM_API_KEY`` / ``STREAM_SECRET_KEY``
   Required when importing ``lib/stream.js``. That file initializes Stream Chat
   clients; it does not initialize the video client assumed by session code.
``INNGEST_EVENT_KEY`` / ``INNGEST_SIGNING_KEY``
   Inngest service credentials exposed in ``env.js``. The constructor in
   ``lib/inngest.js`` receives only an application ID; verify the installed SDK's
   environment-based configuration in your chosen development/cloud setup.
``RENDER``
   When truthy in production, selects the hard-coded Render frontend directory.
   Leave unset locally. The alternative relative production path needs repair
   because it traverses one directory too far upwards.

Frontend
--------

``VITE_CLERK_PUBLISHABLE_KEY``
   Required by ``src/main.jsx``; omission throws an explicit startup error.
``VITE_API_BASE_URL``
   Read by both Axios helper copies. The supplied example uses
   ``http://localhost:3000/api`` for future callers that append ``/chat/token``
   or ``/sessions``. No session request flow is wired into the current dashboard.
   Do not repeat ``/api`` when composing a request path.

Do not put private provider credentials in frontend configuration. Moving the
existing execution-service key to a ``VITE_`` variable would still expose it to
the browser. This package does not introduce a replacement execution endpoint.

Scripts
-------

.. list-table:: Package scripts
   :header-rows: 1
   :widths: 25 35 40

   * - Package
     - Command
     - Meaning
   * - Root
     - ``npm run build``
     - Installs backend/frontend dependencies and builds the frontend.
   * - Root
     - ``npm start``
     - Delegates to the backend start script.
   * - Backend
     - ``npm run dev`` / ``npm start``
     - Starts nodemon / Node on ``src/server.js``.
   * - Frontend
     - ``npm run dev`` / ``npm run build``
     - Starts Vite / builds static frontend assets.
   * - Frontend
     - ``npm run lint`` / ``npm run preview``
     - Runs ESLint / previews a built frontend.
