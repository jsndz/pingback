import React from "react";
import { Check, Star } from "phosphor-react";

const Pricing: React.FC = () => {
  const [isYearly, setIsYearly] = React.useState(false);

  const plans = [
    {
      name: "free",
      price: 0,
      yearlyPrice: 0,
      description: "Perfect for side projects and open source",
      features: [
        "1,000 feedback submissions/month",
        "Basic dashboard",
        "Community support",
        "Open source license",
      ],
      popular: false,
    },
    {
      name: "pro",
      price: 12,
      yearlyPrice: 10,
      description: "For growing products and teams",
      features: [
        "10,000 feedback submissions/month",
        "Advanced analytics",
        "Custom branding",
        "Priority support",
        "Team collaboration",
        "Export data",
      ],
      popular: true,
    },
    {
      name: "enterprise",
      price: "custom",
      yearlyPrice: "custom",
      description: "For large organizations",
      features: [
        "Unlimited feedback submissions",
        "Advanced integrations",
        "Custom deployment",
        "SLA guarantee",
        "Dedicated support",
        "Custom features",
      ],
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 lowercase">
            simple pricing
          </h2>
          <p className="text-xl text-[#8891A5] max-w-2xl mx-auto mb-8">
            Choose the plan that fits your needs. Start free, upgrade when you
            grow.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span
              className={`text-sm ${
                !isYearly ? "text-[#F2F2F2]" : "text-[#8891A5]"
              }`}
            >
              monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                isYearly ? "bg-[#B8FF00]" : "bg-[#2B2D42]"
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  isYearly ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
            <span
              className={`text-sm ${
                isYearly ? "text-[#F2F2F2]" : "text-[#8891A5]"
              }`}
            >
              yearly
            </span>
            {isYearly && (
              <span className="text-sm bg-[#B8FF00]/20 text-[#B8FF00] px-2 py-1 rounded">
                save 20%
              </span>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-[#12132D] border rounded-lg p-8 transition-all hover:translate-y-[-4px] ${
                plan.popular
                  ? "border-[#B8FF00] ring-2 ring-[#B8FF00]/20"
                  : "border-[#2B2D42] hover:border-[#00F0FF]"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-[#B8FF00] text-[#0A0A23] px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Star size={14} />
                    popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2 lowercase">
                  {plan.name}
                </h3>
                <div className="mb-4">
                  {typeof plan.price === "number" ? (
                    <div>
                      <span className="text-4xl font-bold">
                        ${isYearly ? plan.yearlyPrice : plan.price}
                      </span>
                      <span className="text-[#8891A5] text-sm">/month</span>
                    </div>
                  ) : (
                    <div className="text-4xl font-bold">{plan.price}</div>
                  )}
                </div>
                <p className="text-[#8891A5] text-sm">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <Check size={16} className="text-[#B8FF00] flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-lg font-semibold transition-all ${
                  plan.popular
                    ? "bg-[#B8FF00] text-[#0A0A23] hover:bg-[#A3E600]"
                    : "border border-[#2B2D42] text-[#F2F2F2] hover:border-[#00F0FF] hover:text-[#00F0FF]"
                }`}
              >
                {plan.name === "enterprise" ? "contact sales" : "get started"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
