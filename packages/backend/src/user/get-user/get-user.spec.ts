import { EventEmitter2 } from "@nestjs/event-emitter";
import { Test } from "@nestjs/testing";
import {
  MockInstance,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { GetUserRepository } from "./get-user.repository";
import { GetUserUseCase } from "./get-user.uc";

describe("GetUserUseCase", () => {
  let useCase: GetUserUseCase;
  let repository: GetUserRepository;
  let eventEmitter2: EventEmitter2;

  let eventEmitterMock: MockInstance<
    [event: any, ...values: any[]],
    Promise<any[]>
  >;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        GetUserUseCase,
        EventEmitter2,
        {
          provide: GetUserRepository,
          useValue: {},
        },
      ],
    }).compile();

    useCase = module.get<GetUserUseCase>(GetUserUseCase);
    repository = module.get<GetUserRepository>(GetUserRepository);
    eventEmitter2 = module.get<EventEmitter2>(EventEmitter2);

    eventEmitterMock = vi.spyOn(eventEmitter2, "emitAsync");
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should be defined", () => {
    expect(useCase).toBeDefined();
    expect(repository).toBeDefined();
    expect(eventEmitter2).toBeDefined();
  });
});
