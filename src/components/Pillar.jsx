import FormFieldset from "./FormFieldset";

function Pillar({
  traditional,
  advanced,
  optimal,
  functionType,
  tierDescriptions,
  onTotalPointsUpdate,
}) {
  return (
    <FormFieldset
      traditional={traditional}
      advanced={advanced}
      optimal={optimal}
      functionType={functionType}
      tierDescriptions={tierDescriptions}
      onTotalPointsUpdate={onTotalPointsUpdate}
    />
  );
}

export default Pillar;
