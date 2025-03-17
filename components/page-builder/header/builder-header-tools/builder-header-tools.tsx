import { Button, Divider, Tooltip } from "@heroui/react";
import { BlocksIcon, DatabaseIcon, FileIcon, PaintbrushIcon, SettingsIcon } from "lucide-react";

export default function BuilderHeaderTools() {
  return <>
    <div
      className={
        "flex items-center gap-default"
      }
    >
      <Tooltip content="Pages" placement={"bottom"} offset={15}>
        <Button isIconOnly variant={"light"} className={"text-content4 hover:text-foreground"}>
          <FileIcon />
        </Button>
      </Tooltip>
      <Tooltip content="Theme" placement={"bottom"} offset={15}>
        <Button isIconOnly variant={"light"} className={"text-content4 hover:text-foreground"}>
          <PaintbrushIcon />
        </Button>
      </Tooltip>
      <Tooltip content="Blocks" placement={"bottom"} offset={15}>
        <Button isIconOnly variant={"light"} className={"text-content4 hover:text-foreground"}>
          <BlocksIcon />
        </Button>
      </Tooltip>
      <Tooltip content="CMS" placement={"bottom"} offset={15}>
        <Button isIconOnly variant={"light"} className={"text-content4 hover:text-foreground"}>
          <DatabaseIcon />
        </Button>
      </Tooltip>
      <Divider orientation="vertical" />

      <Tooltip content="Site settings" placement={"bottom"} offset={15}>
        <Button isIconOnly variant={"light"} className={"text-content4 hover:text-foreground"}>
          <SettingsIcon />
        </Button>
      </Tooltip>
    </div>
  </>;
}
