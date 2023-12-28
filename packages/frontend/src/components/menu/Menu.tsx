import { GetCampaignsResponse } from '../../hooks/api/campaign/get-campaigns';

type Props = {
  campaigns: GetCampaignsResponse;
};

export const Menu = ({ campaigns }: Props) => {
  const handleClickOnCampaign = (campaign: { id: string }) => {
    console.log(campaign);
    // TODO: create a lobby ?
  };

  const handleClickOnMultiplayer = () => {
    console.log('multiplayer');
    // TODO: redirect to lobbies page
  };

  return (
    <div>
      <h1>Campagnes</h1>
      {campaigns.map((campaign) => (
        <button key={campaign.id} onClick={() => handleClickOnCampaign(campaign)}>
          <span>
            {campaign.currentStage.order}/{campaign.nbStages}
          </span>
          <span>{campaign.title}</span>
          <span>{campaign.currentStage.title}</span>
        </button>
      ))}

      <button onClick={() => handleClickOnMultiplayer()}>
        <span>Multiplayer</span>
      </button>
    </div>
  );
};
