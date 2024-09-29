import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";

export default ({ listItems, textLabel, setValue, value, children }) => {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([value || "Seleccionar"]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  const handleChange = (e) => {
    for(let time of e) {
      setValue(time)
    };

    setSelectedKeys(e);
  }
  return (
    <div className="w-full flex flex-col">
      {textLabel && <label>{textLabel}</label>}
      <Dropdown
        backdrop="blur"
        className="overflow-auto"
        >
        <DropdownTrigger>
          <Button
            
            className="shadow-sm drop-shadow-sm bg-infinity-pink-softPink hover:bg-infinity-pink-salmonPink text-infinity-white-snow font-bold"
          >
            <div className="w-full flex flex-row gap-2 items-center justify-start">
            {children && children}
            {selectedValue}
            </div>
            
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Multiple selection example"
          variant="flat"
          closeOnSelect={true}
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={selectedKeys}
          onSelectionChange={(e)=>{handleChange(e)}}
          className="w-full h-96"
        >
          {listItems?.map((items) => {
            return (
              <DropdownItem
                className="w-full text-start"
                key={items}
              >
                {items}
              </DropdownItem>
            )
          })}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
