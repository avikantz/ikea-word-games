import { NextResponse } from "next/server";

import { IKEAProduct } from "@/interfaces";

const itemMap: Record<string, IKEAProduct> = require("../items/map.json");

export async function GET(request: Request) {
  return NextResponse.json(itemMap);
}
