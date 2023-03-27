import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Categories } from "./entities";
import { SharedModule } from "../shared";

import { ReadCategories } from "./services";


@Module({
  imports: [
    TypeOrmModule.forFeature([Categories]),
    SharedModule,
  ],
  providers: [
    ReadCategories,
  ],
})
export class CategoriesModule {
}
