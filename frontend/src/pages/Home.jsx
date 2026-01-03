import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  Radio,
  ShieldCheck,
  GraduationCap,
  HeartPulse,
  Scale,
  Code2,
  Factory,
  Landmark
} from "lucide-react";
import { Button } from "../components/ui/button";

/* ------------------------------------------------------------------
   AI Expertise Orbit – CSS-driven
------------------------------------------------------------------- */
const AIExpertiseOrbit = () => {
  const rings = [
    { key: 1, className: "orbit-1", radius: "105px" },
    { key: 2, className: "orbit-2", radius: "155px" },
    { key: 3, className: "orbit-3", radius: "212px" }
  ];

  const atoms = [
    { ring: 1, type: "feature", sizeClass: "atom--inner", angle: 225, Icon: Radio, label: "Telco" },
    { ring: 1, type: "feature", sizeClass: "atom--inner", angle: 35, Icon: ShieldCheck, label: "Finance" },
    { ring: 1, type: "dummy", angle: 135, dummyClass: "dummy-blue" },

    { ring: 2, type: "feature", sizeClass: "atom--mid", angle: 310, Icon: GraduationCap, label: "Education" },
    { ring: 2, type: "feature", sizeClass: "atom--mid", angle: 190, Icon: HeartPulse, label: "Healthcare" },
    { ring: 2, type: "dummy", angle: 230, dummyClass: "dummy-orange" },

    { ring: 3, type: "feature", sizeClass: "atom--outer", angle: 70, Icon: Scale, label: "Legal" },
    { ring: 3, type: "feature", sizeClass: "atom--outer", angle: 140, Icon: Code2, label: "Software" },
    { ring: 3, type: "feature", sizeClass: "atom--outer", angle: 260, Icon: Factory, label: "Manufacturing" },
    { ring: 3, type: "feature", sizeClass: "atom--outer", angle: 350, Icon: Landmark, label: "Government" },
    { ring: 3, type: "dummy", angle: 30, dummyClass: "dummy-blue" },
    { ring: 3, type: "dummy", angle: 215, dummyClass: "dummy-orange" }
  ];

  return (
    <div className="orbit-container relative">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 520 520" aria-hidden>
        <circle className="track" cx="260" cy="260" r="105" />
        <circle className="track" cx="260" cy="260" r="155" />
        <circle className="track" cx="260" cy="260" r="212" />
      </svg>

      <div className="center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <span className="text-xs font-medium text-center leading-tight">
          Our AI<br />Expertise
        </span>
      </div>

      {rings.map(ring => (
        <div key={ring.key} className={`orbit ${ring.className}`} style={{ "--radius": ring.radius }}>
          {atoms
            .filter(a => a.ring === ring.key)
            .map((a, idx) => {
              const vars = { "--angle": `${a.angle}deg`, "--angleNeg": `${-a.angle}deg` };

              if (a.type === "dummy") {
                return (
                  <div key={idx} className={`atom dummy ${a.dummyClass}`} style={vars}>
                    <div className="atom-anchor">
                      <div className="dummy-dot" />
                    </div>
                  </div>
                );
              }

              const Icon = a.Icon;
              return (
                <div key={idx} className={`atom ${a.sizeClass}`} style={vars}>
                  <div className="atom-anchor">
                    <div className="atom-angle-fix">
                      <div className="atom-spin-fix">
                        <div className="atom-content">
                          <div className="atom-icon">
                            <Icon className="atom-icon-svg" strokeWidth={1.5} />
                          </div>
                          <div className="atom-label">{a.label}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      ))}
    </div>
  );
};

/* ------------------------------------------------------------------
   Home
------------------------------------------------------------------- */
const Home = () => {
  const [activeInfraTab, setActiveInfraTab] = useState(0);

  const infraTabs = [
    {
      name: "Datacenters",
      title: "Purpose-built for AI",
      description:
        "BluBridge's Arctic data centers are engineered for extreme AI workloads using 100% renewable energy.",
      features: ["100% Renewable Energy", "Arctic cooling", "Scalable", "Sovereign hosting"],
      link: "/products/glomfjord"
    },
    {
      name: "GPU Nodes",
      title: "High-performance compute",
      description:
        "Access NVIDIA H100, H200 and GB200 NVL72 optimized for AI training and inference.",
      features: ["Grace Blackwell", "Bare metal", "On-demand", "AI optimized"],
      link: "/products/gpu-nodes"
    },
    {
      name: "Networking",
      title: "GPU fabric optimized for AI",
      description:
        "Low-latency, high-bandwidth networking for distributed AI workloads.",
      features: ["RoCE", "Non-blocking", "400Gbps", "AI scale"],
      link: "/products/gpu-nodes"
    }
  ];

  return (
    <div>
      {/* HERO */}
      <section className="py-24 bg-section-hero">
        <div className="container-custom grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="text-5xl font-light text-[#0B1F3B] mb-6">
              Infrastructure built for AI at scale
            </h1>
            <p className="text-[#243447] mb-8 leading-relaxed max-w-xl">
              We design, build, and operate the full AI infrastructure stack.
            </p>

            <div className="flex gap-4">
              <Link to="/contact">
                <Button className="bg-[#0B1F3B] text-white px-8 py-4">
                  Reserve GPUs
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="border-[#0B1F3B]">
                  Contact
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex justify-center">
            <AIExpertiseOrbit />
          </div>
        </div>
      </section>

      {/* INFRASTRUCTURE */}
      <section className="py-20 bg-[#f3f1e9] relative overflow-hidden">
        <div className="container-custom grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl font-light mb-6 text-[#0B1F3B]">
              BluBridge Infrastructure
            </h2>

            <div className="flex flex-wrap gap-2 mb-6">
              {infraTabs.map((tab, i) => (
                <button
                  key={i}
                  onClick={() => setActiveInfraTab(i)}
                  className={`px-4 py-2 rounded-lg text-sm ${
                    activeInfraTab === i
                      ? "bg-[#0B1F3B] text-white"
                      : "bg-white border border-[#D6DEC3]"
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#D6DEC3]">
              <h3 className="text-xl font-medium mb-3">
                {infraTabs[activeInfraTab].title}
              </h3>
              <p className="text-sm mb-4">
                {infraTabs[activeInfraTab].description}
              </p>

              <div className="grid grid-cols-2 gap-2">
                {infraTabs[activeInfraTab].features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-[#328CC1]" />
                    {f}
                  </div>
                ))}
              </div>

              <Link
                to={infraTabs[activeInfraTab].link}
                className="inline-flex items-center gap-2 mt-4 text-[#328CC1]"
              >
                See more <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
