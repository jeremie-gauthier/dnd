import { EventEmitter2 } from "@nestjs/event-emitter";
import { Test, type TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "src/database/entities/user.entity";
import { NewUserRegisteredPayload } from "src/modules/auth/events/emitters/new-user-registered.payload";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { NewUserCreatedPayload } from "../events/new-user-created.payload";
import { UserEvent } from "../events/user-event.enum";
import { NewUserRegisteredRepository } from "./new-user-registered.repository";
import { NewUserRegisteredUseCase } from "./new-user-registered.uc";

describe("NewUserRegisteredListener", () => {
  let newUserRegisteredUseCase: NewUserRegisteredUseCase;
  let eventEmitter2: EventEmitter2;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        NewUserRegisteredUseCase,
        {
          provide: NewUserRegisteredRepository,
          useValue: {
            createNewUser: (user: { id: string; [x: string]: unknown }) =>
              Promise.resolve({ ...user, id: user.id }),
          },
        },
        EventEmitter2,
        { provide: getRepositoryToken(User), useValue: {} },
      ],
    }).compile();

    newUserRegisteredUseCase = app.get(NewUserRegisteredUseCase);
    eventEmitter2 = app.get(EventEmitter2);
  });

  it("should create a new user", async () => {
    const userId = "new_user_id";

    const eventEmitter = vi.spyOn(eventEmitter2, "emitAsync");

    const eventPayload = new NewUserRegisteredPayload({
      userId,
      avatarUrl: "",
      username: "",
    });
    await newUserRegisteredUseCase.execute(eventPayload);

    expect(eventEmitter).toHaveBeenCalledOnce();
    expect(eventEmitter).toBeCalledWith(
      UserEvent.NewUserCreated,
      new NewUserCreatedPayload({ userId }),
    );
  });
});
