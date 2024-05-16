import { Test, TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, it } from "vitest";
import { ItemService } from "./item.service";

describe("ItemService", () => {
  let service: ItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemService],
    }).compile();

    service = module.get<ItemService>(ItemService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
