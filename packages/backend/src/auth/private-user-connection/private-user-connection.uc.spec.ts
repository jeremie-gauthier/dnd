import { EventEmitter2 } from "@nestjs/event-emitter";
import { Test, type TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { AuthEvent } from "src/auth/events/emitters/auth-events.enum";
import { NewUserRegisteredPayload } from "src/auth/events/emitters/new-user-registered.payload";
import { User } from "src/database/entities/user.entity";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { PrivateUserConnectionRepository } from "./private-user-connection.repository";
import { PrivateUserConnectionUseCase } from "./private-user-connection.uc";

describe("UserConnectionUseCase", () => {
  let userConnectionUseCase: PrivateUserConnectionUseCase;
  let userConnectionRepository: PrivateUserConnectionRepository;
  let eventEmitter2: EventEmitter2;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        PrivateUserConnectionUseCase,
        PrivateUserConnectionRepository,
        EventEmitter2,
        { provide: getRepositoryToken(User), useValue: {} },
      ],
    }).compile();

    userConnectionUseCase = app.get<PrivateUserConnectionUseCase>(
      PrivateUserConnectionUseCase,
    );
    userConnectionRepository = app.get<PrivateUserConnectionRepository>(
      PrivateUserConnectionRepository,
    );
    eventEmitter2 = app.get<EventEmitter2>(EventEmitter2);
  });

  it("should emit an event when this is a new user", async () => {
    const userId = "known_user_id";
    vi.spyOn(
      userConnectionRepository,
      "shouldSetupUserEnvironment",
    ).mockImplementation(() => Promise.resolve(true));
    const eventEmitter = vi.spyOn(eventEmitter2, "emitAsync");

    await userConnectionUseCase.execute({
      userId,
      avatarUrl: "",
      username: "",
    });

    expect(eventEmitter).toHaveBeenCalledOnce();
    expect(eventEmitter).toHaveBeenCalledWith(
      AuthEvent.NewUserRegistered,
      new NewUserRegisteredPayload({ userId, avatarUrl: "", username: "" }),
    );
  });

  it("should not emit anything when this is a known user", async () => {
    const userId = "unknown_user_id";
    vi.spyOn(
      userConnectionRepository,
      "shouldSetupUserEnvironment",
    ).mockImplementation(() => Promise.resolve(false));
    const eventEmitter = vi.spyOn(eventEmitter2, "emitAsync");

    await userConnectionUseCase.execute({
      userId,
      avatarUrl: "",
      username: "",
    });

    expect(eventEmitter).not.toHaveBeenCalled();
  });
});