import { Link } from "react-router"
import { ArrowRightIcon, CheckIcon, CodeIcon, ShieldIcon, SparklesIcon, VideoIcon, ZapIcon } from "lucide-react"
import { SignInButton } from "@clerk/clerk-react"

const HomePage = () => {
  return (
    <div className="bg-base-gradient-to-br from-base-100 via-base-200 to-base-300">
      {/* NAVBAR */}
      <nav className="bg-base-100/80 backdrop-blur-md border-b border-primary/20 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to={"/"} className="flex items-center gap-3 hover:scale-105 transition-transform duration-200">
            <div className="size-10 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-lg">
              <SparklesIcon className="size-6 text-white"/>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent font-mono tracking-wider">
                Talent IQ
              </span>
              <span className="text-xs text-base-content/60 font-medium -mt-1">Unlock Your Potential</span>
            </div>
          </Link>

          <SignInButton mode="modal">
            <button className="group px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-xl text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-colors duration-200 hover:scale-105 flex items-center gap-2">
              <span>Get Started</span>
              <ArrowRightIcon className="size-4 group-hover:translate-x-0.5 transition-transform"/>
            </button>
          </SignInButton>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT CONTENT */}
          <div className="space-y-8">
            <div className="badge badge-primary badge-lg">
              <ZapIcon className="size-4"/>
              Real-Time Collaboration
            </div>

            <h1 className="text-5xl lg:text-7xl font-black leading-tight">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Code Together
              </span>
              <br/>
              <span className="text-base-content">
                Learn Together
              </span>
            </h1>

            <p className="text-xl text-base-content/70">
              The ultimate platform for developers to collaborate, learn, and grow together. Pair programming connect face-to-face, interactive learning resources, ace your technical interviews.
            </p>

            {/* FEATURE PILLS */}
            <div className="flex flex-wrap gap-3">
              <div className="badge badge-lg badge-outline">
                <CheckIcon className="size-4 text-success"/>
                Live Video Chat
              </div>
              <div className="badge badge-lg badge-outline">
                <CheckIcon className="size-4 text-success"/>
                Code Editor
              </div>
              <div className="badge badge-lg badge-outline">
                <CheckIcon className="size-4 text-success"/>
                Multi-Language
              </div>
            </div>

            {/* CTA BUTTONS */}
            <div className="flex flex-wrap gap-4">
              <SignInButton mode="modal">
                <button className="btn btn-primary btn-lg gap-2">
                  Start Coding Now
                  <ArrowRightIcon className="size-4"/>
                </button>
              </SignInButton>

              <button className="btn btn-outline btn-lg gap-2">
                <VideoIcon className="size-4"/>
                Watch Demo
              </button>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div>
            <img
              src="/hero.png"
              alt="CodeCollab Platform"
              className="w-full h-auto rounded-3xl shadow-2xl border-4 border-base-100 hover:scale-105 transition-transform duration-500"
            />
          </div>

        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Everything You Need to <span className="text-primary font-mono">Succeed</span>
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Powerful features designed to make your coding interviews seamless and productive
          </p>
        </div>

        {/* FEATURES GRID */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                <VideoIcon className="size-8 text-primary" />
              </div>
              <h3 className="card-title">HD Video Call</h3>
              <p className="text-base-content/70">
                Crystal clear video and audio for seamless communication during interviews
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <div className="size-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-4">
                <CodeIcon className="size-8 text-secondary" />
              </div>
              <h3 className="card-title">Collaborative Code Editor</h3>
              <p className="text-base-content/70">
                Real-time code editing with syntax highlighting and multiple language support
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <div className="size-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-4">
                <ShieldIcon className="size-8 text-accent" />
              </div>
              <h3 className="card-title">Smart Interviews</h3>
              <p className="text-base-content/70">
                Share your screen, discuss solutions and learn together with our interactive environment
              </p>
            </div>
          </div>


        </div>
      </div>

    </div>
  )
}

export default HomePage