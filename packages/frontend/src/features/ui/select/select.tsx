import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { classNames } from "@utils/class-names.util";
import { Fragment, ReactNode } from "react";

type Props<Element, List extends Element[]> = {
  label: ReactNode;
  value: Element;
  list: List;
  onChange: (value: Element) => void;
  getDisplayedValue: (value: List[number]) => string;
};

export const Select = <Value, List extends any[]>({
  label,
  value,
  list,
  onChange,
  getDisplayedValue,
}: Props<Value, List>) => {
  return (
    <Listbox value={value} onChange={onChange}>
      {({ open }) => (
        <>
          <Label className="block text-sm font-medium leading-6 text-gray-900">
            {label}
          </Label>
          <div className="relative mt-2">
            <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-800 sm:text-sm sm:leading-6">
              <span className="ml-3 block truncate">
                {getDisplayedValue(value)}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </ListboxButton>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <ListboxOptions
                as="ul"
                className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              >
                {list.map((element, idx) => (
                  <ListboxOption
                    as="li"
                    key={element.id ?? idx}
                    className="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-amber-800 hover:text-white"
                    value={element}
                  >
                    {({ selected }) => (
                      <span
                        className={classNames(
                          selected ? "font-semibold" : "font-normal",
                          "ml-3 block truncate",
                        )}
                      >
                        {getDisplayedValue(element)}
                      </span>
                    )}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};
