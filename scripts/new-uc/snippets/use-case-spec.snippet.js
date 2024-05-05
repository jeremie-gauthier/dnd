const dedent = require("dedent");

const renderUseCaseSpec = ({
  useCaseName,
  useCaseClassName,
  repositoryName,
}) => {
  return dedent`
		import { EventEmitter2 } from '@nestjs/event-emitter';
		import { Test } from '@nestjs/testing';
		import { MockInstance, afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
		import { ${repositoryName} } from './${useCaseName}.repository';
		import { ${useCaseClassName} } from './${useCaseName}.uc';
		
		describe('${useCaseClassName}', () => {
		  let useCase: ${useCaseClassName};
		  let repository: ${repositoryName};
		  let eventEmitter2: EventEmitter2;
		
		  let eventEmitterMock: MockInstance<[event: any, ...values: any[]], Promise<any[]>>;

		  beforeEach(async () => {
		    const module = await Test.createTestingModule({
		      providers: [
		        ${useCaseClassName},
		        EventEmitter2,
		        {
		          provide: ${repositoryName},
		          useValue: {},
		        },
		      ],
		    }).compile();
		
		    useCase = module.get(${useCaseClassName});
		    repository = module.get(${repositoryName});
		    eventEmitter2 = module.get(EventEmitter2);
		
		    eventEmitterMock = vi.spyOn(eventEmitter2, 'emitAsync');
		  });
		
		  afterEach(() => {
		    vi.clearAllMocks();
		  });

		  it('should be defined', () => {
		    expect(useCase).toBeDefined();
		    expect(repository).toBeDefined();
		    expect(eventEmitter2).toBeDefined();
		  });
		
		  describe('Happy path', () => {});

		  describe('Negative path', () => {});
		});\n
	`;
};

module.exports = {
  renderUseCaseSpec,
};
