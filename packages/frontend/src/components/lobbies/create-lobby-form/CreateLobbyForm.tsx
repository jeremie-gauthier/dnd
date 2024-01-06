import { ClientLobbyEvent } from '@dnd/shared';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { z } from 'zod';
import { GetCampaignsResponse } from '../../../hooks/api/campaign/get-campaigns';
import { ClientSocket } from '../../../types/socket.type';
import { useCreateLobbyForm } from './useCreateLobbyForm';

type Props = {
  campaigns: GetCampaignsResponse;
  socket: ClientSocket;
};

export const CreateLobbyForm = ({ campaigns, socket }: Props) => {
  const form = useCreateLobbyForm({
    nbPlayers: 2,
    stageId: campaigns[0]?.currentStage.id ?? '',
  });

  return (
    <div>
      <h2>Host a game</h2>

      <form.Provider>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            socket.emit(ClientLobbyEvent.RequestNewGame, form.state.values);
          }}
        >
          <div>
            <form.Field
              name="nbPlayers"
              validatorAdapter={zodValidator}
              validators={{
                onChange: z
                  .number()
                  .min(1, 'Your lobby must at least accept 2 players')
                  .max(5, 'Your lobby must at most accept 5 players'),
              }}
              children={(field) => (
                <>
                  <input
                    type="number"
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.valueAsNumber)}
                  />

                  {field.state.meta.errors ? (
                    <em role="alert">{field.state.meta.errors.join(', ')}</em>
                  ) : null}
                </>
              )}
            />
          </div>

          <div>
            <form.Field
              name="stageId"
              validatorAdapter={zodValidator}
              validators={{
                onChange: z.string().uuid(),
              }}
              children={(field) => (
                <select
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                >
                  {campaigns.map((campaign) => (
                    <option key={campaign.id} value={campaign.currentStage.id}>
                      {campaign.currentStage.order}/{campaign.nbStages} --
                      {campaign.title} --
                      {campaign.currentStage.title}
                    </option>
                  ))}
                </select>
              )}
            />
          </div>

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <button type="submit" disabled={!canSubmit}>
                {isSubmitting ? 'Your Lobby is being created' : 'Create Lobby'}
              </button>
            )}
          />
        </form>
      </form.Provider>
    </div>
  );
};
