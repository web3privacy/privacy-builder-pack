import toolsData from "@/data/tools.json"
import privacyFocusedToolsData from "@/data/privacyFocusedTools.json"
import { ToolsData } from "@/types/tools"

export function getAllTags(): string[] {
  const allData: ToolsData = [...toolsData, ...privacyFocusedToolsData]
  const allTags = allData.flatMap((category) => category.items.flatMap((item) => item.tags))

  return [...new Set(allTags)].sort()
}
