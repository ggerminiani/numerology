import { AdMobInterstitial } from "expo-ads-admob";

const INTERSTITIAL_ID = "ca-app-pub-3940256099942544/1033173712";
//const INTERSTITIAL_ID = "ca-app-pub-2035092180433983/2015591307";

export const loadAdInterstitial = async () => {
  await AdMobInterstitial.setAdUnitID(INTERSTITIAL_ID);
  await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
  await AdMobInterstitial.showAdAsync();
};
