import { useEffect, useState } from "react";

export type AssetsLoaded<AssetCollection> = Readonly<{
  [Name in keyof AssetCollection]: HTMLImageElement;
}>;

type AssetsLoading<AssetCollection> = {
  [Name in keyof AssetsLoaded<AssetCollection>]: HTMLImageElement | null;
};

export function useAssetsLoader<
  AssetCollection extends Readonly<Record<string, string>>,
>(assetsCollection: AssetCollection): AssetsLoaded<AssetCollection> | null {
  const [assets, setAssets] = useState(
    Object.fromEntries(
      Object.keys(assetsCollection).map((assetName) => [assetName, null]),
    ) as AssetsLoading<AssetCollection>,
  );
  useEffect(() => {
    for (const [name, path] of Object.entries(assetsCollection)) {
      const img = new Image();
      img.id = name;
      img.src = path;

      img.addEventListener("load", () => handleAssetLoaded(img), {
        once: true,
      });
    }
  }, [assetsCollection]);

  const handleAssetLoaded = (img: HTMLImageElement) => {
    setAssets(
      (assetsLoading) =>
        ({ ...assetsLoading, [img.id]: img }) as AssetsLoading<AssetCollection>,
    );
  };

  const isLoading = Object.values(assets).some((asset) => asset === null);

  return isLoading ? null : (assets as AssetsLoaded<AssetCollection>);
}
