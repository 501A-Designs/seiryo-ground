import React, { useState } from "react";
import Align from "../../lib/alignment/Align";
import { Cross2Icon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import Button from "../button/Button";
import useSound from "use-sound";

export interface FilterSelectOptionType {
  label: string;
  value: number;
}

interface FilterSelectProps {
  icon?: JSX.Element;
  options: FilterSelectOptionType[];
  state: number;
  setState?: any;
}

const FilterSelect: React.FC<FilterSelectProps> = ({
  icon,
  options,
  state,
  setState,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [filter, setFilter] = useState(options);
  const [tap1] = useSound("/sound/tap-1-sg.mp3");

  return (
    <div className={`grid gap-0`}>
      <div className={`h-7`}>
        {state == 0 ? (
          <Align
            className={`text-zinc-400 dark:text-zinc-600 animate-scale-blur`}
          >
            {icon ? icon : <MagnifyingGlassIcon />}
            <input
              type="text"
              placeholder="都道府県名"
              className={`input-text-transparent`}
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                const results = options.filter(
                  (obj: FilterSelectOptionType) => {
                    if (e.target.value === "") return obj;
                    return obj.label.includes(e.target.value.toLowerCase());
                  }
                );
                setFilter(results);
              }}
            />
          </Align>
        ) : (
          <Align className={`gap-1 justify-between`}>
            <h6 className={`m-0 pl-2 w-full animate-bounce-left`}>
              {options[state - 1].label}
            </h6>
            <Button
              intent={"transparent"}
              icon={<Cross2Icon />}
              size={"small"}
              type="button"
              onClick={() => {
                setState(0);
                setInputValue("");
                setFilter(options);
              }}
            />
          </Align>
        )}
      </div>
      <hr />
      <section className={`overflow-y-scroll h-24 rounded-md`}>
        <div className={`grid grid-cols-2 gap-0.5`}>
          {filter.map((option: FilterSelectOptionType) => (
            <button
              type="button"
              className={`
                h-fit
                w-full p-1 text-xs rounded-lg
                ${
                  state == option.value
                    ? `filled text-black dark:text-white`
                    : `
                      text-zinc-400
                      dark:text-zinc-500
                      border
                      border-transparent
                      bg-transparent
                      hover:text-zinc-500
                      dark:hover:text-zinc-300
                      hover:bg-zinc-200/70
                      dark:hover:bg-zinc-800/70
                    `
                }
              `}
              onMouseDown={() => tap1()}
              onClick={() => setState(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FilterSelect;
