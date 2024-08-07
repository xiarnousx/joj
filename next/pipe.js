import { split, count, identity } from "ramda";

"1 2 3" |> split(" ") |> count(identity) |> console.log;
