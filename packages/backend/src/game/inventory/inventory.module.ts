import { Module } from "@nestjs/common";
import { ItemService } from "./services/item/item.service";

@Module({
  exports: [ItemService],
  providers: [ItemService],
})
export class InventoryModule {}
