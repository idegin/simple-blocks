import { Avatar, Button } from "@heroui/react";
import {
  ArrowLeft,
  DownloadIcon,
  MenuIcon,
  SaveIcon,
} from "lucide-react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from "@heroui/react";

import { ToggleButton } from "@/components/page-builder/left-panel/left-panel";
import { useBuilderContext } from "@/context/builder.context";
import BuilderHeaderTools from "@/components/page-builder/header/builder-header-tools/builder-header-tools";

export default function BuilderHeader() {
  const {
    state: { project }
  } = useBuilderContext();

  return (
    <>
      <header
        className={
          "bg-content1 h-14 bg-card flex justify-between border-b border-divider items-center"
        }
      >
        <ToggleButton Icon={ArrowLeft} label={"Go back"} />
        <div className={"w-full flex items-center justify-center"}>
          <BuilderHeaderTools/>
        </div>
        <div className={"flex items-center gap-sm"}>
          <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
          <Dropdown>
            <DropdownTrigger>
              <Button
                color="default"
                startContent={<DownloadIcon className={"h-4 w-4"} />}
              >
                Import/Export
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="copy">Import</DropdownItem>
              <DropdownItem key="new">Export</DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <Button
            color="primary"
            startContent={<SaveIcon className={"h-4 w-4"} />}
          >
            Save
          </Button>
          <ToggleButton
            Icon={MenuIcon}
            label={"Toggle config"}
            placement={"bottom"}
          />
        </div>
      </header>
    </>
  );
}
