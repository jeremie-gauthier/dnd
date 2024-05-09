import { EventEmitter2 } from "@nestjs/event-emitter";
import { Test, type TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { NewUserRegisteredPayload } from "src/auth/events/emitters/new-user-registered.payload";
import { User } from "src/database/entities/user.entity";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { NewUserCreatedPayload } from "../../emitters/new-user-created.payload";
import { UserEvent } from "../../emitters/user-events.enum";
import { NewUserRegisteredListener } from "./new-user-registered.listener";
import { NewUserRegisteredRepository } from "./new-user-registered.repository";

describe("NewUserRegisteredListener", () => {
  let newUserRegisteredListener: NewUserRegisteredListener;
  let eventEmitter2: EventEmitter2;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        NewUserRegisteredListener,
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

    newUserRegisteredListener = app.get<NewUserRegisteredListener>(
      NewUserRegisteredListener,
    );
    eventEmitter2 = app.get<EventEmitter2>(EventEmitter2);
  });

  it("should create a new user", async () => {
    const userId = "new_user_id";

    const eventEmitter = vi.spyOn(eventEmitter2, "emitAsync");

    const eventPayload = new NewUserRegisteredPayload({
      userId,
      avatarUrl: "",
      username: "",
    });
    await newUserRegisteredListener.handler(eventPayload);

    expect(eventEmitter).toHaveBeenCalledOnce();
    expect(eventEmitter).toBeCalledWith(
      UserEvent.NewUserCreated,
      new NewUserCreatedPayload({ userId }),
    );
  });
});
