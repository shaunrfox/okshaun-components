import * as React from "react";
import { css, Theme } from "@emotion/react";

export interface MultiToggleOption {
  value: string;
  label: string | React.ReactNode;
}

interface MultiToggleProps {
  options: MultiToggleOption[];
  defaultValue?: string;
  name: string;
  onChange?: (value: string) => void;
  className?: string;
  icons?: boolean;
}

const multiToggleStyles = (theme: Theme, icons: boolean) => css`
  position: relative;
  display: inline-flex;
  width: fit-content;
  gap: ${theme.size[8]};
  /* isolation: isolate; */
  /* mix-blend-mode: difference; */

  > div {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: ${theme.mode === "light"
      ? theme.color.gray[100]
      : theme.color.gray[0]};
    border-radius: 2rem;
    transition: all 150ms ease-in-out;
    z-index: 0;
    /* filter: invert(1); */
  }

  label {
    position: relative;
    z-index: 1;
    flex: 1;
    cursor: pointer;
    border-radius: 50%;
    padding: ${theme.size[4]} ${theme.size[12]};
    color: ${theme.mode === "light"
      ? theme.color.gray[100]
      : theme.color.gray[100]};
    font-size: ${theme.size[14]};
    white-space: nowrap;
    filter: invert(1);
    mix-blend-mode: difference;
    isolation: isolate;

    span {
    }

    ${icons &&
    `
      display: flex;
      justify-content: center;
      align-items: center;
      padding: ${theme.size[1]};
    `}
  }
`;

export function MultiToggle({
  options,
  defaultValue,
  name,
  onChange,
  className,
  icons = false,
}: MultiToggleProps) {
  const [selectedValue, setSelectedValue] = React.useState(
    defaultValue || options[0].value
  );
  const highlightRef = React.useRef<HTMLDivElement>(null);
  const labelsRef = React.useRef<(HTMLLabelElement | null)[]>([]);

  const handleChange = (value: string) => {
    setSelectedValue(value);
    if (onChange) onChange(value);
    moveHighlight(value);
  };

  const moveHighlight = (value: string) => {
    const index = options.findIndex((option) => option.value === value);
    const selectedLabel = labelsRef.current[index];

    if (highlightRef.current && selectedLabel) {
      const width = Math.floor(selectedLabel.offsetWidth);
      const left = Math.floor(selectedLabel.offsetLeft);

      highlightRef.current.style.width = `${width}px`;
      highlightRef.current.style.transform = `trangrayX(${left}px)`;
    }
  };

  React.useEffect(() => {
    moveHighlight(selectedValue);
  }, [selectedValue]);

  return (
    <div
      className={className}
      css={(theme: Theme) => [multiToggleStyles(theme, icons)]}
      id={name}
    >
      <div ref={highlightRef} />
      {options.map((option, index) => (
        <label
          key={option.value}
          htmlFor={`${name}-${option.value}`}
          ref={(el) => (labelsRef.current[index] = el)}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => handleChange(option.value)}
            className="sr-only"
            id={`${name}-${option.value}`}
          />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  );
}
