import { EventEmitter2 } from "@nestjs/event-emitter";
import { Test, type TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "src/database/entities/user.entity";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { NewUserCreatedPayload } from "../../events/new-user-created.payload";
import { UserEvent } from "../../events/user-event.enum";
import { UserConnectionRepository } from "./user-connection.repository";
import { UserConnectionUseCase } from "./user-connection.uc";

describe("UserConnectionUseCase", () => {
  let userConnectionUseCase: UserConnectionUseCase;
  let userConnectionRepository: UserConnectionRepository;
  let eventEmitter2: EventEmitter2;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        UserConnectionUseCase,
        {
          provide: UserConnectionRepository,
          useValue: {
            getUser: vi.fn(),
            createNewUser: vi.fn(),
          },
        },
        EventEmitter2,
        { provide: getRepositoryToken(User), useValue: {} },
      ],
    }).compile();

    userConnectionUseCase = app.get(UserConnectionUseCase);
    userConnectionRepository = app.get(UserConnectionRepository);
    eventEmitter2 = app.get(EventEmitter2);
  });

  it("should emit an event when this is a new user", async () => {
    const userId = "unknown_user_id";
    userConnectionRepository.getUser;
    vi.spyOn(userConnectionRepository, "getUser").mockImplementation(() =>
      Promise.resolve(null),
    );
    vi.spyOn(userConnectionRepository, "createNewUser").mockImplementation(() =>
      Promise.resolve({ id: userId } as User),
    );
    const eventEmitter = vi.spyOn(eventEmitter2, "emitAsync");

    await userConnectionUseCase.execute({
      userId,
      avatarUrl: "",
      username: "",
    });

    expect(eventEmitter).toHaveBeenCalledOnce();
    expect(eventEmitter).toHaveBeenCalledWith(
      UserEvent.NewUserCreated,
      new NewUserCreatedPayload({ userId }),
    );
  });

  it("should not emit anything when this is a known user", async () => {
    const userId = "known_user_id";
    vi.spyOn(userConnectionRepository, "getUser").mockImplementation(() =>
      Promise.resolve({} as User),
    );
    const eventEmitter = vi.spyOn(eventEmitter2, "emitAsync");

    await userConnectionUseCase.execute({
      userId,
      avatarUrl: "",
      username: "",
    });

    expect(eventEmitter).not.toHaveBeenCalled();
  });
});
