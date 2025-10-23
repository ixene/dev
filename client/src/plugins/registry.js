export const pluginRegistry = [
  { id: "grid", name: "Grid World", type: "environment", icon: "🟦" },
  { id: "sphere", name: "Sphere World", type: "environment", icon: "⚪" },
  { id: "stage", name: "Stage", type: "environment", icon: "⬛" },
  { id: "suspended", name: "Suspended Stage", type: "environment", icon: "🔶" },
  { id: "asymptote", name: "Asymptote Module", type: "exotic", icon: "📈" },
  { id: "renderer", name: "Renderer Core", type: "system", icon: "🧠" },
  { id: "auth", name: "Auth System", type: "core", icon: "🔐" },
  { id: "plugin_manager", name: "Plugin Manager", type: "core", icon: "🧩" },
  { id: "env_controller", name: "Environment Controller", type: "system", icon: "🌐" },
  { id: "ai_assistant", name: "AI Assistant", type: "intelligence", icon: "🤖" },
  ...Array.from({ length: 190 }).map((_, i) => ({
    id: `plugin_${i + 10}`,
    name: `Plugin ${i + 10}`,
    type: i % 2 === 0 ? "extension" : "core",
    icon: i % 3 === 0 ? "⚙️" : i % 3 === 1 ? "🧩" : "🔮",
  })),
];
