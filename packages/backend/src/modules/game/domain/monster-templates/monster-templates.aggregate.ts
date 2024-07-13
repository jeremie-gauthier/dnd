import { Entity } from "src/modules/shared/domain/entity";
import { z } from "zod";
import { MonsterTemplate } from "./monster-template/monster-template.vo";
import { MonsterTemplatesError } from "./monster-templates.error";

type Data = {
  readonly values: Array<MonsterTemplate>;
};

export class MonsterTemplates extends Entity<Data> {
  private static schema = z.object({
    values: z.array(z.instanceof(MonsterTemplate)),
  });

  constructor(rawData: Data) {
    const data = MonsterTemplates.schema.parse(rawData);
    super(data);
  }

  public toPlain() {
    return {
      values: this._data.values.map((monsterTemplate) =>
        monsterTemplate.toPlain(),
      ),
    };
  }

  public getMonsterTemplateOrThrow({
    kind,
  }: { kind: MonsterTemplate["kind"] }) {
    const monsterTemplate = this._data.values.find(
      (value) => value.kind === kind,
    );
    if (!monsterTemplate) {
      throw new MonsterTemplatesError({
        name: "MONSTER_TEMPLATE_NOT_FOUND",
        message: `Monster template "${kind}" not found`,
      });
    }
    return monsterTemplate;
  }
}
