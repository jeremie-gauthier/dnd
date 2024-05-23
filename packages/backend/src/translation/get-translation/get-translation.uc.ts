import { GetTranslationInput, GetTranslationOutput } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { UseCase } from "src/types/use-case.interface";
import { GetTranslationRepository } from "./get-translation.repository";

@Injectable()
export class GetTranslationUseCase implements UseCase {
  constructor(private readonly repository: GetTranslationRepository) {}

  public async execute({
    locale,
    namespace,
  }: GetTranslationInput): Promise<GetTranslationOutput> {
    return this.repository.getTranslation({ locale, namespace });
  }
}
