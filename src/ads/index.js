import { AdMobInterstitial } from "expo-ads-admob";

const INTERSTITIAL_ID = Platform.select({
  ios: "ca-app-pub-2035092180433983/9573644987",
  android: "ca-app-pub-2035092180433983/2015591307",
});

export const loadAdInterstitial = async () => {
  await AdMobInterstitial.setAdUnitID(INTERSTITIAL_ID);
  await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
  await AdMobInterstitial.showAdAsync();
};
