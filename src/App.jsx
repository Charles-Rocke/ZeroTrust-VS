import { useState, useEffect } from "react";
import Pillar from "./components/Pillar";

// Pillars
const ZeroTrust = [
  {
    pillar: "Identity",
    functions: {
      tiers: ["Traditional", "Advanced", "Optimal"],
      types: [
        {
          typeName: "Authentication",
          tierDescriptions: [
            "Agency authenticates identity using either passwords or multi-factor authentication(MFA)",
            "Agency authenticates identity using MFA",
            "Agency continuously validates identity, not just when access is initially granted",
          ],
        },
        {
          typeName: "Identity Stores",
          tierDescriptions: [
            "Agency only uses on-premises identity providers",
            "Agency federates some identity with cloud and on premises systems",
            "Agency has global identity awareness across cloud and on-premises environments.",
          ],
        },
        {
          typeName: "Risk Assesment",
          tierDescriptions: [
            "Agency makes limited determinations for identity risk.",
            "Agency determines identity risk based on simple analytics and static rules.",
            "Agency analyzes user behavior in real time with machine learing algorithms to determine risk and deliver ongoing protection.",
          ],
        },
        {
          typeName: "Visibility and Analytics Capability",
          tierDescriptions: [
            "Agency segments user activity visibility with basic and static attributes.",
            "Agency aggregates user activity visibility with basic attributes and then analyzes and reports for manual refinement.",
            "Agency centralizes user visibility and with high fidelity attributes and user and entity behavior analytics (UEBA).",
          ],
        },
        {
          typeName: "Automation and Orchestration Capability",
          tierDescriptions: [
            "Agency manually adminsters and orchestrates (replicates) identity and credentials",
            "Agency uses basic automated orchestration to federate identity and permit administration across identity stores",
            "Agency fully orchestrates the identity lifecycle. Dynamic user profiling, dynamic identity and group membership, just-in-time and just-enough access controls are implemented",
          ],
        },
        {
          typeName: "Governance Capability",
          tierDescriptions: [
            "Agency manually audits identities and permissions after initial provisioning using static technical enforcement of credential policies (e.g., complexity, reuse, length, clipping, MFA, etc)",
            "Agency uses policy-based automated access revocation. There are no shared accounts",
            "Agency fully automates technical enforcement of policies. Agency updates policies to reflect new orchestration options.",
          ],
        },
      ],
    },
  },
];

// Define the getTierData function
function getTierData(typeName) {
  const typeData = ZeroTrust[0].functions.types.find(
    (type) => type.typeName === typeName
  );

  if (!typeData) {
    return null; // Handle error or return a default value
  }

  const traditional = ZeroTrust[0].functions.tiers[0];
  const advanced = ZeroTrust[0].functions.tiers[1];
  const optimal = ZeroTrust[0].functions.tiers[2];
  const functionType = typeData.typeName;
  const tierDescriptions = typeData.tierDescriptions;

  return {
    traditional,
    advanced,
    optimal,
    functionType,
    tierDescriptions,
  };
}

function App() {
  const pillar = ZeroTrust[0].pillar;
  const initialFunctionTypes = ZeroTrust[0].functions.types.map((type) => ({
    ...type,
    totalPoints: 0,
  }));

  const [functionTypes, setFunctionTypes] = useState(initialFunctionTypes);
  const [finalTotalPoints, setFinalTotalPoints] = useState(0);

  useEffect(() => {
    let totalPoints = 0;
    functionTypes.forEach((type) => {
      totalPoints += type.totalPoints || 0;
    });
    setFinalTotalPoints(totalPoints);
  }, [functionTypes]);

  return (
    <div>
      <div className="m-5 items-center">
        <h3 className="text-base font-bold leading-6 text-gray-900">
          Pillar 1: {pillar}
        </h3>
        {functionTypes.map((type, index) => (
          <div key={index}>
            <Pillar
              traditional={ZeroTrust[0].functions.tiers[0]}
              advanced={ZeroTrust[0].functions.tiers[1]}
              optimal={ZeroTrust[0].functions.tiers[2]}
              functionType={type.typeName}
              tierDescriptions={type.tierDescriptions}
              totalPoints={type.totalPoints}
              onTotalPointsUpdate={(points) => {
                const updatedFunctionTypes = [...functionTypes];
                updatedFunctionTypes[index].totalPoints = points;
                setFunctionTypes(updatedFunctionTypes);
              }}
            />
          </div>
        ))}
        <p>
          Total Points Across All Pillars: {finalTotalPoints}/36 (
          {((finalTotalPoints / 36) * 100).toFixed(0)}%)
        </p>
        <button
          type="button"
          className="mt-3 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Get Report
        </button>
      </div>
    </div>
  );
}

export default App;
