import { LobbyEntity } from '@dnd/shared';
import type { CampaignStage } from 'src/database/entities/campaign-stage.entity';
import type { Campaign } from 'src/database/entities/campaign.entity';
import type { User } from 'src/database/entities/user.entity';
import { EventPayload } from 'src/event-emitter/event-payload.class';
import type { MessageContext } from 'src/types/socket.type';
import { LobbyEvent } from './lobby-events.enum';

export class LobbyGameStartedPayload implements EventPayload<LobbyEvent.LobbyGameStarted> {
  public readonly name = LobbyEvent.LobbyGameStarted;
  public readonly ctx: MessageContext;
  public readonly lobbyId: LobbyEntity['id'];
  public readonly userId: User['id'];
  public readonly stageId: CampaignStage['id'];
  public readonly campaignId: Campaign['id'];

  constructor({
    ctx,
    lobbyId,
    userId,
    stageId,
    campaignId,
  }: Omit<LobbyGameStartedPayload, 'name'>) {
    this.ctx = ctx;
    this.lobbyId = lobbyId;
    this.userId = userId;
    this.stageId = stageId;
    this.campaignId = campaignId;
  }
}
