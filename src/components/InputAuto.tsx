import React, { useState, useEffect, useRef, ChangeEvent, KeyboardEvent, useCallback } from "react";

interface InputAutoProps {
  pholder: string;
  data: string[];
  onSelected: (value: string) => void;
  onChange: (value: string) => void;
}

const InputAuto: React.FC<InputAutoProps> = ({ pholder, data, onSelected, onChange }) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isHideSuggs, setIsHideSuggs] = useState(false);
  const [selectedVal, setSelectedVal] = useState("");
  const inputRef = useRef<HTMLDivElement>(null);

  const handler = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    const inputValue = (e.target as HTMLInputElement).value;
    setSuggestions(data.filter(i => i.toLowerCase().startsWith(inputValue.toLowerCase())));
  }, [data]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setIsHideSuggs(false);
    setSelectedVal(input);
    onChange(input);
  }, [onChange]);

  const hideSuggs = useCallback((value: string) => {
    onSelected(value);
    setSelectedVal(value);
    setIsHideSuggs(true);
  }, [onSelected]);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      setIsHideSuggs(true);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className="suggestion-auto" ref={inputRef}>
      <div className="form-control-auto">
        <input
          placeholder={pholder}
          type="search"
          value={selectedVal}
          onChange={handleChange}
          onKeyUp={handler}
        />
      </div>

      {suggestions.length > 0 && (
        <div
          className="suggestions"
          style={{ display: isHideSuggs ? "none" : "block" }}
        >
          {suggestions.map((item, idx) => (
            <div
              key={item + idx}
              onMouseDown={() => hideSuggs(item)}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InputAuto;
