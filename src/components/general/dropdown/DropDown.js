import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";

export default ({ listItems, textLabel, setValue, value, children, handleClickItem, mode = "single" }) => {
  const [selectedKeys, setSelectedKeys] = React.useState(value ? new Set([value]) : []);

  const selectedValue = React.useMemo(
    
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  const handleChange = (e) => {
    if (mode === "single") {
      for (let time of e) {
        setValue(time)
      };
      
    }else {
      const newSelections = Array.isArray(e) ? e : Array.from(e);
      setValue(newSelections)
    }
   
    setSelectedKeys(e);
  }
  return (
    <div className="w-full flex flex-col">
      {textLabel && <label>{textLabel}</label>}
      <Dropdown
        backdrop="blur"
        className="overflow-auto"
      >
        <DropdownTrigger className="overflow-auto">
          <Button

            className="shadow-sm drop-shadow-sm bg-infinity-pink-softPink hover:bg-infinity-pink-salmonPink text-infinity-white-snow font-bold"
          >
            <div className="w-full flex flex-row gap-2 items-center justify-start py-4 overflow-auto">
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
          selectionMode={mode}
          selectedKeys={selectedKeys}
          onSelectionChange={(e) => { handleChange(e) }}
          className="w-full min-h-auto h-96"

        >
          {listItems?.map((items) => {
            return (
              <DropdownItem
                className="w-full text-start"
                key={items}
                onClick={(e) => {
                  if (handleClickItem) {
                    handleClickItem(e)
                  }
                }}
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
