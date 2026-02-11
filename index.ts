import concurrently from "concurrently";

concurrently([
    {
        name: "server",
        command: "bun run dev",
        prefixColor: "cyan",
        cwd: "packages/server",
    },
    {
        name: "client",
        command: "bun run dev",
        prefixColor: "yellow",
        cwd: "packages/client",
    },
])
