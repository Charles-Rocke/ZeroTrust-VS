import React, { useState, useEffect, useCallback } from "react";

function FormFieldset({
  traditional,
  advanced,
  optimal,
  functionType,
  tierDescriptions,
  onTotalPointsUpdate,
}) {
  const [traditionalSelected, setTraditionalSelected] = useState(false);
  const [advancedSelected, setAdvancedSelected] = useState(false);
  const [optimalSelected, setOptimalSelected] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);

  const memoizedOnTotalPointsUpdate = useCallback(onTotalPointsUpdate, []);

  useEffect(() => {
    const calculatedTotalPoints =
      (traditionalSelected ? 1 : 0) +
      (advancedSelected ? 2 : 0) +
      (optimalSelected ? 3 : 0);
    setTotalPoints(calculatedTotalPoints);
    memoizedOnTotalPointsUpdate(calculatedTotalPoints);
  }, [
    traditionalSelected,
    advancedSelected,
    optimalSelected,
    memoizedOnTotalPointsUpdate,
  ]);

  const handleTierSelection = (tierName) => {
    if (tierName === "traditional") {
      setTraditionalSelected(!traditionalSelected);
    } else if (tierName === "advanced") {
      setAdvancedSelected(!advancedSelected);
    } else if (tierName === "optimal") {
      setOptimalSelected(!optimalSelected);
    }
  };

  return (
    <fieldset className="mt-4 border-b border-gray-200">
      {/* Pillar Type */}
      <legend className="text-base font-semibold leading-6 text-gray-900">
        {functionType}
      </legend>
      {/* Checkbox form Start */}
      <div className="space-y-5">
        <div className="relative flex items-start">
          <div className="flex h-6 items-center">
            <input
              id="traditional"
              aria-describedby="traditional-description"
              name="traditional"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              checked={traditionalSelected}
              onChange={() => handleTierSelection("traditional")}
            />
          </div>
          <div className="ml-3 text-sm leading-6">
            <label htmlFor="traditional" className="font-medium text-gray-900">
              {traditional}
            </label>
            <p id="traditional-description" className="text-gray-500">
              {tierDescriptions[0]}
            </p>
          </div>
        </div>
        <div className="relative flex items-start">
          <div className="flex h-6 items-center">
            <input
              id="advanced"
              aria-describedby="advanced-description"
              name="advanced"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              checked={advancedSelected}
              onChange={() => handleTierSelection("advanced")}
            />
          </div>
          <div className="ml-3 text-sm leading-6">
            <label htmlFor="advanced" className="font-medium text-gray-900">
              {advanced}
            </label>
            <p id="advanced-description" className="text-gray-500">
              {tierDescriptions[1]}
            </p>
          </div>
        </div>
        <div className="relative flex items-start">
          <div className="flex h-6 items-center">
            <input
              id="optimal"
              aria-describedby="optimal-description"
              name="optimal"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              checked={optimalSelected}
              onChange={() => handleTierSelection("optimal")}
            />
          </div>
          <div className="ml-3 text-sm leading-6">
            <label htmlFor="optimal" className="font-medium text-gray-900">
              {optimal}
            </label>
            <p id="optimal-description" className="text-gray-500">
              {tierDescriptions[2]}
            </p>
          </div>
        </div>
      </div>
      <p className="hidden">Total Points: {totalPoints}</p>
    </fieldset>
  );
}

export default FormFieldset;
