const { renderUseCaseDto } = require("./use-case-dto.snippet");
const { renderUseCase } = require("./use-case.snippet");
const { renderUseCaseInputSchema } = require("./use-case-input-schema.snippet");
const {
  renderUseCaseOutputSchema,
} = require("./use-case-output-schema.snippet");
const { renderUseCaseRepository } = require("./use-case-repository.snippet");
const { renderUseCaseSpec } = require("./use-case-spec.snippet");
const { renderUseSchemaBarrelFile } = require("./use-case-schema-barrel-files");

module.exports = {
  renderUseCase,
  renderUseCaseRepository,
  renderUseCaseInputSchema,
  renderUseCaseOutputSchema,
  renderUseSchemaBarrelFile,
  renderUseCaseDto,
  renderUseCaseSpec,
};
