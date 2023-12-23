interface AgeRangeProps {
  ageRange: [number, number];
  handleMinAgeChange: (value: number) => void;
  handleMaxAgeChange: (value: number) => void;
}

const AgeRangeInput: React.FC<AgeRangeProps> = ({
  ageRange,
  handleMinAgeChange,
  handleMaxAgeChange,
}) => {
  return (
    <div>
      <label htmlFor="minAge">Min Age: {ageRange[0]}</label>
      <input
        type="range"
        id="minAge"
        min={0}
        max={ageRange[1]}
        step={1}
        value={ageRange[0]}
        className="w-full bg-psLightGray cursor-pointer"
        onChange={(e) => handleMinAgeChange(parseInt(e.target.value, 10))}
      />
      <label htmlFor="maxAge">Max Age: {ageRange[1]}</label>
      <input
        type="range"
        id="maxAge"
        min={ageRange[0]}
        max={14}
        step={1}
        value={ageRange[1]}
        className="w-full bg-psLightGray cursor-pointer"
        onChange={(e) => handleMaxAgeChange(parseInt(e.target.value, 10))}
      />
    </div>
  );
};

export default AgeRangeInput;
