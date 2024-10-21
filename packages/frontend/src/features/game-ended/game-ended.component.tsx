import { Navbar } from "@/components/navbar/navbar.component";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Trans, useTranslation } from "react-i18next";

type Props = {
  gameConditionsStatus: "victory" | "defeat";
};

export const GameEnded = ({ gameConditionsStatus }: Props) => {
  const { t } = useTranslation(["campaigns"]);
  const isVictorious = gameConditionsStatus === "victory";

  return (
    <>
      <Navbar />

      <div className="flex flex-col gap-12 max-w-5xl m-auto">
        <h1 className="text-2xl font-bold text-center">
          {isVictorious ? "Victoire" : "Défaite"}
        </h1>
        <p className="whitespace-pre-line flex flex-col">
          <Trans
            i18nKey="thanks"
            ns="campaigns"
            components={{
              Center: <span className="text-center text-xl font-medium" />,
              GithubLink: (
                // biome-ignore lint/a11y/useAnchorContent: <explanation>
                <a
                  className="underline font-semibold text-slate-800 hover:text-slate-600"
                  target="_blank"
                  href="https://github.com/jeremie-gauthier/dnd"
                  rel="noreferrer"
                />
              ),
            }}
          />
        </p>

        <Link to="/lobbies" className="text-center">
          <Button role="link" variant="link" className="w-60">
            {t("returnToLobbies")}
          </Button>
        </Link>
      </div>
    </>
  );
};
